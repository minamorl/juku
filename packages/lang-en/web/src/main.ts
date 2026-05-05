import {
  ITEMS,
  SUBJECT_META,
  LAYER_META,
  itemsBySubject,
  inferLayer,
  inferPatternTag,
  siblingsByPattern,
  layerDistribution,
  type DrillItem,
  type Subject,
  type Layer,
} from "./items";

// =====================================================================
//  juku — パターン認知駆動の高速ドリル
//
//  設計思想:
//  - 答えは即座に出す(宙吊り禁止)。パターン認知は高速回転でしか起きない。
//  - 連鎖正解が次の類題を磁力で引き寄せる(nextSimilarId / patternTag 経由)。
//  - Layer 1-8 の階層を学習者に可視化し、上層への上昇感を演出。
//  - 院レベルまで包摂(Layer 7-8 は将来量産、現状は型のみ予約)。
// =====================================================================

interface Stats {
  attempts: number;             // 累計挑戦数
  correctFirstTry: number;      // 初手正解
  contrastiveLearned: number;   // 誤答→対比文脈で学んだ回数
  streak: number;               // 現在の連鎖正解数(初手正解で+1, 誤答でリセット)
  bestStreak: number;           // 過去最大連鎖
  patternsHit: Set<string>;     // 初手正解で踏んだ patternTag 集合
  layersTouched: Set<Layer>;    // 触れた Layer 集合
}

const stats: Stats = {
  attempts: 0,
  correctFirstTry: 0,
  contrastiveLearned: 0,
  streak: 0,
  bestStreak: 0,
  patternsHit: new Set(),
  layersTouched: new Set(),
};

let currentSubject: Subject | null = null;
let queue: DrillItem[] = [];
let current: DrillItem | null = null;
let currentFirstTry = true;
const triedThisItem = new Set<string>();
let contrastiveStack: { value: string; sentence: string; gloss: string }[] = [];

// 直近に出した item.id を覚えて連続出題を避ける。
const recentlyShown: string[] = [];
const RECENT_WINDOW = 8;

// =====================================================================
//  Queue 制御 — パターン磁力の核
// =====================================================================

function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function rebuildQueue(subject: Subject) {
  queue = shuffle(itemsBySubject(subject).slice());
}

/**
 * 次の問題を選ぶ。
 *  - 連鎖中(streak >= 2)なら、直前のpatternTagの類題を優先(磁力)。
 *  - 連鎖が3以上なら、Layerを一段上げる候補を混ぜる(上昇感)。
 *  - それ以外は通常のキューから取る。
 */
function pickNextItem(prev: DrillItem | null): DrillItem {
  if (!currentSubject) return ITEMS[0];

  // 1) 連鎖磁力: prev と同じ patternTag の類題が優先
  if (prev && stats.streak >= 2) {
    // 明示的 nextSimilarId があれば最優先
    if (prev.nextSimilarId) {
      const nx = ITEMS.find(it => it.id === prev.nextSimilarId);
      if (nx && !recentlyShown.includes(nx.id)) return nx;
    }
    const siblings = siblingsByPattern(prev).filter(
      it => it.subject === currentSubject && !recentlyShown.includes(it.id)
    );
    if (siblings.length > 0) {
      return siblings[Math.floor(Math.random() * siblings.length)];
    }
  }

  // 2) 連鎖が3以上で nextVariantId があれば難度を一段上げる
  if (prev && stats.streak >= 3 && prev.nextVariantId) {
    const v = ITEMS.find(it => it.id === prev.nextVariantId);
    if (v) return v;
  }

  // 3) 通常: キューから取る、空ならリビルド
  if (queue.length === 0) rebuildQueue(currentSubject);
  // recentlyShownにあるものはスキップ
  while (queue.length > 0) {
    const candidate = queue.shift()!;
    if (!recentlyShown.includes(candidate.id)) return candidate;
  }
  // 全部recentに入ってたらリセットして取り直し
  recentlyShown.length = 0;
  rebuildQueue(currentSubject);
  return queue.shift()!;
}

