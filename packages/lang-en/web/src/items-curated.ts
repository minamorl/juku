// AUTO-GENERATED: do not edit by hand.
// Re-run: pnpm --filter data-ingestion run build:curated
import type { DrillItem } from "./items";

export const CURATED_ENGLISH: DrillItem[] = [
  {
    "id": "en-prep-on-in-1",
    "subject": "english",
    "skillTag": "preposition.on_in.time",
    "prompt": "I was born ___ April.",
    "correct": "in",
    "why": "月名・年・季節は in。",
    "choices": [
      {
        "value": "in"
      },
      {
        "value": "on",
        "validContext": {
          "sentence": "I was born on April 5th.",
          "gloss": "日付(○月○日)が付くと on。日単位の時間指定。"
        }
      },
      {
        "value": "at",
        "validContext": {
          "sentence": "I was born at midnight.",
          "gloss": "時刻のピンポイント (at noon, at 7 o'clock) は at。"
        }
      }
    ]
  },
  {
    "id": "en-prep-by-until-1",
    "subject": "english",
    "skillTag": "preposition.by_until",
    "prompt": "Please finish your homework ___ tomorrow.",
    "correct": "by",
    "why": "by ＝〜までに(締切)。動作の完了期限。",
    "choices": [
      {
        "value": "by"
      },
      {
        "value": "until",
        "validContext": {
          "sentence": "Please wait here until tomorrow.",
          "gloss": "until ＝〜までずっと(継続)。状態が続く期間。"
        }
      }
    ]
  },
  {
    "id": "en-prep-between-among-1",
    "subject": "english",
    "skillTag": "preposition.between_among",
    "prompt": "He sat ___ his two sisters.",
    "correct": "between",
    "why": "between ＝個別に意識される2者(または明確な複数)の間。",
    "choices": [
      {
        "value": "between"
      },
      {
        "value": "among",
        "validContext": {
          "sentence": "He sat among the crowd.",
          "gloss": "among ＝集団の中に紛れて。個々を区別しないとき。"
        }
      }
    ]
  },
  {
    "id": "en-prep-during-for-1",
    "subject": "english",
    "skillTag": "preposition.during_for",
    "prompt": "I worked ___ the summer vacation.",
    "correct": "during",
    "why": "during + 特定の期間名詞 (the summer vacation, the meeting)。",
    "choices": [
      {
        "value": "during"
      },
      {
        "value": "for",
        "validContext": {
          "sentence": "I worked for two months.",
          "gloss": "for + 期間の長さ(具体的な数値)。"
        }
      },
      {
        "value": "while",
        "validContext": {
          "sentence": "I worked while my parents were away.",
          "gloss": "while は接続詞で、後ろに節 (S+V) が来る。前置詞の during とは品詞が違う。"
        }
      }
    ]
  },
  {
    "id": "en-tense-perfect-past-1",
    "subject": "english",
    "skillTag": "tense.present_perfect_vs_past",
    "prompt": "I ___ to Kyoto three times.",
    "correct": "have been",
    "why": "現在までの経験は現在完了。",
    "choices": [
      {
        "value": "have been"
      },
      {
        "value": "went",
        "validContext": {
          "sentence": "I went to Kyoto last week.",
          "gloss": "yesterday, last 〜, ago など過去の特定時点を示す副詞があれば過去形。"
        }
      },
      {
        "value": "had been",
        "validContext": {
          "sentence": "I had been to Kyoto three times before I moved there.",
          "gloss": "過去のある時点までの経験は過去完了。"
        }
      }
    ]
  },
  {
    "id": "en-tense-progressive-1",
    "subject": "english",
    "skillTag": "tense.progressive_vs_simple",
    "prompt": "Look! The bus ___.",
    "correct": "is coming",
    "why": "今まさに進行中の動作は現在進行形。Lookという即時性の合図がある。",
    "choices": [
      {
        "value": "is coming"
      },
      {
        "value": "comes",
        "validContext": {
          "sentence": "The bus comes every 10 minutes.",
          "gloss": "習慣・時刻表的な事実は単純現在形。"
        }
      },
      {
        "value": "came",
        "validContext": {
          "sentence": "The bus came at 7:00.",
          "gloss": "過去の出来事は過去形。"
        }
      }
    ]
  },
  {
    "id": "en-modal-must-have-1",
    "subject": "english",
    "skillTag": "modal.must_have_to",
    "prompt": "I ___ go now, or I'll miss the train.",
    "correct": "must",
    "why": "話し手の主観的・内的義務感は must。",
    "choices": [
      {
        "value": "must"
      },
      {
        "value": "have to",
        "validContext": {
          "sentence": "I have to wear a uniform at school.",
          "gloss": "外的・客観的な必要(規則・状況)は have to が自然。"
        }
      },
      {
        "value": "should",
        "validContext": {
          "sentence": "You should see a doctor.",
          "gloss": "should は『〜したほうがよい』という助言・推奨。義務より弱い。"
        }
      }
    ]
  },
  {
    "id": "en-modal-can-may-1",
    "subject": "english",
    "skillTag": "modal.can_may.permission",
    "prompt": "(formal request) ___ I leave early today, sir?",
    "correct": "May",
    "why": "フォーマルな許可願いは may。",
    "choices": [
      {
        "value": "May"
      },
      {
        "value": "Can",
        "validContext": {
          "sentence": "Can I borrow your pen?",
          "gloss": "カジュアルな許可・依頼は can。友達同士など。"
        }
      },
      {
        "value": "Will",
        "validContext": {
          "sentence": "Will you pass me the salt?",
          "gloss": "Will you 〜? は依頼。許可ではなく相手に行動を頼むとき。"
        }
      }
    ]
  },
  {
    "id": "en-rel-who-which-1",
    "subject": "english",
    "skillTag": "relative.who_which",
    "prompt": "The man ___ lives next door is a doctor.",
    "correct": "who",
    "why": "先行詞が人 → who(主格)。",
    "choices": [
      {
        "value": "who"
      },
      {
        "value": "which",
        "validContext": {
          "sentence": "The book which is on the table is mine.",
          "gloss": "先行詞が物・動物のとき which。"
        }
      },
      {
        "value": "whose",
        "validContext": {
          "sentence": "The man whose car was stolen called the police.",
          "gloss": "所有関係(〜の)を示すとき whose。"
        }
      }
    ]
  },
  {
    "id": "en-rel-that-what-1",
    "subject": "english",
    "skillTag": "relative.that_what",
    "prompt": "This is ___ I want.",
    "correct": "what",
    "why": "先行詞を含む関係代名詞 what ＝『〜するもの・こと』。先行詞なしで使える。",
    "choices": [
      {
        "value": "what"
      },
      {
        "value": "that",
        "validContext": {
          "sentence": "This is the book that I want.",
          "gloss": "先行詞 (the book) があるときは that。"
        }
      },
      {
        "value": "which",
        "validContext": {
          "sentence": "This is the book, which I bought yesterday.",
          "gloss": "コンマ付きの非制限用法では which。情報を追加する。"
        }
      }
    ]
  },
  {
    "id": "en-toinf-vs-ger-1",
    "subject": "english",
    "skillTag": "verbpattern.toinf_vs_gerund",
    "prompt": "I enjoy ___ to music.",
    "correct": "listening",
    "why": "enjoy は動名詞のみを目的語にとる(enjoy doing)。",
    "choices": [
      {
        "value": "listening"
      },
      {
        "value": "to listen",
        "validContext": {
          "sentence": "I want to listen to music.",
          "gloss": "want, hope, decide, plan などは to不定詞をとる。"
        }
      }
    ]
  },
  {
    "id": "en-stop-doing-1",
    "subject": "english",
    "skillTag": "verbpattern.stop_doing_vs_to_do",
    "prompt": "He stopped ___ a cigarette. (休憩のために立ち止まった)",
    "correct": "to smoke",
    "why": "stop to do ＝『〜するために立ち止まる』。to不定詞は目的を表す副詞用法。",
    "choices": [
      {
        "value": "to smoke"
      },
      {
        "value": "smoking",
        "validContext": {
          "sentence": "He stopped smoking last year. (タバコをやめた)",
          "gloss": "stop doing ＝『〜するのをやめる』。動作の中止。"
        }
      }
    ]
  },
  {
    "id": "en-comp-as-than-1",
    "subject": "english",
    "skillTag": "comparative.as_than",
    "prompt": "She is taller ___ her brother.",
    "correct": "than",
    "why": "比較級 + than。",
    "choices": [
      {
        "value": "than"
      },
      {
        "value": "as",
        "validContext": {
          "sentence": "She is as tall as her brother.",
          "gloss": "as 〜 as は同等比較。原級をはさむ。"
        }
      }
    ]
  },
  {
    "id": "en-comp-most-best-1",
    "subject": "english",
    "skillTag": "comparative.regular_irregular",
    "prompt": "This is the ___ movie I've ever seen.",
    "correct": "best",
    "why": "good の最上級は best (不規則変化)。",
    "choices": [
      {
        "value": "best"
      },
      {
        "value": "most good",
        "validContext": {
          "sentence": "(規則変化の例) This is the most interesting movie.",
          "gloss": "3音節以上の形容詞は most + 原級。good は不規則なので適用外。"
        }
      },
      {
        "value": "better",
        "validContext": {
          "sentence": "This movie is better than that one.",
          "gloss": "比較級は2者間の比較。最上級は3者以上から1つを選ぶ。"
        }
      }
    ]
  },
  {
    "id": "en-subj-past-1",
    "subject": "english",
    "skillTag": "subjunctive.past",
    "prompt": "If I ___ rich, I would travel the world.",
    "correct": "were",
    "why": "仮定法過去:現在の事実に反する仮定。be動詞は人称に関わらず were が標準。",
    "choices": [
      {
        "value": "were"
      },
      {
        "value": "am",
        "validContext": {
          "sentence": "If I am late, please start without me.",
          "gloss": "現実的な可能性のある条件は直説法 (if + 現在形)。"
        }
      },
      {
        "value": "had been",
        "validContext": {
          "sentence": "If I had been rich then, I would have traveled.",
          "gloss": "仮定法過去完了:過去の事実に反する仮定。"
        }
      }
    ]
  },
  {
    "id": "en-passive-by-with-1",
    "subject": "english",
    "skillTag": "passive.by_with",
    "prompt": "The window was broken ___ a stone.",
    "correct": "with",
    "why": "道具・手段を表すときは with。",
    "choices": [
      {
        "value": "with"
      },
      {
        "value": "by",
        "validContext": {
          "sentence": "The window was broken by John.",
          "gloss": "動作の行為者(誰が)は by。"
        }
      }
    ]
  },
  {
    "id": "en-art-zero-the-1",
    "subject": "english",
    "skillTag": "article.zero_the.school",
    "prompt": "He goes to ___ school every day. (生徒として通学)",
    "correct": "(no article)",
    "why": "school, church, hospital, prison は本来の目的で行く場合、無冠詞 (school = 学業, church = 礼拝など)。",
    "choices": [
      {
        "value": "(no article)"
      },
      {
        "value": "the",
        "validContext": {
          "sentence": "His father went to the school to talk to the teacher.",
          "gloss": "建物として訪れる場合は the。生徒として通うのではなく『学校の建物に行く』。"
        }
      }
    ]
  },
  {
    "id": "en-vocab-many-much-1",
    "subject": "english",
    "skillTag": "vocab.many_much",
    "prompt": "There aren't ___ apples in the basket.",
    "correct": "many",
    "why": "可算名詞の複数形には many。",
    "choices": [
      {
        "value": "many"
      },
      {
        "value": "much",
        "validContext": {
          "sentence": "There isn't much water in the bottle.",
          "gloss": "不可算名詞には much。water, money, time などはこちら。"
        }
      }
    ]
  },
  {
    "id": "en-vocab-fewer-less-1",
    "subject": "english",
    "skillTag": "vocab.fewer_less",
    "prompt": "There are ___ students this year than last year.",
    "correct": "fewer",
    "why": "可算名詞の比較級は fewer。",
    "choices": [
      {
        "value": "fewer"
      },
      {
        "value": "less",
        "validContext": {
          "sentence": "There is less water this year than last year.",
          "gloss": "不可算名詞の比較級は less。"
        }
      }
    ]
  },
  {
    "id": "en-vocab-borrow-lend-1",
    "subject": "english",
    "skillTag": "vocab.borrow_lend",
    "prompt": "Can I ___ your pen, please?",
    "correct": "borrow",
    "why": "borrow ＝(自分が)借りる。",
    "choices": [
      {
        "value": "borrow"
      },
      {
        "value": "lend",
        "validContext": {
          "sentence": "Can you lend me your pen?",
          "gloss": "lend ＝(相手が)貸す。動作の主体が逆。"
        }
      },
      {
        "value": "rent",
        "validContext": {
          "sentence": "I want to rent a car for the weekend.",
          "gloss": "rent ＝有料で借りる/貸す。家・車など。"
        }
      }
    ]
  },
  {
    "id": "en-vocab-say-tell-1",
    "subject": "english",
    "skillTag": "vocab.say_tell",
    "prompt": "She ___ me an interesting story.",
    "correct": "told",
    "why": "tell + 人 + 内容 の語順。tell は『誰に』を直接目的語に取る。",
    "choices": [
      {
        "value": "told"
      },
      {
        "value": "said",
        "validContext": {
          "sentence": "She said something interesting to me.",
          "gloss": "say は『誰に』を to で示す。直接 me を取れない。"
        }
      },
      {
        "value": "spoke",
        "validContext": {
          "sentence": "She spoke to me about the project.",
          "gloss": "speak は『話す行為』そのもの。内容より動作に焦点。"
        }
      }
    ]
  }
];

