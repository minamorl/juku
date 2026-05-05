#!/usr/bin/env node
// 青空文庫(Aozora Bunko)から国語の対比学習素材を生成する。
// パブリックドメインの作家を選び、作品の冒頭から指示語/接続詞/語彙の
// 識別問題を抽出する。
//
// 利用可能API:
//   GitHub Pages 上のテキスト: https://www.aozora.gr.jp/cards/000148/files/...
// ここでは aozora-bunko-text(GitHub) のミラーを使い、軽量にfetch。
//
// 今回は最小実装として「典型的な接続詞・指示語の用例」を選定済み素材から
// ドリル化する。本格パースは別タスク。

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, "..", "output");

// 国語の語彙弁別＋紛らわしい同音異義語を厳選。
// 青空文庫の引用は短句のみ・出典明示で行う(著作権切れ作家)。
const ITEMS = [
  // ===== 同音異義語の弁別 =====
  {
    id: "ja-homophone-igai-1",
    subject: "japanese",
    skillTag: "vocab.homophone.以外_意外",
    prompt: "次の文の___に入るのは？\n「彼が来るとは___だった。」",
    correct: "意外",
    why: "意外＝予想外。「彼が来るとは予想外だった」の意味。",
    choices: [
      { value: "意外" },
      { value: "以外", validContext: { sentence: "彼以外、誰も賛成しなかった。", gloss: "以外＝それを除いた残り。範囲を限定する用法。" } },
    ],
  },
  {
    id: "ja-homophone-igai-2",
    subject: "japanese",
    skillTag: "vocab.homophone.以外_意外",
    prompt: "次の文の___に入るのは？\n「日本___の国はみな夏休みが長い。」",
    correct: "以外",
    why: "以外＝〜を除いた他の。範囲限定。",
    choices: [
      { value: "以外" },
      { value: "意外", validContext: { sentence: "日本がオリンピックでこれほど勝つとは意外だった。", gloss: "意外＝予想外。心理的な驚きを表す。" } },
    ],
  },
  {
    id: "ja-homophone-taisho-1",
    subject: "japanese",
    skillTag: "vocab.homophone.対象_対照_対称",
    prompt: "次の文の___に入るのは？\n「左右___な図形を線対称という。」",
    correct: "対称",
    why: "対称＝シンメトリー。左右や上下が釣り合っている状態。",
    choices: [
      { value: "対称" },
      { value: "対象", validContext: { sentence: "この調査の対象は18歳以上です。", gloss: "対象＝働きかけの相手。物事の的(まと)。" } },
      { value: "対照", validContext: { sentence: "兄と弟は対照的な性格だ。", gloss: "対照＝二つを並べて違いを際立たせること。コントラスト。" } },
    ],
  },
  {
    id: "ja-homophone-taisho-2",
    subject: "japanese",
    skillTag: "vocab.homophone.対象_対照_対称",
    prompt: "次の文の___に入るのは？\n「子どもを___とした絵本展。」",
    correct: "対象",
    why: "対象＝働きかけの相手・的。",
    choices: [
      { value: "対象" },
      { value: "対称", validContext: { sentence: "この建築は完璧な対称構造だ。", gloss: "対称＝シンメトリー。形の釣り合い。" } },
      { value: "対照", validContext: { sentence: "原文と訳文を対照する。", gloss: "対照＝照らし合わせて比較すること。" } },
    ],
  },
  {
    id: "ja-homophone-shokai-1",
    subject: "japanese",
    skillTag: "vocab.homophone.照会_紹介_詳解",
    prompt: "次の文の___に入るのは？\n「銀行に残高を___する。」",
    correct: "照会",
    why: "照会＝問い合わせて確認すること。",
    choices: [
      { value: "照会" },
      { value: "紹介", validContext: { sentence: "友人を上司に紹介する。", gloss: "紹介＝人や物を引き合わせること。" } },
    ],
  },
  {
    id: "ja-homophone-kankaku-1",
    subject: "japanese",
    skillTag: "vocab.homophone.感覚_間隔",
    prompt: "次の文の___に入るのは？\n「電車の運行___を短くする。」",
    correct: "間隔",
    why: "間隔＝物事のあいだの距離・時間。",
    choices: [
      { value: "間隔" },
      { value: "感覚", validContext: { sentence: "彼は色彩感覚に優れている。", gloss: "感覚＝感じ取る力。センス。" } },
    ],
  },
  {
    id: "ja-homophone-seisan-1",
    subject: "japanese",
    skillTag: "vocab.homophone.精算_清算",
    prompt: "次の文の___に入るのは？\n「乗り越し料金を___する。」",
    correct: "精算",
    why: "精算＝細かく計算して過不足を整えること。料金の計算が典型。",
    choices: [
      { value: "精算" },
      { value: "清算", validContext: { sentence: "過去の関係を清算する。会社を清算する。", gloss: "清算＝負債や関係を整理し終わらせること。会計法的な完了。" } },
    ],
  },
  {
    id: "ja-homophone-shuyo-1",
    subject: "japanese",
    skillTag: "vocab.homophone.収容_収用_収納",
    prompt: "次の文の___に入るのは？\n「1万人を___できるスタジアム。」",
    correct: "収容",
    why: "収容＝人や物を受け入れて中に入れること。",
    choices: [
      { value: "収容" },
      { value: "収用", validContext: { sentence: "道路建設のため土地を収用する。", gloss: "収用＝公共目的で私有財産を強制的に取得すること。法律用語。" } },
      { value: "収納", validContext: { sentence: "服を収納ケースにしまう。", gloss: "収納＝物を片付けてしまうこと。家具・家事の文脈。" } },
    ],
  },

  // ===== 助詞の弁別 =====
  {
    id: "ja-particle-wa-ga-1",
    subject: "japanese",
    skillTag: "particle.wa_ga",
    prompt: "次の文の___に入る助詞は？\n「私___学生です。(初対面の自己紹介)」",
    correct: "は",
    why: "「は」は主題提示。聞き手にとって既知の枠で『私について言えば』と提示する。",
    choices: [
      { value: "は" },
      { value: "が", validContext: { sentence: "「誰が学生ですか？」「私が学生です。」", gloss: "「が」は新情報の主語。質問への直接回答や排他的指示で使う。" } },
    ],
  },

  // ===== 紛らわしい敬語 =====
  {
    id: "ja-keigo-ukagau-1",
    subject: "japanese",
    skillTag: "keigo.ukagau",
    prompt: "次の文の敬語として正しいのは？\n「明日、御社に___ます。(訪問する側)」",
    correct: "伺い",
    why: "「伺う」は『行く・訪ねる・聞く』の謙譲語。自分の動作をへりくだって表現。",
    choices: [
      { value: "伺い" },
      { value: "いらっしゃい", validContext: { sentence: "明日、社長が御社にいらっしゃいます。(相手側の動作)", gloss: "「いらっしゃる」は『来る・行く・いる』の尊敬語。相手の動作にだけ使う。" } },
      { value: "参り", validContext: { sentence: "ただいま参ります。(単純に『行く』の謙譲)", gloss: "「参る」は単純な『行く・来る』の謙譲。訪問先への敬意を強く込める場面では『伺う』の方が適切。" } },
    ],
  },

  // ===== 接続詞 =====
  {
    id: "ja-conj-shikashi-1",
    subject: "japanese",
    skillTag: "conjunction.shikashi_dakara",
    prompt: "次の___に入る接続詞は？\n「雨が降った。___遠足は中止になった。」",
    correct: "だから",
    why: "原因→結果の順接。",
    choices: [
      { value: "だから" },
      { value: "しかし", validContext: { sentence: "雨が降った。しかし遠足は決行された。", gloss: "予想と逆の結果が続くとき逆接の『しかし』。" } },
      { value: "ところで", validContext: { sentence: "雨が降った。ところで明日の予定はどうする？", gloss: "話題転換の『ところで』。直前の話を切り替えるとき。" } },
    ],
  },
  {
    id: "ja-conj-tsumari-1",
    subject: "japanese",
    skillTag: "conjunction.tsumari_tatoeba",
    prompt: "次の___に入る接続詞は？\n「彼は朝5時に起き、夜0時まで働く。___超人だ。」",
    correct: "つまり",
    why: "前文を要約・言い換える換言の接続詞。",
    choices: [
      { value: "つまり" },
      { value: "たとえば", validContext: { sentence: "彼は超人的な働き方をする。たとえば朝5時から夜0時まで働く。", gloss: "「たとえば」は具体例の提示。一般論→具体の流れ。" } },
    ],
  },

  // ===== 古文・文学史 =====
  {
    id: "ja-kobun-genji-1",
    subject: "japanese",
    skillTag: "literature.heian",
    prompt: "「いづれの御時にか、女御、更衣あまた候ひ給ひける中に、いとやむごとなき際にはあらぬが、すぐれて時めき給ふありけり。」これは何の冒頭か？",
    correct: "源氏物語",
    why: "桐壺巻の冒頭。光源氏の母・桐壺更衣の登場場面。",
    choices: [
      { value: "源氏物語" },
      { value: "枕草子", validContext: { sentence: "「春はあけぼの。やうやう白くなりゆく山ぎは、すこしあかりて、紫だちたる雲のほそくたなびきたる。」が枕草子の冒頭。", gloss: "枕草子は清少納言の随筆。四季の風物への鋭い感性が特徴。" } },
      { value: "徒然草", validContext: { sentence: "「つれづれなるままに、日暮らし、硯にむかひて...」が徒然草の冒頭。", gloss: "徒然草は兼好法師の随筆。鎌倉末期の無常観。" } },
    ],
  },
  {
    id: "ja-bungaku-modern-1",
    subject: "japanese",
    skillTag: "literature.modern.opening",
    prompt: "「吾輩は猫である。名前はまだ無い。」これは誰の作品の冒頭か？",
    correct: "夏目漱石",
    why: "夏目漱石『吾輩は猫である』(1905年)の有名な冒頭。",
    choices: [
      { value: "夏目漱石" },
      { value: "森鴎外", validContext: { sentence: "「石炭をば早や積み果てつ。中等室の卓のほとりはいと静かにて...」(『舞姫』)が森鴎外の代表作の冒頭。", gloss: "森鴎外は雅文体の代表。漱石とほぼ同時代。" } },
      { value: "芥川龍之介", validContext: { sentence: "「ある日の暮方の事である。一人の下人が、羅生門の下で雨やみを待っていた。」(『羅生門』)が芥川の代表作。", gloss: "芥川龍之介は短編の名手。漱石の弟子筋。" } },
    ],
    sources: ["https://www.aozora.gr.jp/cards/000148/card789.html"],
  },
];

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  await fs.writeFile(path.join(OUT_DIR, "japanese-curated.json"), JSON.stringify(ITEMS, null, 2), "utf8");
  console.log(`Wrote ${ITEMS.length} curated Japanese items.`);
}

main();
