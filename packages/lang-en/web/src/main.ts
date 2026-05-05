import { ITEMS, SUBJECT_META, itemsBySubject, type DrillItem, type Choice, type Subject } from "./items";

interface Stats {
  attempts: number;
  correctFirstTry: number;
  contrastiveLearned: number; // 誤答→valid_contextを見た回数
}

const stats: Stats = { attempts: 0, correctFirstTry: 0, contrastiveLearned: 0 };
let currentSubject: Subject | null = null;
let queue: DrillItem[] = [];
let current: DrillItem | null = null;
let currentFirstTry = true;
const triedThisItem = new Set<string>(); // 誤答ボタンの蓄積表示制御
let contrastiveStack: { value: string; sentence: string; gloss: string }[] = [];

function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function startSubject(subject: Subject) {
  currentSubject = subject;
  queue = shuffle(itemsBySubject(subject).slice());
  nextItem();
}

function nextItem() {
  if (!currentSubject) return renderHome();
  if (queue.length === 0) {
    queue = shuffle(itemsBySubject(currentSubject).slice());
  }
  current = queue.shift()!;
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

function renderHome() {
  const app = document.getElementById("app")!;
  const subjects = Object.entries(SUBJECT_META) as [Subject, typeof SUBJECT_META[Subject]][];
  app.innerHTML = `
    <header class="home-header">
      <h1>juku <span class="sub">— 五科目対比学習ドリル</span></h1>
      <p class="lead">
        誤答を選んでも終わりません。<strong>その選択肢が正解になる別の文脈</strong>を提示して、1問で2つの知識を獲得できる設計です。
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
            <div class="subject-count">${count}問収録</div>
          </button>
        `;
      }).join("")}
    </section>
    <footer class="meta">
      <p>各科目${ITEMS.length / 5}問の最小プロトタイプ。問題は全てオリジナル(検定教科書からの引用なし)。</p>
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

function renderDrill() {
  const app = document.getElementById("app")!;
  if (!current || !currentSubject) return;
  const meta = SUBJECT_META[currentSubject];
  app.innerHTML = `
    <header>
      <button class="back" id="back">← 科目選択へ</button>
      <h1>juku <span class="sub">— ${meta.emoji} ${meta.label}</span></h1>
      <div class="stats">
        <span>挑戦 ${stats.attempts}</span>
        <span>初手正解 ${stats.correctFirstTry}</span>
        <span class="hl">対比学習 ${stats.contrastiveLearned}</span>
      </div>
    </header>
    <section class="card">
      <div class="tag">${current.skillTag}</div>
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
      <p>誤答ボタンは押した瞬間にロックされ、その選択肢が<strong>正解になる別文脈</strong>が下に蓄積されます。すべての選択肢を踏むと語法を一気に取れます。正解を押すと次の問題へ。</p>
    </footer>
  `;
  document.getElementById("back")!.addEventListener("click", backToHome);
  document.querySelectorAll<HTMLButtonElement>(".choice").forEach(btn => {
    btn.addEventListener("click", () => onAnswer(btn));
  });
  document.getElementById("next")!.addEventListener("click", nextItem);
}

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
    } else if (!stats.attempts || stats.attempts === 0) {
      stats.attempts++;
    }
    showCorrectFeedback(current);
    // 全選択肢ロック(正解で確定)
    document.querySelectorAll<HTMLButtonElement>(".choice").forEach(b => b.disabled = true);
    (document.getElementById("next") as HTMLButtonElement).disabled = false;
    updateStatsBar();
  } else {
    btn.classList.add("wrong");
    if (currentFirstTry) {
      stats.attempts++;
      currentFirstTry = false;
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
      // valid_contextが無い誤答(英語の正解と同じ系統など) → 軽い注意のみ
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
    `;
  }
}

function showCorrectFeedback(item: DrillItem) {
  const fb = document.getElementById("feedback")!;
  fb.innerHTML = `
    <div class="fb fb-correct">
      <div class="fb-title">正解</div>
      <div class="fb-body">${escapeHTML(item.why)}</div>
    </div>
  `;
}

function escapeHTML(s: string): string {
  return s.replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]!));
}
function escapeAttr(s: string): string { return escapeHTML(s); }

renderHome();