export const CURATED_MATH: DrillItem[] = [
  {
    "id": "math-pq-1",
    "subject": "math",
    "skillTag": "probability.permutation_vs_combination",
    "prompt": "5人から3人を選んで一列に並べる方法は何通り？",
    "correct": "順列 (5P3 = 60)",
    "why": "順序を区別して『並べる』ので順列 nPr。5P3 = 5×4×3 = 60。",
    "choices": [
      {
        "value": "順列 (5P3 = 60)"
      },
      {
        "value": "組合せ (5C3 = 10)",
        "validContext": {
          "sentence": "5人から3人を選ぶだけで順序を区別しないなら 5C3 = 10通り。",
          "gloss": "『選ぶだけ』なら組合せ。並べる/役割を割り当てるなら順列。"
        }
      }
    ]
  },
  {
    "id": "math-prob-cond-1",
    "subject": "math",
    "skillTag": "probability.conditional",
    "prompt": "サイコロを1回振って偶数が出たという条件のもとで、それが4以上である確率は？",
    "correct": "2/3",
    "why": "条件付き確率: 偶数={2,4,6}の3通りのうち4以上は{4,6}の2通り。2/3。",
    "choices": [
      {
        "value": "2/3"
      },
      {
        "value": "1/3",
        "validContext": {
          "sentence": "条件なしで『偶数かつ4以上』の確率なら2/6 = 1/3。",
          "gloss": "条件付き確率 P(A|B) は分母が事象B(偶数の3通り)に絞られる。条件なしの確率と区別。"
        }
      }
    ]
  },
  {
    "id": "math-stat-mean-median-1",
    "subject": "math",
    "skillTag": "stat.mean_median",
    "prompt": "データ {2,3,3,4,100} を1つの代表値で表すとき、外れ値に強いのは？",
    "correct": "中央値",
    "why": "中央値は順位ベースなので極端な値の影響を受けにくい。このデータでは中央値=3。",
    "choices": [
      {
        "value": "中央値"
      },
      {
        "value": "平均値",
        "validContext": {
          "sentence": "外れ値がないデータ {2,3,3,4,5} では平均値=3.4が代表として有効。",
          "gloss": "平均値は全データの和を使うため外れ値に弱いが、対称な分布では最も情報量が多い。"
        }
      },
      {
        "value": "最頻値",
        "validContext": {
          "sentence": "離散カテゴリ(色・好み)では最頻値が代表。",
          "gloss": "最頻値は質的データ向け。連続値では複数のピークがあると不安定。"
        }
      }
    ]
  },
  {
    "id": "math-stat-var-sd-1",
    "subject": "math",
    "skillTag": "stat.variance_sd",
    "prompt": "データのばらつきを元の単位(cm, kgなど)と同じ単位で表すには？",
    "correct": "標準偏差",
    "why": "標準偏差は分散の平方根。元データと単位が一致する。",
    "choices": [
      {
        "value": "標準偏差"
      },
      {
        "value": "分散",
        "validContext": {
          "sentence": "分散はばらつきの『2乗』スケール。理論的計算(分散の加法性など)では分散を使う。",
          "gloss": "単位はcm²やkg²になる。直感的解釈には標準偏差。"
        }
      }
    ]
  },
  {
    "id": "math-calc-diff-int-1",
    "subject": "math",
    "skillTag": "calculus.differentiation_vs_integration",
    "prompt": "速度から位置を求めるには？",
    "correct": "積分",
    "why": "速度を時間で積分すると位置(変位)。微分と積分は逆操作。",
    "choices": [
      {
        "value": "積分"
      },
      {
        "value": "微分",
        "validContext": {
          "sentence": "位置から速度を求めるには微分。さらに微分すると加速度。",
          "gloss": "微分は『瞬間の変化率』、積分は『累積』。階層: 位置→(微分)→速度→(微分)→加速度。"
        }
      }
    ]
  },
  {
    "id": "math-vec-dot-cross-1",
    "subject": "math",
    "skillTag": "vector.dot_cross",
    "prompt": "2つのベクトルがなす角を求めたい。使うのは？",
    "correct": "内積",
    "why": "a・b = |a||b|cosθ から cosθ が直接出る。",
    "choices": [
      {
        "value": "内積"
      },
      {
        "value": "外積",
        "validContext": {
          "sentence": "2ベクトルが張る平行四辺形の面積を求めたいなら外積 |a×b| = |a||b|sinθ。",
          "gloss": "内積は cos(角度・並行性)、外積は sin(垂直性・面積)。"
        }
      }
    ]
  },
  {
    "id": "math-fig-similar-cong-1",
    "subject": "math",
    "skillTag": "geometry.similar_congruent",
    "prompt": "形が同じで大きさは違う2つの三角形の関係は？",
    "correct": "相似",
    "why": "相似は比の保存(角度同じ・辺の比一定)。",
    "choices": [
      {
        "value": "相似"
      },
      {
        "value": "合同",
        "validContext": {
          "sentence": "形も大きさも完全に同じ(重ね合わせ可能)なら合同。",
          "gloss": "合同は相似比 1:1 の特別な場合。合同 ⊂ 相似。"
        }
      }
    ]
  },
  {
    "id": "math-num-rational-1",
    "subject": "math",
    "skillTag": "number.rational_irrational",
    "prompt": "√2 はどちらに分類される？",
    "correct": "無理数",
    "why": "√2 は分数 a/b (a, b は整数, b≠0) で表せないため無理数。",
    "choices": [
      {
        "value": "無理数"
      },
      {
        "value": "有理数",
        "validContext": {
          "sentence": "0.333... = 1/3 は循環小数だが分数で表せるので有理数。",
          "gloss": "循環する無限小数 = 有理数。循環しない無限小数 = 無理数 (√2, π, e)。"
        }
      }
    ]
  },
  {
    "id": "math-eq-quad-disc-1",
    "subject": "math",
    "skillTag": "equation.quadratic_discriminant",
    "prompt": "二次方程式 ax² + bx + c = 0 が異なる2つの実数解を持つ条件は？",
    "correct": "b² − 4ac > 0",
    "why": "判別式 D = b²−4ac > 0 のとき実数解2個。",
    "choices": [
      {
        "value": "b² − 4ac > 0"
      },
      {
        "value": "b² − 4ac = 0",
        "validContext": {
          "sentence": "D = 0 のとき重解(実数解1個)。",
          "gloss": "重解は同じ値が2回。グラフはx軸に接する。"
        }
      },
      {
        "value": "b² − 4ac < 0",
        "validContext": {
          "sentence": "D < 0 のとき実数解なし(虚数解2個)。",
          "gloss": "高校数学IIBの複素数の範囲では共役な複素数解。"
        }
      }
    ]
  },
  {
    "id": "math-trig-sin-cos-1",
    "subject": "math",
    "skillTag": "trig.sin_cos.basics",
    "prompt": "直角三角形で、斜辺と隣辺(底辺)の比を表す関数は？",
    "correct": "cos",
    "why": "cosθ = 隣辺/斜辺。",
    "choices": [
      {
        "value": "cos"
      },
      {
        "value": "sin",
        "validContext": {
          "sentence": "対辺/斜辺は sin。",
          "gloss": "覚え方: sin は『縦/斜辺』、cos は『横/斜辺』。"
        }
      },
      {
        "value": "tan",
        "validContext": {
          "sentence": "対辺/隣辺は tan。",
          "gloss": "tan は傾き(slope)を表す。直線の方程式 y=ax の a が tan に対応。"
        }
      }
    ]
  }
];