function pushRecent(id: string) {
  recentlyShown.push(id);
  while (recentlyShown.length > RECENT_WINDOW) recentlyShown.shift();
}

// =====================================================================
//  画面遷移
// =====================================================================

function startSubject(subject: Subject) {
  currentSubject = subject;
  rebuildQueue(subject);
  current = pickNextItem(null);
  pushRecent(current.id);
  currentFirstTry = true;
  triedThisItem.clear();
  contrastiveStack = [];
  renderDrill();
}

function nextItem() {
  if (!currentSubject) return renderHome();
  const prev = current;
  current = pickNextItem(prev);
  pushRecent(current.id);
  currentFirstTry = true;
  triedThisItem.clear();
  contrastiveStack = [];
  renderDrill();
}

function backToHome() {
  currentSubject = null;
  current = null;
  renderHome();
}

// =====================================================================
//  ホーム画面 — Layer分布と進捗を可視化
// =====================================================================

function renderHome() {
  const app = document.getElementById("app")!;
  const subjects = Object.entries(SUBJECT_META) as [Subject, typeof SUBJECT_META[Subject]][];
  const dist = layerDistribution();
  const totalItems = ITEMS.length;

  app.innerHTML = `
    <header class="home-header">
      <h1>juku <span class="sub">— パターン認知駆動の高速ドリル</span></h1>
      <p class="lead">
        答えは<strong>即座に出します</strong>。パターン認知は問題→答えの高速回転でしか起きないからです。
        連鎖正解で<strong>同パターンの類題が磁力で引き寄せられ</strong>、認知が固まったところで難度が一段上がります。
      </p>
      <p class="lead-sub">
        Layer 1-8 (知識想起→問いの定式化) の階層で、中学基礎から大学院修士レベルまで包摂的にカバー。
      </p>
    </header>

    <section class="subject-grid">
      ${subjects.map(([key, meta]) => {
        const count = itemsBySubject(key).length;
        return `
          <button class="subject-card" data-subject="${key}">
            <div class="emoji">${meta.emoji}</div>
            <div class="subject-label">${meta.label}</div>
            <div class="subject-tagline">${meta.tagline}</div>
            <div class="subject-count">${count}問</div>
          </button>
        `;
      }).join("")}
    </section>

    <section class="layer-panel">
      <h2 class="layer-panel-title">現在のLayer分布 (全${totalItems}問)</h2>
      <div class="layer-bars">
        ${(Object.keys(LAYER_META) as unknown as string[]).map(k => {
          const layer = Number(k) as Layer;
          const meta = LAYER_META[layer];
          const count = dist[layer];
          const pct = totalItems > 0 ? (count / totalItems) * 100 : 0;
          return `
            <div class="layer-row">
              <div class="layer-id">L${layer}</div>
              <div class="layer-info">
                <div class="layer-label">${meta.label} <span class="layer-band">${meta.band}</span></div>
                <div class="layer-bar"><div class="layer-bar-fill l${layer}" style="width:${pct.toFixed(1)}%"></div></div>
              </div>
              <div class="layer-count">${count}問</div>
            </div>
          `;
        }).join("")}
      </div>
      <p class="layer-note">L1-2が現在の中心。L3以降は順次量産予定 (Sonnet 4.7 + 結衣監督)。L7-8 は院入試・修士研究計画レベル。</p>
    </section>

    <footer class="meta">
      <p>問題は全てオリジナル(検定教科書からの引用なし)。Wikipedia由来のCC-BY-SA素材を含む。</p>
      <p>GitHub: <a href="https://github.com/minamorl/juku" target="_blank" rel="noopener">minamorl/juku</a></p>
    </footer>
  `;

  document.querySelectorAll<HTMLButtonElement>(".subject-card").forEach(btn => {
    btn.addEventListener("click", () => {
      const sub = btn.dataset.subject as Subject;
      startSubject(sub);
    });
  });
}

