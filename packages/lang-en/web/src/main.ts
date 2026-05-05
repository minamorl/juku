import { ITEMS, type DrillItem, type Choice } from "./items";

interface Stats {
  attempts: number;
  correctFirstTry: number;
  contrastiveLearned: number; // 誤答→valid_contextを見た回数
}

const stats: Stats = { attempts: 0, correctFirstTry: 0, contrastiveLearned: 0 };
let queue: DrillItem[] = shuffle([...ITEMS]);
let current: DrillItem | null = null;
let currentFirstTry = true;

function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function nextItem() {
  if (queue.length === 0) {
    queue = shuffle([...ITEMS]);
  }
  current = queue.shift()!;
  currentFirstTry = true;
  render();
}

function render() {
  const app = document.getElementById("app")!;
  if (!current) {
    app.innerHTML = "<p>読み込み中...</p>";
    return;
  }
  app.innerHTML = `
    <header>
      <h1>juku <span class="sub">— English Drill</span></h1>
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
        ${shuffle([...current.choices]).map(c => `
          <button class="choice" data-value="${escapeAttr(c.value)}">${escapeHTML(c.value)}</button>
        `).join("")}
      </div>
      <div class="feedback" id="feedback"></div>
      <div class="footer">
        <button id="next" class="next" disabled>次の問題 →</button>
      </div>
    </section>
    <footer class="meta">
      <p>対比学習(contrastive feedback): 誤答を選んでも、その選択肢が<strong>正解になる別文脈</strong>を提示します。1問で2語法を獲得できます。</p>
    </footer>
  `;
  document.querySelectorAll<HTMLButtonElement>(".choice").forEach(btn => {
    btn.addEventListener("click", () => onAnswer(btn));
  });
  document.getElementById("next")!.addEventListener("click", () => nextItem());
}

function onAnswer(btn: HTMLButtonElement) {
  if (!current) return;
  const value = btn.dataset.value!;
  const isCorrect = value === current.correct;
  const choice = current.choices.find(c => c.value === value)!;

  btn.classList.add(isCorrect ? "correct" : "wrong");
  btn.disabled = true;

  if (isCorrect) {
    if (currentFirstTry) {
      stats.attempts++;
      stats.correctFirstTry++;
    }
    showCorrectFeedback(current);
    document.querySelectorAll<HTMLButtonElement>(".choice").forEach(b => b.disabled = true);
    (document.getElementById("next") as HTMLButtonElement).disabled = false;
    updateStatsBar();
  } else {
    if (currentFirstTry) {
      stats.attempts++;
      currentFirstTry = false;
    }
    if (choice.validContext) {
      stats.contrastiveLearned++;
    }
    showContrastiveFeedback(current, choice);
    updateStatsBar();
  }
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

function showContrastiveFeedback(item: DrillItem, wrongChoice: Choice) {
  const fb = document.getElementById("feedback")!;
  if (wrongChoice.validContext) {
    fb.innerHTML = `
      <div class="fb fb-contrast">
        <div class="fb-title">『${escapeHTML(wrongChoice.value)}』が正解になる文脈もあります</div>
        <div class="example">${escapeHTML(wrongChoice.validContext.sentence)}</div>
        <div class="gloss">${escapeHTML(wrongChoice.validContext.gloss)}</div>
        <div class="hint">この問題では <strong>${escapeHTML(item.correct)}</strong> が正解。もう一度選んでみてください。</div>
      </div>
    `;
  } else {
    fb.innerHTML = `
      <div class="fb fb-wrong">
        <div class="fb-title">違います</div>
        <div class="fb-body">もう一度考えてみてください。</div>
      </div>
    `;
  }
}

function escapeHTML(s: string): string {
  return s.replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]!));
}
function escapeAttr(s: string): string { return escapeHTML(s); }

nextItem();
