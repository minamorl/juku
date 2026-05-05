#!/usr/bin/env node
// Wikipedia(JA) から紛らわしい用語ペアの定義を取得して、
// 対比学習ドリル素材 (DrillItem の seed) を生成する。
//
// MediaWiki API の extracts (text only, plain) を使う。
// CC BY-SA 3.0 / GFDL なので出典明示で利用可。
// 出典は output/wikipedia-sources.json に記録する。
//
// 使い方:
//   node fetch-wikipedia.mjs
// 出力:
//   output/wikipedia-pairs.json   ... DrillItem seed 配列
//   output/wikipedia-sources.json ... 出典リスト (URL, last fetched)

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, "..", "output");
const CACHE_DIR = path.resolve(__dirname, "..", "cache");

const API = "https://ja.wikipedia.org/w/api.php";
const UA = "juku-edu-bot/0.1 (https://github.com/minamorl/juku; educational use)";

// 紛らわしいペア候補。各教科ごとに、対比学習として成立する用語ペアを並べる。
// title は Wikipedia(JA) のページタイトル。
const PAIRS = [
  // ===== 社会 (歴史/公民/地理) =====
  { subject: "social", skill: "古代史:縄文と弥生", a: "縄文時代", b: "弥生時代" },
  { subject: "social", skill: "中世幕府:鎌倉と室町", a: "鎌倉幕府", b: "室町幕府" },
  { subject: "social", skill: "古代仏教宗派:天台と真言", a: "天台宗", b: "真言宗" },
  { subject: "social", skill: "鎌倉新仏教:浄土宗と浄土真宗", a: "浄土宗", b: "浄土真宗" },
  { subject: "social", skill: "近世改革:享保と寛政", a: "享保の改革", b: "寛政の改革" },
  { subject: "social", skill: "近世改革:寛政と天保", a: "寛政の改革", b: "天保の改革" },
  { subject: "social", skill: "明治三大改革:版籍奉還と廃藩置県", a: "版籍奉還", b: "廃藩置県" },
  { subject: "social", skill: "幕末条約:日米和親と日米修好通商", a: "日米和親条約", b: "日米修好通商条約" },
  { subject: "social", skill: "公民:衆議院と参議院", a: "衆議院", b: "参議院" },
  { subject: "social", skill: "公民:内閣と国会", a: "内閣", b: "国会" },
  { subject: "social", skill: "経済:GDPとGNI", a: "国内総生産", b: "国民総所得" },
  { subject: "social", skill: "気候:温帯と亜寒帯", a: "温帯", b: "亜寒帯" },
  { subject: "social", skill: "産業:第一次産業と第二次産業", a: "第一次産業", b: "第二次産業" },
  { subject: "social", skill: "国際機関:国際連盟と国際連合", a: "国際連盟", b: "国際連合" },
  { subject: "social", skill: "戦後経済:高度経済成長とバブル経済", a: "高度経済成長", b: "バブル景気" },

  // ===== 理科 =====
  { subject: "science", skill: "細胞:原核と真核", a: "原核生物", b: "真核生物" },
  { subject: "science", skill: "植物:被子と裸子", a: "被子植物", b: "裸子植物" },
  { subject: "science", skill: "植物:単子葉と双子葉", a: "単子葉植物", b: "双子葉植物" },
  { subject: "science", skill: "物質:原子と分子", a: "原子", b: "分子" },
  { subject: "science", skill: "物質:元素と単体", a: "元素", b: "単体 (化学)" },
  { subject: "science", skill: "化学:酸と塩基", a: "酸", b: "塩基" },
  { subject: "science", skill: "反応:酸化と還元", a: "酸化", b: "還元" },
  { subject: "science", skill: "力学:速度と加速度", a: "速度", b: "加速度" },
  { subject: "science", skill: "電気:電圧と電流", a: "電圧", b: "電流" },
  { subject: "science", skill: "電磁:直列と並列", a: "直列回路", b: "並列回路" },
  { subject: "science", skill: "天体:恒星と惑星", a: "恒星", b: "惑星" },
  { subject: "science", skill: "気象:高気圧と低気圧", a: "高気圧", b: "低気圧" },
  { subject: "science", skill: "地学:火成岩と堆積岩", a: "火成岩", b: "堆積岩" },
  { subject: "science", skill: "地学:火山岩と深成岩", a: "火山岩", b: "深成岩" },
  { subject: "science", skill: "生物:動脈と静脈", a: "動脈", b: "静脈" },

  // ===== 国語 (語彙弁別) =====
  { subject: "japanese", skill: "敬語:尊敬と謙譲", a: "尊敬語", b: "謙譲語" },
  { subject: "japanese", skill: "文法:自動詞と他動詞", a: "自動詞", b: "他動詞" },
  { subject: "japanese", skill: "詩型:短歌と俳句", a: "短歌", b: "俳句" },
  { subject: "japanese", skill: "文学:私小説と純文学", a: "私小説", b: "純文学" },
  { subject: "japanese", skill: "古典:源氏物語と枕草子", a: "源氏物語", b: "枕草子" },

  // ===== 数学 =====
  { subject: "math", skill: "確率:順列と組合せ", a: "順列", b: "組合せ" },
  { subject: "math", skill: "解析:微分と積分", a: "微分", b: "積分" },
  { subject: "math", skill: "統計:平均値と中央値", a: "平均", b: "中央値" },
  { subject: "math", skill: "統計:分散と標準偏差", a: "分散", b: "標準偏差" },
  { subject: "math", skill: "図形:相似と合同", a: "相似", b: "合同" },
  { subject: "math", skill: "代数:有理数と無理数", a: "有理数", b: "無理数" },
  { subject: "math", skill: "ベクトル:内積と外積", a: "ドット積", b: "クロス積" },

  // ===== 英語 (主に英語学関連用語) =====
  { subject: "english", skill: "文法:現在完了と過去形", a: "現在完了", b: "過去形" },
  { subject: "english", skill: "文法:能動態と受動態", a: "能動態", b: "受動態" },
];