export const CURATED_JAPANESE: DrillItem[] = [
  {
    "id": "ja-homophone-igai-1",
    "subject": "japanese",
    "skillTag": "vocab.homophone.以外_意外",
    "prompt": "次の文の___に入るのは？\n「彼が来るとは___だった。」",
    "correct": "意外",
    "why": "意外＝予想外。「彼が来るとは予想外だった」の意味。",
    "choices": [
      {
        "value": "意外"
      },
      {
        "value": "以外",
        "validContext": {
          "sentence": "彼以外、誰も賛成しなかった。",
          "gloss": "以外＝それを除いた残り。範囲を限定する用法。"
        }
      }
    ]
  },
  {
    "id": "ja-homophone-igai-2",
    "subject": "japanese",
    "skillTag": "vocab.homophone.以外_意外",
    "prompt": "次の文の___に入るのは？\n「日本___の国はみな夏休みが長い。」",
    "correct": "以外",
    "why": "以外＝〜を除いた他の。範囲限定。",
    "choices": [
      {
        "value": "以外"
      },
      {
        "value": "意外",
        "validContext": {
          "sentence": "日本がオリンピックでこれほど勝つとは意外だった。",
          "gloss": "意外＝予想外。心理的な驚きを表す。"
        }
      }
    ]
  },
  {
    "id": "ja-homophone-taisho-1",
    "subject": "japanese",
    "skillTag": "vocab.homophone.対象_対照_対称",
    "prompt": "次の文の___に入るのは？\n「左右___な図形を線対称という。」",
    "correct": "対称",
    "why": "対称＝シンメトリー。左右や上下が釣り合っている状態。",
    "choices": [
      {
        "value": "対称"
      },
      {
        "value": "対象",
        "validContext": {
          "sentence": "この調査の対象は18歳以上です。",
          "gloss": "対象＝働きかけの相手。物事の的(まと)。"
        }
      },
      {
        "value": "対照",
        "validContext": {
          "sentence": "兄と弟は対照的な性格だ。",
          "gloss": "対照＝二つを並べて違いを際立たせること。コントラスト。"
        }
      }
    ]
  },
  {
    "id": "ja-homophone-taisho-2",
    "subject": "japanese",
    "skillTag": "vocab.homophone.対象_対照_対称",
    "prompt": "次の文の___に入るのは？\n「子どもを___とした絵本展。」",
    "correct": "対象",
    "why": "対象＝働きかけの相手・的。",
    "choices": [
      {
        "value": "対象"
      },
      {
        "value": "対称",
        "validContext": {
          "sentence": "この建築は完璧な対称構造だ。",
          "gloss": "対称＝シンメトリー。形の釣り合い。"
        }
      },
      {
        "value": "対照",
        "validContext": {
          "sentence": "原文と訳文を対照する。",
          "gloss": "対照＝照らし合わせて比較すること。"
        }
      }
    ]
  },
  {
    "id": "ja-homophone-shokai-1",
    "subject": "japanese",
    "skillTag": "vocab.homophone.照会_紹介_詳解",
    "prompt": "次の文の___に入るのは？\n「銀行に残高を___する。」",
    "correct": "照会",
    "why": "照会＝問い合わせて確認すること。",
    "choices": [
      {
        "value": "照会"
      },
      {
        "value": "紹介",
        "validContext": {
          "sentence": "友人を上司に紹介する。",
          "gloss": "紹介＝人や物を引き合わせること。"
        }
      }
    ]
  },
  {
    "id": "ja-homophone-kankaku-1",
    "subject": "japanese",
    "skillTag": "vocab.homophone.感覚_間隔",
    "prompt": "次の文の___に入るのは？\n「電車の運行___を短くする。」",
    "correct": "間隔",
    "why": "間隔＝物事のあいだの距離・時間。",
    "choices": [
      {
        "value": "間隔"
      },
      {
        "value": "感覚",
        "validContext": {
          "sentence": "彼は色彩感覚に優れている。",
          "gloss": "感覚＝感じ取る力。センス。"
        }
      }
    ]
  },
  {
    "id": "ja-homophone-seisan-1",
    "subject": "japanese",
    "skillTag": "vocab.homophone.精算_清算",
    "prompt": "次の文の___に入るのは？\n「乗り越し料金を___する。」",
    "correct": "精算",
    "why": "精算＝細かく計算して過不足を整えること。料金の計算が典型。",
    "choices": [
      {
        "value": "精算"
      },
      {
        "value": "清算",
        "validContext": {
          "sentence": "過去の関係を清算する。会社を清算する。",
          "gloss": "清算＝負債や関係を整理し終わらせること。会計法的な完了。"
        }
      }
    ]
  },
  {
    "id": "ja-homophone-shuyo-1",
    "subject": "japanese",
    "skillTag": "vocab.homophone.収容_収用_収納",
    "prompt": "次の文の___に入るのは？\n「1万人を___できるスタジアム。」",
    "correct": "収容",
    "why": "収容＝人や物を受け入れて中に入れること。",
    "choices": [
      {
        "value": "収容"
      },
      {
        "value": "収用",
        "validContext": {
          "sentence": "道路建設のため土地を収用する。",
          "gloss": "収用＝公共目的で私有財産を強制的に取得すること。法律用語。"
        }
      },
      {
        "value": "収納",
        "validContext": {
          "sentence": "服を収納ケースにしまう。",
          "gloss": "収納＝物を片付けてしまうこと。家具・家事の文脈。"
        }
      }
    ]
  },
  {
    "id": "ja-particle-wa-ga-1",
    "subject": "japanese",
    "skillTag": "particle.wa_ga",
    "prompt": "次の文の___に入る助詞は？\n「私___学生です。(初対面の自己紹介)」",
    "correct": "は",
    "why": "「は」は主題提示。聞き手にとって既知の枠で『私について言えば』と提示する。",
    "choices": [
      {
        "value": "は"
      },
      {
        "value": "が",
        "validContext": {
          "sentence": "「誰が学生ですか？」「私が学生です。」",
          "gloss": "「が」は新情報の主語。質問への直接回答や排他的指示で使う。"
        }
      }
    ]
  },
  {
    "id": "ja-keigo-ukagau-1",
    "subject": "japanese",
    "skillTag": "keigo.ukagau",
    "prompt": "次の文の敬語として正しいのは？\n「明日、御社に___ます。(訪問する側)」",
    "correct": "伺い",
    "why": "「伺う」は『行く・訪ねる・聞く』の謙譲語。自分の動作をへりくだって表現。",
    "choices": [
      {
        "value": "伺い"
      },
      {
        "value": "いらっしゃい",
        "validContext": {
          "sentence": "明日、社長が御社にいらっしゃいます。(相手側の動作)",
          "gloss": "「いらっしゃる」は『来る・行く・いる』の尊敬語。相手の動作にだけ使う。"
        }
      },
      {
        "value": "参り",
        "validContext": {
          "sentence": "ただいま参ります。(単純に『行く』の謙譲)",
          "gloss": "「参る」は単純な『行く・来る』の謙譲。訪問先への敬意を強く込める場面では『伺う』の方が適切。"
        }
      }
    ]
  },
  {
    "id": "ja-conj-shikashi-1",
    "subject": "japanese",
    "skillTag": "conjunction.shikashi_dakara",
    "prompt": "次の___に入る接続詞は？\n「雨が降った。___遠足は中止になった。」",
    "correct": "だから",
    "why": "原因→結果の順接。",
    "choices": [
      {
        "value": "だから"
      },
      {
        "value": "しかし",
        "validContext": {
          "sentence": "雨が降った。しかし遠足は決行された。",
          "gloss": "予想と逆の結果が続くとき逆接の『しかし』。"
        }
      },
      {
        "value": "ところで",
        "validContext": {
          "sentence": "雨が降った。ところで明日の予定はどうする？",
          "gloss": "話題転換の『ところで』。直前の話を切り替えるとき。"
        }
      }
    ]
  },
  {
    "id": "ja-conj-tsumari-1",
    "subject": "japanese",
    "skillTag": "conjunction.tsumari_tatoeba",
    "prompt": "次の___に入る接続詞は？\n「彼は朝5時に起き、夜0時まで働く。___超人だ。」",
    "correct": "つまり",
    "why": "前文を要約・言い換える換言の接続詞。",
    "choices": [
      {
        "value": "つまり"
      },
      {
        "value": "たとえば",
        "validContext": {
          "sentence": "彼は超人的な働き方をする。たとえば朝5時から夜0時まで働く。",
          "gloss": "「たとえば」は具体例の提示。一般論→具体の流れ。"
        }
      }
    ]
  },
  {
    "id": "ja-kobun-genji-1",
    "subject": "japanese",
    "skillTag": "literature.heian",
    "prompt": "「いづれの御時にか、女御、更衣あまた候ひ給ひける中に、いとやむごとなき際にはあらぬが、すぐれて時めき給ふありけり。」これは何の冒頭か？",
    "correct": "源氏物語",
    "why": "桐壺巻の冒頭。光源氏の母・桐壺更衣の登場場面。",
    "choices": [
      {
        "value": "源氏物語"
      },
      {
        "value": "枕草子",
        "validContext": {
          "sentence": "「春はあけぼの。やうやう白くなりゆく山ぎは、すこしあかりて、紫だちたる雲のほそくたなびきたる。」が枕草子の冒頭。",
          "gloss": "枕草子は清少納言の随筆。四季の風物への鋭い感性が特徴。"
        }
      },
      {
        "value": "徒然草",
        "validContext": {
          "sentence": "「つれづれなるままに、日暮らし、硯にむかひて...」が徒然草の冒頭。",
          "gloss": "徒然草は兼好法師の随筆。鎌倉末期の無常観。"
        }
      }
    ]
  },
  {
    "id": "ja-bungaku-modern-1",
    "subject": "japanese",
    "skillTag": "literature.modern.opening",
    "prompt": "「吾輩は猫である。名前はまだ無い。」これは誰の作品の冒頭か？",
    "correct": "夏目漱石",
    "why": "夏目漱石『吾輩は猫である』(1905年)の有名な冒頭。",
    "choices": [
      {
        "value": "夏目漱石"
      },
      {
        "value": "森鴎外",
        "validContext": {
          "sentence": "「石炭をば早や積み果てつ。中等室の卓のほとりはいと静かにて...」(『舞姫』)が森鴎外の代表作の冒頭。",
          "gloss": "森鴎外は雅文体の代表。漱石とほぼ同時代。"
        }
      },
      {
        "value": "芥川龍之介",
        "validContext": {
          "sentence": "「ある日の暮方の事である。一人の下人が、羅生門の下で雨やみを待っていた。」(『羅生門』)が芥川の代表作。",
          "gloss": "芥川龍之介は短編の名手。漱石の弟子筋。"
        }
      }
    ],
    "sources": [
      "https://www.aozora.gr.jp/cards/000148/card789.html"
    ]
  }
];

