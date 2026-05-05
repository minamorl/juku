#!/usr/bin/env node
// 英語の対比学習問題を大量生成。
// 中学〜高校文法の頻出ペアを網羅。CEFR-J 語彙レベル A1-B1 を意識。

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, "..", "output");

const ITEMS = [
  // ===== 前置詞 =====
  {
    id: "en-prep-on-in-1", subject: "english", skillTag: "preposition.on_in.time",
    prompt: "I was born ___ April.",
    correct: "in",
    why: "月名・年・季節は in。",
    choices: [
      { value: "in" },
      { value: "on", validContext: { sentence: "I was born on April 5th.", gloss: "日付(○月○日)が付くと on。日単位の時間指定。" } },
      { value: "at", validContext: { sentence: "I was born at midnight.", gloss: "時刻のピンポイント (at noon, at 7 o'clock) は at。" } },
    ],
  },
  {
    id: "en-prep-by-until-1", subject: "english", skillTag: "preposition.by_until",
    prompt: "Please finish your homework ___ tomorrow.",
    correct: "by",
    why: "by ＝〜までに(締切)。動作の完了期限。",
    choices: [
      { value: "by" },
      { value: "until", validContext: { sentence: "Please wait here until tomorrow.", gloss: "until ＝〜までずっと(継続)。状態が続く期間。" } },
    ],
  },
  {
    id: "en-prep-between-among-1", subject: "english", skillTag: "preposition.between_among",
    prompt: "He sat ___ his two sisters.",
    correct: "between",
    why: "between ＝個別に意識される2者(または明確な複数)の間。",
    choices: [
      { value: "between" },
      { value: "among", validContext: { sentence: "He sat among the crowd.", gloss: "among ＝集団の中に紛れて。個々を区別しないとき。" } },
    ],
  },
  {
    id: "en-prep-during-for-1", subject: "english", skillTag: "preposition.during_for",
    prompt: "I worked ___ the summer vacation.",
    correct: "during",
    why: "during + 特定の期間名詞 (the summer vacation, the meeting)。",
    choices: [
      { value: "during" },
      { value: "for", validContext: { sentence: "I worked for two months.", gloss: "for + 期間の長さ(具体的な数値)。" } },
      { value: "while", validContext: { sentence: "I worked while my parents were away.", gloss: "while は接続詞で、後ろに節 (S+V) が来る。前置詞の during とは品詞が違う。" } },
    ],
  },

  // ===== 時制 =====
  {
    id: "en-tense-perfect-past-1", subject: "english", skillTag: "tense.present_perfect_vs_past",
    prompt: "I ___ to Kyoto three times.",
    correct: "have been",
    why: "現在までの経験は現在完了。",
    choices: [
      { value: "have been" },
      { value: "went", validContext: { sentence: "I went to Kyoto last week.", gloss: "yesterday, last 〜, ago など過去の特定時点を示す副詞があれば過去形。" } },
      { value: "had been", validContext: { sentence: "I had been to Kyoto three times before I moved there.", gloss: "過去のある時点までの経験は過去完了。" } },
    ],
  },
  {
    id: "en-tense-progressive-1", subject: "english", skillTag: "tense.progressive_vs_simple",
    prompt: "Look! The bus ___.",
    correct: "is coming",
    why: "今まさに進行中の動作は現在進行形。Lookという即時性の合図がある。",
    choices: [
      { value: "is coming" },
      { value: "comes", validContext: { sentence: "The bus comes every 10 minutes.", gloss: "習慣・時刻表的な事実は単純現在形。" } },
      { value: "came", validContext: { sentence: "The bus came at 7:00.", gloss: "過去の出来事は過去形。" } },
    ],
  },

  // ===== 助動詞 =====
  {
    id: "en-modal-must-have-1", subject: "english", skillTag: "modal.must_have_to",
    prompt: "I ___ go now, or I'll miss the train.",
    correct: "must",
    why: "話し手の主観的・内的義務感は must。",
    choices: [
      { value: "must" },
      { value: "have to", validContext: { sentence: "I have to wear a uniform at school.", gloss: "外的・客観的な必要(規則・状況)は have to が自然。" } },
      { value: "should", validContext: { sentence: "You should see a doctor.", gloss: "should は『〜したほうがよい』という助言・推奨。義務より弱い。" } },
    ],
  },
  {
    id: "en-modal-can-may-1", subject: "english", skillTag: "modal.can_may.permission",
    prompt: "(formal request) ___ I leave early today, sir?",
    correct: "May",
    why: "フォーマルな許可願いは may。",
    choices: [
      { value: "May" },
      { value: "Can", validContext: { sentence: "Can I borrow your pen?", gloss: "カジュアルな許可・依頼は can。友達同士など。" } },
      { value: "Will", validContext: { sentence: "Will you pass me the salt?", gloss: "Will you 〜? は依頼。許可ではなく相手に行動を頼むとき。" } },
    ],
  },

  // ===== 関係詞 =====
  {
    id: "en-rel-who-which-1", subject: "english", skillTag: "relative.who_which",
    prompt: "The man ___ lives next door is a doctor.",
    correct: "who",
    why: "先行詞が人 → who(主格)。",
    choices: [
      { value: "who" },
      { value: "which", validContext: { sentence: "The book which is on the table is mine.", gloss: "先行詞が物・動物のとき which。" } },
      { value: "whose", validContext: { sentence: "The man whose car was stolen called the police.", gloss: "所有関係(〜の)を示すとき whose。" } },
    ],
  },
  {
    id: "en-rel-that-what-1", subject: "english", skillTag: "relative.that_what",
    prompt: "This is ___ I want.",
    correct: "what",
    why: "先行詞を含む関係代名詞 what ＝『〜するもの・こと』。先行詞なしで使える。",
    choices: [
      { value: "what" },
      { value: "that", validContext: { sentence: "This is the book that I want.", gloss: "先行詞 (the book) があるときは that。" } },
      { value: "which", validContext: { sentence: "This is the book, which I bought yesterday.", gloss: "コンマ付きの非制限用法では which。情報を追加する。" } },
    ],
  },

  // ===== 不定詞・動名詞 =====
  {
    id: "en-toinf-vs-ger-1", subject: "english", skillTag: "verbpattern.toinf_vs_gerund",
    prompt: "I enjoy ___ to music.",
    correct: "listening",
    why: "enjoy は動名詞のみを目的語にとる(enjoy doing)。",
    choices: [
      { value: "listening" },
      { value: "to listen", validContext: { sentence: "I want to listen to music.", gloss: "want, hope, decide, plan などは to不定詞をとる。" } },
    ],
  },
  {
    id: "en-stop-doing-1", subject: "english", skillTag: "verbpattern.stop_doing_vs_to_do",
    prompt: "He stopped ___ a cigarette. (休憩のために立ち止まった)",
    correct: "to smoke",
    why: "stop to do ＝『〜するために立ち止まる』。to不定詞は目的を表す副詞用法。",
    choices: [
      { value: "to smoke" },
      { value: "smoking", validContext: { sentence: "He stopped smoking last year. (タバコをやめた)", gloss: "stop doing ＝『〜するのをやめる』。動作の中止。" } },
    ],
  },

  // ===== 比較 =====
  {
    id: "en-comp-as-than-1", subject: "english", skillTag: "comparative.as_than",
    prompt: "She is taller ___ her brother.",
    correct: "than",
    why: "比較級 + than。",
    choices: [
      { value: "than" },
      { value: "as", validContext: { sentence: "She is as tall as her brother.", gloss: "as 〜 as は同等比較。原級をはさむ。" } },
    ],
  },
  {
    id: "en-comp-most-best-1", subject: "english", skillTag: "comparative.regular_irregular",
    prompt: "This is the ___ movie I've ever seen.",
    correct: "best",
    why: "good の最上級は best (不規則変化)。",
    choices: [
      { value: "best" },
      { value: "most good", validContext: { sentence: "(規則変化の例) This is the most interesting movie.", gloss: "3音節以上の形容詞は most + 原級。good は不規則なので適用外。" } },
      { value: "better", validContext: { sentence: "This movie is better than that one.", gloss: "比較級は2者間の比較。最上級は3者以上から1つを選ぶ。" } },
    ],
  },

  // ===== 仮定法 =====
  {
    id: "en-subj-past-1", subject: "english", skillTag: "subjunctive.past",
    prompt: "If I ___ rich, I would travel the world.",
    correct: "were",
    why: "仮定法過去:現在の事実に反する仮定。be動詞は人称に関わらず were が標準。",
    choices: [
      { value: "were" },
      { value: "am", validContext: { sentence: "If I am late, please start without me.", gloss: "現実的な可能性のある条件は直説法 (if + 現在形)。" } },
      { value: "had been", validContext: { sentence: "If I had been rich then, I would have traveled.", gloss: "仮定法過去完了:過去の事実に反する仮定。" } },
    ],
  },

  // ===== 受動態 =====
  {
    id: "en-passive-by-with-1", subject: "english", skillTag: "passive.by_with",
    prompt: "The window was broken ___ a stone.",
    correct: "with",
    why: "道具・手段を表すときは with。",
    choices: [
      { value: "with" },
      { value: "by", validContext: { sentence: "The window was broken by John.", gloss: "動作の行為者(誰が)は by。" } },
    ],
  },

  // ===== 冠詞 (拡張) =====
  {
    id: "en-art-zero-the-1", subject: "english", skillTag: "article.zero_the.school",
    prompt: "He goes to ___ school every day. (生徒として通学)",
    correct: "(no article)",
    why: "school, church, hospital, prison は本来の目的で行く場合、無冠詞 (school = 学業, church = 礼拝など)。",
    choices: [
      { value: "(no article)" },
      { value: "the", validContext: { sentence: "His father went to the school to talk to the teacher.", gloss: "建物として訪れる場合は the。生徒として通うのではなく『学校の建物に行く』。" } },
    ],
  },

  // ===== 語法ペア =====
  {
    id: "en-vocab-many-much-1", subject: "english", skillTag: "vocab.many_much",
    prompt: "There aren't ___ apples in the basket.",
    correct: "many",
    why: "可算名詞の複数形には many。",
    choices: [
      { value: "many" },
      { value: "much", validContext: { sentence: "There isn't much water in the bottle.", gloss: "不可算名詞には much。water, money, time などはこちら。" } },
    ],
  },
  {
    id: "en-vocab-fewer-less-1", subject: "english", skillTag: "vocab.fewer_less",
    prompt: "There are ___ students this year than last year.",
    correct: "fewer",
    why: "可算名詞の比較級は fewer。",
    choices: [
      { value: "fewer" },
      { value: "less", validContext: { sentence: "There is less water this year than last year.", gloss: "不可算名詞の比較級は less。" } },
    ],
  },
  {
    id: "en-vocab-borrow-lend-1", subject: "english", skillTag: "vocab.borrow_lend",
    prompt: "Can I ___ your pen, please?",
    correct: "borrow",
    why: "borrow ＝(自分が)借りる。",
    choices: [
      { value: "borrow" },
      { value: "lend", validContext: { sentence: "Can you lend me your pen?", gloss: "lend ＝(相手が)貸す。動作の主体が逆。" } },
      { value: "rent", validContext: { sentence: "I want to rent a car for the weekend.", gloss: "rent ＝有料で借りる/貸す。家・車など。" } },
    ],
  },
  {
    id: "en-vocab-say-tell-1", subject: "english", skillTag: "vocab.say_tell",
    prompt: "She ___ me an interesting story.",
    correct: "told",
    why: "tell + 人 + 内容 の語順。tell は『誰に』を直接目的語に取る。",
    choices: [
      { value: "told" },
      { value: "said", validContext: { sentence: "She said something interesting to me.", gloss: "say は『誰に』を to で示す。直接 me を取れない。" } },
      { value: "spoke", validContext: { sentence: "She spoke to me about the project.", gloss: "speak は『話す行為』そのもの。内容より動作に焦点。" } },
    ],
  },
];

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  await fs.writeFile(path.join(OUT_DIR, "english-curated.json"), JSON.stringify(ITEMS, null, 2), "utf8");
  console.log(`Wrote ${ITEMS.length} curated English items.`);
}

main();