// =====================================================================
//  ドリル画面 — 中毒機構の本体
// =====================================================================

function renderDrill() {
  const app = document.getElementById("app")!;
  if (!current || !currentSubject) return;
  const meta = SUBJECT_META[currentSubject];
  const layer = inferLayer(current);
  const layerMeta = LAYER_META[layer];
  const patternTag = inferPatternTag(current);

  app.innerHTML = `
    <header>
      <button class="back" id="back">← 科目選択へ</button>
      <h1>juku <span class="sub">— ${meta.emoji} ${meta.label}</span></h1>
      <div class="stats">
        <span>挑戦 ${stats.attempts}</span>
        <span>初手正解 ${stats.correctFirstTry}</span>
        <span class="hl">対比学習 ${stats.contrastiveLearned}</span>
        <span class="streak ${stats.streak >= 3 ? "hot" : ""}">🔥 連鎖 ${stats.streak}</span>
        <span class="best">最高 ${stats.bestStreak}</span>
      </div>
    </header>

    <section class="card">
      <div class="meta-row">
        <div class="layer-chip l${layer}">L${layer} ${layerMeta.label}</div>
        <div class="pattern-chip">pattern: ${escapeHTML(patternTag)}</div>
        <div class="tag">${current.skillTag}</div>
      </div>
      <div class="prompt">${escapeHTML(current.prompt).replace("___", "<span class='blank'>＿＿</span>")}</div>
      <div class="choices" id="choices">
        ${shuffle(current.choices.slice()).map(c => `
          <button class="choice" data-value="${escapeAttr(c.value)}">${escapeHTML(c.value)}</button>
        `).join("")}
      </div>
      <div class="contrastive-stack" id="contrastiveStack"></div>
      <div class="feedback" id="feedback"></div>
      <div class="footer">
        <button id="next" class="next" disabled>次の問題 →</button>
      </div>
    </section>

    <footer class="meta">
      <p>誤答は押した瞬間にロックされ、その選択肢が<strong>正解になる別文脈</strong>が下に蓄積されます。すべての選択肢を踏むと語法を一気に取れます。正解で次の問題へ。連鎖2問以上で<strong>同パターンの類題が磁力で出ます</strong>。</p>
    </footer>
  `;

  document.getElementById("back")!.addEventListener("click", backToHome);
  document.querySelectorAll<HTMLButtonElement>(".choice").forEach(btn => {
    btn.addEventListener("click", () => onAnswer(btn));
  });
  document.getElementById("next")!.addEventListener("click", nextItem);
}

// =====================================================================
//  解答ロジック
// =====================================================================

function onAnswer(btn: HTMLButtonElement) {
  if (!current) return;
  const value = btn.dataset.value!;
  if (btn.disabled || triedThisItem.has(value)) return;
  triedThisItem.add(value);
  btn.disabled = true;

  const isCorrect = value === current.correct;
  const choice = current.choices.find(c => c.value === value)!;

  if (isCorrect) {
    btn.classList.add("correct");
    if (currentFirstTry) {
      stats.attempts++;
      stats.correctFirstTry++;
      stats.streak++;
      if (stats.streak > stats.bestStreak) stats.bestStreak = stats.streak;
      stats.patternsHit.add(inferPatternTag(current));
      stats.layersTouched.add(inferLayer(current));
      // 連鎖の節目で派手な演出
      if (stats.streak === 3) flashOverlay("🔥 連鎖3 — 同パターンの類題が来ます");
      else if (stats.streak === 5) flashOverlay("🔥🔥 連鎖5 — 認知固まりました");
      else if (stats.streak === 10) flashOverlay("🔥🔥🔥 連鎖10 — Layer上昇");
    } else if (!stats.attempts || stats.attempts === 0) {
      stats.attempts++;
      // 誤答後の正解は連鎖維持しない
    }
    showCorrectFeedback(current);
    document.querySelectorAll<HTMLButtonElement>(".choice").forEach(b => b.disabled = true);
    (document.getElementById("next") as HTMLButtonElement).disabled = false;
    updateStatsBar();
  } else {
    btn.classList.add("wrong");
    if (currentFirstTry) {
      stats.attempts++;
      currentFirstTry = false;
      // 連鎖は誤答でリセット
      if (stats.streak > 0) {
        stats.streak = 0;
      }
    }
    if (choice.validContext) {
      stats.contrastiveLearned++;
      contrastiveStack.push({
        value: choice.value,
        sentence: choice.validContext.sentence,
        gloss: choice.validContext.gloss,
      });
      renderContrastiveStack();
    } else {
      const fb = document.getElementById("feedback")!;
      fb.innerHTML = `<div class="fb fb-wrong"><div class="fb-title">違います</div><div class="fb-body">他の選択肢を試してみてください。</div></div>`;
    }
    updateStatsBar();
  }
}