export const CURATED_SCIENCE: DrillItem[] = [
  {
    "id": "sci-mass-weight-1",
    "subject": "science",
    "skillTag": "physics.mass_weight",
    "prompt": "月面でも値が変わらないのは？",
    "correct": "質量",
    "why": "質量は物質の量(kg)で場所によらず一定。",
    "choices": [
      {
        "value": "質量"
      },
      {
        "value": "重さ",
        "validContext": {
          "sentence": "重さは重力で変わる。月では地球の約1/6。",
          "gloss": "重さ = 質量 × 重力加速度(N)。質量 ≠ 重さ。"
        }
      }
    ]
  },
  {
    "id": "sci-velocity-accel-1",
    "subject": "science",
    "skillTag": "physics.velocity_acceleration",
    "prompt": "等速直線運動で 0 になるのは？",
    "correct": "加速度",
    "why": "速度が変化しないので加速度=0。速度自体は0ではない。",
    "choices": [
      {
        "value": "加速度"
      },
      {
        "value": "速度",
        "validContext": {
          "sentence": "止まっている物体は速度=0、加速度も0。",
          "gloss": "等速 = 速度一定 ≠ 0。加速度は速度の変化率。"
        }
      }
    ]
  },
  {
    "id": "sci-voltage-current-1",
    "subject": "science",
    "skillTag": "physics.voltage_current",
    "prompt": "電気回路で『流れの量』にあたるのは？",
    "correct": "電流(A)",
    "why": "電流 = 単位時間あたりに流れる電荷の量。アンペア(A)で測る。",
    "choices": [
      {
        "value": "電流(A)"
      },
      {
        "value": "電圧(V)",
        "validContext": {
          "sentence": "電圧は『流そうとする力(電位差)』。ボルト(V)。",
          "gloss": "水で例えると電圧=水位差、電流=実際に流れる水量、抵抗=管の細さ。オームの法則 V=IR。"
        }
      },
      {
        "value": "抵抗(Ω)",
        "validContext": {
          "sentence": "抵抗は流れにくさ。オーム(Ω)。",
          "gloss": "抵抗が大きいほど同じ電圧でも電流が少ない。"
        }
      }
    ]
  },
  {
    "id": "sci-atom-molecule-1",
    "subject": "science",
    "skillTag": "chem.atom_molecule_element",
    "prompt": "水(H₂O)は何の例？",
    "correct": "化合物の分子",
    "why": "2種類以上の元素が結合した物質(化合物)で、分子という単位を持つ。",
    "choices": [
      {
        "value": "化合物の分子"
      },
      {
        "value": "単体の分子",
        "validContext": {
          "sentence": "酸素(O₂)・窒素(N₂)は1種類の元素のみで構成される単体の分子。",
          "gloss": "単体=1元素、化合物=2元素以上。両方とも分子(独立した粒子単位)を作りうる。"
        }
      },
      {
        "value": "原子",
        "validContext": {
          "sentence": "He(ヘリウム)は分子を作らず原子のまま存在する希ガス。",
          "gloss": "原子は最小粒子。分子は原子が結合した粒子。希ガスは単原子分子(=原子)として振る舞う。"
        }
      }
    ]
  },
  {
    "id": "sci-acid-base-1",
    "subject": "science",
    "skillTag": "chem.acid_base",
    "prompt": "BTB液を青色にするのは？",
    "correct": "塩基性(アルカリ性)",
    "why": "塩基性 → BTB青、酸性 → BTB黄、中性 → BTB緑。",
    "choices": [
      {
        "value": "塩基性(アルカリ性)"
      },
      {
        "value": "酸性",
        "validContext": {
          "sentence": "酸性ではBTB黄、リトマス紙青→赤。",
          "gloss": "酸性=H⁺を出す、塩基性=OH⁻を出す。中和すると水と塩(えん)。"
        }
      }
    ]
  },
  {
    "id": "sci-photosynth-resp-1",
    "subject": "science",
    "skillTag": "bio.photosynthesis_respiration",
    "prompt": "植物が二酸化炭素を吸収して酸素を放出するのは？",
    "correct": "光合成",
    "why": "光合成: CO₂ + H₂O + 光 → 有機物 + O₂。葉緑体で行う。",
    "choices": [
      {
        "value": "光合成"
      },
      {
        "value": "呼吸",
        "validContext": {
          "sentence": "呼吸: 有機物 + O₂ → CO₂ + H₂O + エネルギー。動植物どちらも常時行う。",
          "gloss": "光合成は植物が昼間だけ。呼吸は植物も動物も24時間。植物は昼に両方同時進行。"
        }
      }
    ]
  },
  {
    "id": "sci-mitosis-meiosis-1",
    "subject": "science",
    "skillTag": "bio.mitosis_meiosis",
    "prompt": "体細胞が成長のために行う細胞分裂は？",
    "correct": "体細胞分裂",
    "why": "体細胞分裂(有糸分裂)は染色体数が変わらず、同じ細胞を複製。",
    "choices": [
      {
        "value": "体細胞分裂"
      },
      {
        "value": "減数分裂",
        "validContext": {
          "sentence": "減数分裂は生殖細胞(卵・精子)を作るときの分裂で染色体数が半分になる。",
          "gloss": "受精で再び元に戻る。遺伝の多様性の源。"
        }
      }
    ]
  },
  {
    "id": "sci-igneous-1",
    "subject": "science",
    "skillTag": "earth.volcanic_plutonic",
    "prompt": "マグマが地表近くで急に冷えて固まった岩石は？",
    "correct": "火山岩",
    "why": "急冷→結晶が小さく斑状組織。玄武岩・安山岩・流紋岩など。",
    "choices": [
      {
        "value": "火山岩"
      },
      {
        "value": "深成岩",
        "validContext": {
          "sentence": "マグマが地下深くでゆっくり冷えると深成岩(等粒状組織)。花こう岩など。",
          "gloss": "両方とも火成岩。冷却速度の違いで結晶サイズが変わる。"
        }
      },
      {
        "value": "堆積岩",
        "validContext": {
          "sentence": "礫・砂・泥が水底でたまって固まると堆積岩。",
          "gloss": "成因が全く違う。火成岩は溶融由来、堆積岩は風化・運搬・堆積由来。"
        }
      }
    ]
  },
  {
    "id": "sci-front-cold-warm-1",
    "subject": "science",
    "skillTag": "earth.front",
    "prompt": "短時間に強い雨が降り、気温が急激に下がる前線は？",
    "correct": "寒冷前線",
    "why": "寒冷前線: 寒気が暖気を押し上げる→積乱雲→短時間強雨。",
    "choices": [
      {
        "value": "寒冷前線"
      },
      {
        "value": "温暖前線",
        "validContext": {
          "sentence": "温暖前線は暖気が寒気の上に乗り上げ、長時間しとしと雨が続く。乱層雲。",
          "gloss": "前線通過後の天気の変化が真逆: 寒冷前線後は寒く晴れ、温暖前線後は暖かい。"
        }
      }
    ]
  },
  {
    "id": "sci-dna-rna-1",
    "subject": "science",
    "skillTag": "bio.dna_rna",
    "prompt": "細胞の核内で遺伝情報を二重らせんで保存する物質は？",
    "correct": "DNA",
    "why": "DNAは2本鎖の二重らせん。デオキシリボース。塩基A,T,G,C。",
    "choices": [
      {
        "value": "DNA"
      },
      {
        "value": "RNA",
        "validContext": {
          "sentence": "RNAはふつう1本鎖でリボース。塩基A,U(ウラシル),G,C。タンパク質合成の伝令役。",
          "gloss": "DNA→転写→RNA→翻訳→タンパク質、というセントラルドグマ。"
        }
      }
    ]
  }
];