async function fetchExtract(title) {
  const cacheFile = path.join(CACHE_DIR, `wp_${encodeURIComponent(title)}.json`);
  try {
    const cached = await fs.readFile(cacheFile, "utf8");
    return JSON.parse(cached);
  } catch {}

  const url = new URL(API);
  url.searchParams.set("action", "query");
  url.searchParams.set("format", "json");
  url.searchParams.set("prop", "extracts|info");
  url.searchParams.set("exintro", "1");
  url.searchParams.set("explaintext", "1");
  url.searchParams.set("inprop", "url");
  url.searchParams.set("redirects", "1");
  url.searchParams.set("titles", title);
  url.searchParams.set("origin", "*");

  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${title}`);
  const data = await res.json();
  const pages = data?.query?.pages ?? {};
  const first = Object.values(pages)[0] ?? {};
  const out = {
    title: first.title ?? title,
    extract: first.extract ?? "",
    fullurl: first.fullurl ?? `https://ja.wikipedia.org/wiki/${encodeURIComponent(title)}`,
  };
  await fs.writeFile(cacheFile, JSON.stringify(out, null, 2), "utf8");
  return out;
}

// extract から、用語を弁別しやすい説明文を抽出する。
function pickDiscriminativeSentence(extract, title, maxLen = 120) {
  if (!extract) return "";
  const cleaned = extract.replace(/\n+/g, " ").replace(/[（(][^）)]*[）)]/g, "");
  const sentences = cleaned
    .split(/(?<=。)/)
    .map((s) => s.trim())
    .filter(Boolean);

  // タイトル名や姉妹語を◯◯に伏字化（出題のヒント漏洩防止）
  const mask = (s) => (title ? s.split(title).join("◯◯") : s);

  // 弱い定型文（特徴ゼロ）
  const weakPatterns = [
    /^[^。]{0,50}の一つ(である|だ|です)。?$/,
    /^[^。]{0,50}と呼ばれる。?$/,
    /^[^。]{0,50}のこと(である|だ|です)。?$/,
    /^[^。]{0,50}を(指す|表す|意味する)。?$/,
    /^[^。]{0,40}における時代区分の一つ.*$/,
  ];
  const isWeak = (s) => weakPatterns.some((p) => p.test(s.trim()));

  // 弱い先頭文を捨てつつ、弁別力のある内容を結合
  let merged = "";
  for (const s of sentences) {
    if (isWeak(s)) continue;
    merged += s;
    if (merged.length >= 60) break;
  }
  if (!merged) merged = sentences.slice(0, 2).join("");

  let out = mask(merged);
  if (out.length > maxLen) out = out.slice(0, maxLen - 1) + "…";
  return out;
}

function shortGloss(extract, title = "", max = 120) {
  return pickDiscriminativeSentence(extract, title, max);
}

function makeItem(pair, aData, bData, idx) {
  const aGloss = shortGloss(aData.extract, aData.title);
  const bGloss = shortGloss(bData.extract, bData.title);
  // 「次の説明はAとBどちら？」型のドリル。
  // ベース問題: A の説明を出して A を選ばせる。
  // distractor B には valid_context として B の説明を仕込む。
  return {
    id: `wp-${pair.subject}-${idx}`,
    subject: pair.subject,
    skillTag: pair.skill,
    prompt: `次の説明にあてはまる語は？\n「${aGloss}」`,
    choices: [
      {
        value: aData.title,
      },
      {
        value: bData.title,
        validContext: {
          sentence: bGloss,
          gloss: `${bData.title} の説明はこちら: ${bGloss}`,
        },
      },
    ],
    correct: aData.title,
    why: `${aData.title} → ${aGloss}`,
    sources: [aData.fullurl, bData.fullurl],
  };
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  await fs.mkdir(CACHE_DIR, { recursive: true });

  const items = [];
  const sources = [];
  let idx = 0;

  for (const pair of PAIRS) {
    try {
      const [aData, bData] = await Promise.all([fetchExtract(pair.a), fetchExtract(pair.b)]);
      if (!aData.extract || !bData.extract) {
        console.warn(`[skip] empty extract: ${pair.a} / ${pair.b}`);
        continue;
      }
      // 順方向 (A→B distractor)
      items.push(makeItem(pair, aData, bData, ++idx));
      // 逆方向 (B→A distractor) も生成して2倍化
      items.push(makeItem({ ...pair }, bData, aData, ++idx));
      sources.push({ pair: `${pair.a} / ${pair.b}`, urls: [aData.fullurl, bData.fullurl] });
      console.log(`[ok] ${pair.subject}: ${pair.a} / ${pair.b}`);
    } catch (e) {
      console.warn(`[err] ${pair.a} / ${pair.b}: ${e.message}`);
    }
  }

  await fs.writeFile(path.join(OUT_DIR, "wikipedia-pairs.json"), JSON.stringify(items, null, 2), "utf8");
  await fs.writeFile(
    path.join(OUT_DIR, "wikipedia-sources.json"),
    JSON.stringify({ fetchedAt: new Date().toISOString(), license: "CC BY-SA 3.0", sources }, null, 2),
    "utf8",
  );
  console.log(`\nGenerated ${items.length} items into output/wikipedia-pairs.json`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