function renderContrastiveStack() {
  const el = document.getElementById("contrastiveStack");
  if (!el) return;
  if (contrastiveStack.length === 0) {
    el.innerHTML = "";
    return;
  }
  el.innerHTML = contrastiveStack.map((c, idx) => `
    <div class="fb fb-contrast" style="animation-delay:${idx * 50}ms">
      <div class="fb-title">『${escapeHTML(c.value)}』が正解になる文脈</div>
      <div class="example">${escapeHTML(c.sentence)}</div>
      <div class="gloss">${escapeHTML(c.gloss)}</div>
    </div>
  `).join("");
}

function updateStatsBar() {
  const stat = document.querySelector(".stats");
  if (stat) {
    stat.innerHTML = `
      <span>挑戦 ${stats.attempts}</span>
      <span>初手正解 ${stats.correctFirstTry}</span>
      <span class="hl">対比学習 ${stats.contrastiveLearned}</span>
      <span class="streak ${stats.streak >= 3 ? "hot" : ""}">🔥 連鎖 ${stats.streak}</span>
      <span class="best">最高 ${stats.bestStreak}</span>
    `;
  }
}

function showCorrectFeedback(item: DrillItem) {
  const fb = document.getElementById("feedback")!;
  const sourcesHTML = item.sources && item.sources.length
    ? `<div class="fb-sources">出典: ${item.sources.map((u, i) => `<a href="${escapeAttr(u)}" target="_blank" rel="noopener noreferrer">[${i + 1}]</a>`).join(" ")}</div>`
    : "";
  // パターン上の進捗ヒント
  const pat = inferPatternTag(item);
  const patSiblings = siblingsByPattern(item).length;
  const patHint = patSiblings > 0
    ? `<div class="fb-pattern">パターン <code>${escapeHTML(pat)}</code> の類題があと${patSiblings}問。連鎖中なら次に出ます。</div>`
    : "";
  fb.innerHTML = `
    <div class="fb fb-correct">
      <div class="fb-title">正解</div>
      <div class="fb-body">${escapeHTML(item.why)}</div>
      ${patHint}
      ${sourcesHTML}
    </div>
  `;
}

// 画面上に短時間出るオーバーレイ演出 (連鎖の節目で発火)
function flashOverlay(message: string) {
  const existing = document.getElementById("flash-overlay");
  if (existing) existing.remove();
  const div = document.createElement("div");
  div.id = "flash-overlay";
  div.className = "flash-overlay";
  div.textContent = message;
  document.body.appendChild(div);
  setTimeout(() => div.classList.add("show"), 10);
  setTimeout(() => {
    div.classList.remove("show");
    setTimeout(() => div.remove(), 400);
  }, 1400);
}

function escapeHTML(s: string): string {
  return s.replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]!));
}
function escapeAttr(s: string): string { return escapeHTML(s); }

renderHome();