export const CURATED_SOCIAL: DrillItem[] = [
  {
    "id": "soc-edo-reform-1",
    "subject": "social",
    "skillTag": "history.edo.reform",
    "prompt": "倹約令と上米の制で財政再建を図ったのは？",
    "correct": "享保の改革(徳川吉宗)",
    "why": "享保の改革(1716-)は8代将軍吉宗。新田開発・公事方御定書も。",
    "choices": [
      {
        "value": "享保の改革(徳川吉宗)"
      },
      {
        "value": "寛政の改革(松平定信)",
        "validContext": {
          "sentence": "寛政の改革(1787-)は老中松平定信。寛政異学の禁・棄捐令。",
          "gloss": "享保→寛政→天保 の順。寛政は朱子学以外の禁止が特徴。"
        }
      },
      {
        "value": "天保の改革(水野忠邦)",
        "validContext": {
          "sentence": "天保の改革(1841-)は老中水野忠邦。株仲間解散・人返しの法。",
          "gloss": "天保は最も厳しく、わずか2年で失敗。江戸三大改革の最後。"
        }
      }
    ]
  },
  {
    "id": "soc-meiji-1",
    "subject": "social",
    "skillTag": "history.meiji.reform",
    "prompt": "1869年に諸藩主が土地と人民を朝廷に返上したことを何というか？",
    "correct": "版籍奉還",
    "why": "版=土地、籍=人民を天皇に返す。中央集権化の第一歩。",
    "choices": [
      {
        "value": "版籍奉還"
      },
      {
        "value": "廃藩置県",
        "validContext": {
          "sentence": "1871年の廃藩置県で藩そのものを廃止し県に。版籍奉還の2年後。",
          "gloss": "順序: 版籍奉還(1869)→廃藩置県(1871)。前者は形式的、後者で実質的に中央集権完成。"
        }
      }
    ]
  },
  {
    "id": "soc-treaty-1",
    "subject": "social",
    "skillTag": "history.bakumatsu.treaty",
    "prompt": "1854年に日本が初めて開国した条約は？",
    "correct": "日米和親条約",
    "why": "日米和親条約(1854)はペリー来航後に締結。下田・函館を開港。",
    "choices": [
      {
        "value": "日米和親条約"
      },
      {
        "value": "日米修好通商条約",
        "validContext": {
          "sentence": "1858年に大老井伊直弼が締結したのが日米修好通商条約。5港開港・領事裁判権・関税自主権なしの不平等条約。",
          "gloss": "和親(1854)→修好通商(1858)。後者の方が経済的影響が大きく不平等。"
        }
      }
    ]
  },
  {
    "id": "soc-civil-house-1",
    "subject": "social",
    "skillTag": "civics.diet.houses",
    "prompt": "予算の先議権を持つのはどちら？",
    "correct": "衆議院",
    "why": "予算は衆議院に先議権がある。任期4年・解散ありで国民の意思を反映しやすい。",
    "choices": [
      {
        "value": "衆議院"
      },
      {
        "value": "参議院",
        "validContext": {
          "sentence": "参議院は『良識の府』。任期6年・解散なし。",
          "gloss": "衆議院の優越: 予算先議・内閣不信任・条約承認・首相指名で衆議院の議決が優先。"
        }
      }
    ]
  },
  {
    "id": "soc-civil-3powers-1",
    "subject": "social",
    "skillTag": "civics.three_powers",
    "prompt": "法律を作る機関は？",
    "correct": "国会(立法)",
    "why": "国会は唯一の立法機関(憲法41条)。",
    "choices": [
      {
        "value": "国会(立法)"
      },
      {
        "value": "内閣(行政)",
        "validContext": {
          "sentence": "内閣は法律にもとづいて政策を実行する行政機関。",
          "gloss": "三権分立: 立法(国会)・行政(内閣)・司法(裁判所)。互いを抑制均衡。"
        }
      },
      {
        "value": "裁判所(司法)",
        "validContext": {
          "sentence": "裁判所は法律にもとづいて争いを裁く司法機関。違憲審査権を持つ。",
          "gloss": "違憲審査権により国会の法律も内閣の行為も憲法違反なら無効化できる。"
        }
      }
    ]
  },
  {
    "id": "soc-econ-supply-demand-1",
    "subject": "social",
    "skillTag": "econ.supply_demand",
    "prompt": "豊作で米の供給が増えると、価格は通常どうなる？",
    "correct": "下がる",
    "why": "供給増 → 供給曲線が右シフト → 均衡価格は下落。",
    "choices": [
      {
        "value": "下がる"
      },
      {
        "value": "上がる",
        "validContext": {
          "sentence": "需要が増えた場合(例:寒波で暖房需要急増)は需要曲線が右シフトして価格上昇。",
          "gloss": "供給シフトと需要シフトは価格への効果が逆。需要↑→価格↑、供給↑→価格↓。"
        }
      }
    ]
  },
  {
    "id": "soc-econ-gdp-gni-1",
    "subject": "social",
    "skillTag": "econ.gdp_gni",
    "prompt": "国内で1年間に生産された付加価値の合計は？",
    "correct": "GDP(国内総生産)",
    "why": "GDPは『国内』(地理的範囲)で生産された付加価値。",
    "choices": [
      {
        "value": "GDP(国内総生産)"
      },
      {
        "value": "GNI(国民総所得)",
        "validContext": {
          "sentence": "GNIは『日本国民』が世界中で得た所得の合計。海外子会社の利益も含む。",
          "gloss": "GDP=国内基準、GNI=国民(国籍)基準。グローバル化で両者の差が拡大。"
        }
      }
    ]
  },
  {
    "id": "soc-geo-climate-tokyo-1",
    "subject": "social",
    "skillTag": "geo.climate.koppen",
    "prompt": "東京の気候区分(ケッペン)は？",
    "correct": "温暖湿潤気候(Cfa)",
    "why": "夏に多雨で年中湿潤、最暖月22℃以上、冬も極端に寒くない → Cfa。",
    "choices": [
      {
        "value": "温暖湿潤気候(Cfa)"
      },
      {
        "value": "西岸海洋性気候(Cfb)",
        "validContext": {
          "sentence": "ロンドン・パリは Cfb。最暖月22℃未満、年較差小。",
          "gloss": "Cfa(温暖湿潤・夏暑い)とCfb(冷涼・夏涼しい)は最暖月平均気温22℃で分岐。"
        }
      },
      {
        "value": "亜寒帯湿潤気候(Df)",
        "validContext": {
          "sentence": "札幌など北海道はDf。最寒月-3℃未満。",
          "gloss": "東京は冬でも氷点下が珍しいので温帯。北海道は冬の冷え込みで亜寒帯。"
        }
      }
    ]
  },
  {
    "id": "soc-history-ww-1",
    "subject": "social",
    "skillTag": "history.world_wars",
    "prompt": "1929年の世界恐慌の引き金になったのは？",
    "correct": "ニューヨーク株式市場の暴落",
    "why": "1929年10月『暗黒の木曜日』のウォール街株価暴落から世界に波及。",
    "choices": [
      {
        "value": "ニューヨーク株式市場の暴落"
      },
      {
        "value": "サラエボ事件",
        "validContext": {
          "sentence": "サラエボ事件(1914)は第一次世界大戦の引き金。",
          "gloss": "事件と戦争・恐慌の対応: サラエボ→WWI、世界恐慌→WWIIへの遠因、真珠湾→太平洋戦争。"
        }
      }
    ]
  },
  {
    "id": "soc-history-postwar-1",
    "subject": "social",
    "skillTag": "history.postwar.japan",
    "prompt": "1956年に日本が国際社会復帰の決定打となった出来事は？",
    "correct": "国際連合加盟",
    "why": "日ソ共同宣言で国交回復→ソ連の拒否権が外れて国連加盟実現。",
    "choices": [
      {
        "value": "国際連合加盟"
      },
      {
        "value": "サンフランシスコ平和条約",
        "validContext": {
          "sentence": "1951年のサンフランシスコ平和条約で連合国の大半と講和し主権回復。",
          "gloss": "順序: サ条約(1951主権回復)→日ソ共同宣言(1956)→国連加盟(1956)→日韓基本条約(1965)→日中共同声明(1972)。"
        }
      }
    ]
  }
];
