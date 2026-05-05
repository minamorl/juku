// Confusable-pair driven drill items, multi-subject.
// Core idea: every distractor must have a context where IT is the right answer.
// That turns a wrong choice into a 2-for-1 learning moment.

export type Subject = "english" | "math" | "japanese" | "science" | "social";

export interface Choice {
  value: string;
  validContext?: {
    sentence: string;
    gloss: string;
  };
}

export interface DrillItem {
  id: string;
  subject: Subject;
  skillTag: string;
  prompt: string;
  choices: Choice[];
  correct: string;
  why: string;
}

export const SUBJECT_META: Record<Subject, { label: string; emoji: string; tagline: string }> = {
  english:  { label: "英語",   emoji: "🅰",  tagline: "語法の境界線を踏む" },
  math:     { label: "数学",   emoji: "∑",   tagline: "解法選択の分岐を踏む" },
  japanese: { label: "国語",   emoji: "あ",  tagline: "紛らわしい語の弁別" },
  science:  { label: "理科",   emoji: "⚗",   tagline: "概念混同を解きほぐす" },
  social:   { label: "社会",   emoji: "🏛",  tagline: "用語の取り違えを潰す" },
};

const ENGLISH_ITEMS: DrillItem[] = [
  {
    id: "en-prep-at-in-1",
    subject: "english",
    skillTag: "preposition.at_in",
    prompt: "I'm good ___ math.",
    correct: "at",
    why: "be good at + 分野(技能)。",
    choices: [
      { value: "at" },
      { value: "in", validContext: { sentence: "I'm good in a crisis.", gloss: "be good in + 状況。同じ『得意』でも分野ではなく状況のとき in。" } },
      { value: "on", validContext: { sentence: "She's an authority on medieval history.", gloss: "on は『〜について』の話題指定。専門領域を語るとき。" } },
    ],
  },
  {
    id: "en-tense-when-1",
    subject: "english",
    skillTag: "tense.adverbial_vs_nominal_when",
    prompt: "When I ___ home, I'll call you.",
    correct: "get",
    why: "時の副詞節では未来を現在形で表す。",
    choices: [
      { value: "get" },
      { value: "will get", validContext: { sentence: "I don't know when I will get home.", gloss: "同じ when でも『いつ〜か』の名詞節になると未来形 will OK。副詞節と名詞節の区別が核心。" } },
      { value: "got", validContext: { sentence: "When I got home, the lights were off.", gloss: "過去の出来事を語る副詞節なら過去形。時制は文脈で決まる。" } },
    ],
  },
  {
    id: "en-article-1",
    subject: "english",
    skillTag: "article.a_the_zero",
    prompt: "She is ___ teacher.",
    correct: "a",
    why: "初出・職業の不特定単数 → 不定冠詞 a。",
    choices: [
      { value: "a" },
      { value: "the", validContext: { sentence: "She is the teacher I told you about.", gloss: "後ろに『私が話した』という特定情報が付くと the。聞き手が『どの先生か』を絞れるとき。" } },
      { value: "(no article)", validContext: { sentence: "She is Teacher of the Year.", gloss: "称号・役職の固有名詞化では無冠詞。" } },
    ],
  },
  {
    id: "en-since-for-1",
    subject: "english",
    skillTag: "preposition.since_for",
    prompt: "I have lived here ___ ten years.",
    correct: "for",
    why: "for + 期間の長さ。",
    choices: [
      { value: "for" },
      { value: "since", validContext: { sentence: "I have lived here since 2015.", gloss: "since + 起点の時刻。期間ではなく『いつから』を指すとき。" } },
      { value: "in", validContext: { sentence: "I'll finish it in ten years.", gloss: "in + 期間 は『〜後に』『〜以内に』の未来方向。" } },
    ],
  },
  {
    id: "en-make-do-1",
    subject: "english",
    skillTag: "verb.make_do",
    prompt: "I have to ___ my homework.",
    correct: "do",
    why: "do は既存の課題・義務をこなす。",
    choices: [
      { value: "do" },
      { value: "make", validContext: { sentence: "I have to make a decision.", gloss: "make は無から生み出す/作り出す。decision, plan, mistake は make。" } },
      { value: "take", validContext: { sentence: "I have to take a test tomorrow.", gloss: "take は受け取る/受験する側。test, exam, lesson は take。" } },
    ],
  },
];

const MATH_ITEMS: DrillItem[] = [
  {
    id: "math-perm-comb-1",
    subject: "math",
    skillTag: "combinatorics.permutation_vs_combination",
    prompt: "5人から3人を選んで並べる方法は何通り？ → 計算には ___ を使う。",
    correct: "順列(P)",
    why: "順序が区別される選び方は順列 P(n,r) = n!/(n-r)!。",
    choices: [
      { value: "順列(P)" },
      { value: "組合せ(C)", validContext: { sentence: "5人から3人を選ぶ(並びは問わない)なら C(5,3)=10。", gloss: "順序を区別しないときは組合せ。『選ぶ』だけか『選んで並べる』かで分岐。" } },
      { value: "重複順列", validContext: { sentence: "5種類のお菓子から重複ありで3個選ぶ並びなら 5^3=125。", gloss: "同じものを何度でも使えるなら重複順列。" } },
    ],
  },
  {
    id: "math-diff-int-1",
    subject: "math",
    skillTag: "calculus.diff_vs_integral",
    prompt: "速度から距離を求めるには ___ を使う。",
    correct: "積分",
    why: "v(t) を t で積分すれば移動距離。",
    choices: [
      { value: "積分" },
      { value: "微分", validContext: { sentence: "位置 x(t) から速度 v(t) を求めるときは x'(t)=v(t) で微分。", gloss: "位置→速度→加速度は微分。逆向き(速度→位置)は積分。方向で使い分ける。" } },
      { value: "極限のみ", validContext: { sentence: "lim_{h→0} (f(x+h)-f(x))/h は微分の定義そのもの。", gloss: "極限は微分・積分の土台だが、距離計算そのものではない。" } },
    ],
  },
  {
    id: "math-mean-median-1",
    subject: "math",
    skillTag: "statistics.mean_vs_median",
    prompt: "外れ値の影響を受けにくい代表値は ___ 。",
    correct: "中央値",
    why: "中央値は順位ベースなので極端値に強い。",
    choices: [
      { value: "中央値" },
      { value: "平均値", validContext: { sentence: "全員の合計点を人数で割る『一人当たり』を出すときは平均値。", gloss: "総量を等分する文脈では平均値。外れ値が無いか少ないデータで有効。" } },
      { value: "最頻値", validContext: { sentence: "アンケートで『最も多かった回答』を答えるなら最頻値。", gloss: "カテゴリデータや離散値で『一番多い』を聞かれるときは最頻値。" } },
    ],
  },
  {
    id: "math-prob-cond-1",
    subject: "math",
    skillTag: "probability.joint_vs_conditional",
    prompt: "『Aが起きたという条件のもとでBが起きる確率』は ___ 。",
    correct: "条件付き確率 P(B|A)",
    why: "条件付きは分母を A 側に絞る。P(B|A)=P(A∩B)/P(A)。",
    choices: [
      { value: "条件付き確率 P(B|A)" },
      { value: "同時確率 P(A∩B)", validContext: { sentence: "『AとBが両方起きる』確率は同時確率 P(A∩B)。", gloss: "『両方』は同時、『Aの中でB』は条件付き。日本語の『〜のもとで』に注意。" } },
      { value: "周辺確率 P(B)", validContext: { sentence: "条件を一切付けず単に『Bが起きる』確率なら P(B)。", gloss: "全体の中での割合は周辺確率。" } },
    ],
  },
  {
    id: "math-vec-dot-cross-1",
    subject: "math",
    skillTag: "vector.dot_vs_cross",
    prompt: "2つのベクトルが直交するかを判定するには ___ を計算する。",
    correct: "内積",
    why: "内積=0 ⇔ 直交(零ベクトル除く)。",
    choices: [
      { value: "内積" },
      { value: "外積", validContext: { sentence: "平行四辺形の面積や法線ベクトルを求めるなら外積。", gloss: "面積・法線は外積、角度・直交判定は内積。3次元限定なのも外積の特徴。" } },
      { value: "ノルムの差", validContext: { sentence: "ベクトルの大きさを比べるなら |a|-|b|。", gloss: "大きさそのものはノルム。直交性とは別概念。" } },
    ],
  },
];

const JAPANESE_ITEMS: DrillItem[] = [
  {
    id: "jp-igai-1",
    subject: "japanese",
    skillTag: "vocab.igai_homophone",
    prompt: "「彼が来るとは ___ だった」の空欄に入るのは？",
    correct: "意外",
    why: "「思いがけない」の意は『意外』。",
    choices: [
      { value: "意外" },
      { value: "以外", validContext: { sentence: "彼以外は全員来た。", gloss: "『〜を除いて』の意は『以外』。範囲から外す用法。" } },
    ],
  },
  {
    id: "jp-taisho-1",
    subject: "japanese",
    skillTag: "vocab.taisho_triple",
    prompt: "「研究の ___ は中学生だ」の空欄に入るのは？",
    correct: "対象",
    why: "働きかけの目標・相手は『対象』。",
    choices: [
      { value: "対象" },
      { value: "対照", validContext: { sentence: "兄と弟は対照的な性格だ。", gloss: "二つを比べて違いを際立たせるのは『対照』。" } },
      { value: "対称", validContext: { sentence: "この図形は左右対称だ。", gloss: "形が釣り合っているのは『対称』。シンメトリー。" } },
    ],
  },
  {
    id: "jp-shijigo-1",
    subject: "japanese",
    skillTag: "grammar.demonstrative_distance",
    prompt: "話し手から遠く、聞き手にも遠い物を指すのは？",
    correct: "あれ",
    why: "コソアドのア系は両者から遠い対象を指す。",
    choices: [
      { value: "あれ" },
      { value: "これ", validContext: { sentence: "これは私の本だ。", gloss: "話し手の近くにあるものはコ系。" } },
      { value: "それ", validContext: { sentence: "それを取ってください。", gloss: "聞き手の近くにあるものはソ系。文脈中で既に話題にしたものにも使う。" } },
    ],
  },
  {
    id: "jp-keigo-1",
    subject: "japanese",
    skillTag: "honorific.sonkei_vs_kenjo",
    prompt: "先生の動作を高めて言うときに使うのは？",
    correct: "尊敬語(いらっしゃる)",
    why: "相手側の動作を高めるのは尊敬語。",
    choices: [
      { value: "尊敬語(いらっしゃる)" },
      { value: "謙譲語(参る)", validContext: { sentence: "私が先生のお宅に参ります。", gloss: "自分側の動作をへりくだって相手を高めるのは謙譲語。主語が自分のとき。" } },
      { value: "丁寧語(行きます)", validContext: { sentence: "明日ここに行きます。", gloss: "聞き手に対する丁寧さを表すだけで上下関係は中立なのが丁寧語。" } },
    ],
  },
  {
    id: "jp-conj-1",
    subject: "japanese",
    skillTag: "grammar.conjunction_contrast",
    prompt: "「雨が降った。___ 試合は中止になった」 の空欄に入るのは？",
    correct: "そのため",
    why: "原因→結果の順接を導くのは『そのため/だから/したがって』。",
    choices: [
      { value: "そのため" },
      { value: "しかし", validContext: { sentence: "雨が降った。しかし試合は行われた。", gloss: "前と逆の事態が続くときは逆接『しかし』。" } },
      { value: "ところで", validContext: { sentence: "雨が降った。ところで宿題はやった？", gloss: "話題を転換するときは『ところで』。論理関係ではなく場面転換。" } },
    ],
  },
];

const SCIENCE_ITEMS: DrillItem[] = [
  {
    id: "sci-mass-weight-1",
    subject: "science",
    skillTag: "physics.mass_vs_weight",
    prompt: "月へ行っても変わらない量は？",
    correct: "質量",
    why: "質量は物質固有の量で場所に依存しない(単位 kg)。",
    choices: [
      { value: "質量" },
      { value: "重さ", validContext: { sentence: "月では重さが地球の約1/6になる。", gloss: "重さは重力による力(単位 N)。重力加速度に比例して場所で変わる。日常語の『重い』は混同のもと。" } },
      { value: "体積", validContext: { sentence: "気体の体積は圧力と温度で変わる。", gloss: "体積は形・状態で変わる。固体でも温度で熱膨張する。" } },
    ],
  },
  {
    id: "sci-atom-mol-1",
    subject: "science",
    skillTag: "chemistry.atom_vs_molecule",
    prompt: "「水(H₂O)」を構成する最小単位として正しいのは？",
    correct: "分子",
    why: "2つ以上の原子が結合して1つの粒子になったものが分子。H₂O は分子の例。",
    choices: [
      { value: "分子" },
      { value: "原子", validContext: { sentence: "ヘリウム(He)は原子のままで存在する希ガス。", gloss: "希ガスや金属は原子単独で性質を示す。すべての物質が分子からなるわけではない。" } },
      { value: "イオン", validContext: { sentence: "食塩水中の Na⁺ と Cl⁻ はイオン。", gloss: "電子の過不足で電荷を帯びた粒子はイオン。塩類の水溶液の主役。" } },
    ],
  },
  {
    id: "sci-velocity-accel-1",
    subject: "science",
    skillTag: "physics.velocity_vs_acceleration",
    prompt: "「1秒ごとに速さが2m/s増えていく」のは何の値？",
    correct: "加速度",
    why: "単位時間あたりの速度変化は加速度(m/s²)。",
    choices: [
      { value: "加速度" },
      { value: "速度", validContext: { sentence: "車が30 m/s で走っている、というのは速度の値。", gloss: "ある瞬間の単位時間あたりの位置変化が速度。『今どれだけ速いか』。" } },
      { value: "変位", validContext: { sentence: "東に 100m 動いた、というのが変位。", gloss: "始点から終点までの位置の差(向き付き)が変位。距離(道のり)とは別。" } },
    ],
  },
  {
    id: "sci-plant-1",
    subject: "science",
    skillTag: "biology.angiosperm_vs_gymnosperm",
    prompt: "胚珠が子房に包まれている植物は？",
    correct: "被子植物",
    why: "被子=胚珠が子房という殻に『被われている』。サクラ・アサガオなど。",
    choices: [
      { value: "被子植物" },
      { value: "裸子植物", validContext: { sentence: "マツ・スギは裸子植物。", gloss: "裸子=胚珠がむき出し(子房がない)。針葉樹の多くがこちら。" } },
      { value: "シダ植物", validContext: { sentence: "ゼンマイ・イヌワラビはシダ植物。", gloss: "シダは種子ではなく胞子で増える。そもそも胚珠を持たない。" } },
    ],
  },
  {
    id: "sci-current-voltage-1",
    subject: "science",
    skillTag: "physics.current_vs_voltage",
    prompt: "回路で「電気を押し出す力」にあたるのは？",
    correct: "電圧",
    why: "電位差=電圧が電流を流す原動力。単位はV(ボルト)。",
    choices: [
      { value: "電圧" },
      { value: "電流", validContext: { sentence: "豆電球を流れる電気の量は電流で、単位は A(アンペア)。", gloss: "実際に流れている電気の量が電流。押し出す力(電圧)とは別物。水流のアナロジーなら水量。" } },
      { value: "抵抗", validContext: { sentence: "ニクロム線は電流を流れにくくする抵抗が大きい。", gloss: "電流の流れにくさが抵抗。単位 Ω(オーム)。V=IR で3者がつながる。" } },
    ],
  },
];

const SOCIAL_ITEMS: DrillItem[] = [
  {
    id: "soc-jomon-yayoi-1",
    subject: "social",
    skillTag: "history.jomon_vs_yayoi",
    prompt: "稲作と金属器が広まり、ムラ同士が争うようになった時代は？",
    correct: "弥生時代",
    why: "稲作・青銅器・鉄器・環濠集落は弥生の特徴。",
    choices: [
      { value: "弥生時代" },
      { value: "縄文時代", validContext: { sentence: "縄文時代は採集・狩猟・漁労が中心で、土偶や貝塚が特徴。", gloss: "縄文は争いの痕跡が少なく定住度も浅い。稲作以前の段階。" } },
      { value: "古墳時代", validContext: { sentence: "古墳時代は大王を中心とする豪族連合(ヤマト政権)が前方後円墳を築いた時代。", gloss: "弥生のあと、政治統合が進んで大型墳墓が作られたのが古墳時代。" } },
    ],
  },
  {
    id: "soc-three-powers-1",
    subject: "social",
    skillTag: "civics.three_branches",
    prompt: "法律をつくる権限は ___ にある。",
    correct: "立法権(国会)",
    why: "国会は唯一の立法機関(憲法41条)。",
    choices: [
      { value: "立法権(国会)" },
      { value: "行政権(内閣)", validContext: { sentence: "法律にもとづいて政策を実施するのは内閣の行政権。", gloss: "『つくる』のではなく『運営・執行する』のが行政。" } },
      { value: "司法権(裁判所)", validContext: { sentence: "法律が憲法違反かどうかを判断するのは裁判所の違憲審査権(司法権)。", gloss: "法を『裁く』のが司法。三権はつくる・運用する・裁くで分業。" } },
    ],
  },
  {
    id: "soc-supply-demand-1",
    subject: "social",
    skillTag: "economics.demand_vs_supply",
    prompt: "「ある商品が流行して買いたい人が増えた」のは ___ の変化。",
    correct: "需要",
    why: "需要=買い手側の量。流行や所得増で右シフト。",
    choices: [
      { value: "需要" },
      { value: "供給", validContext: { sentence: "新工場が稼働して市場に商品が増えるのは供給の増加。", gloss: "供給=売り手側の量。生産能力・原材料費・技術進歩で動く。" } },
      { value: "均衡価格", validContext: { sentence: "需要と供給が一致する点が均衡価格。", gloss: "需要と供給の交点として『結果』として決まるのが均衡価格。原因ではなく帰結。" } },
    ],
  },
  {
    id: "soc-meiji-taisho-1",
    subject: "social",
    skillTag: "history.meiji_taisho_demands",
    prompt: "普通選挙法(1925)が成立したのは？",
    correct: "大正時代",
    why: "大正デモクラシーの流れで男子普通選挙が実現。",
    choices: [
      { value: "大正時代" },
      { value: "明治時代", validContext: { sentence: "大日本帝国憲法発布(1889)・帝国議会開設(1890)は明治時代。", gloss: "近代国家の枠組み(憲法・議会)を作ったのが明治。普通選挙はまだ。" } },
      { value: "昭和時代(戦後)", validContext: { sentence: "女性も含む完全普通選挙の実現は1945年の選挙法改正(戦後)。", gloss: "男女平等の普通選挙は戦後。大正は男子のみ。" } },
    ],
  },
  {
    id: "soc-climate-1",
    subject: "social",
    skillTag: "geography.climate_zones",
    prompt: "東京の気候区分は？",
    correct: "温帯湿潤気候(Cfa)",
    why: "四季があり夏に多雨で年中湿潤、冬も厳しすぎないのがCfa。",
    choices: [
      { value: "温帯湿潤気候(Cfa)" },
      { value: "亜寒帯(冷帯)気候(Df)", validContext: { sentence: "札幌・旭川など北海道の多くは亜寒帯湿潤気候(Df)。", gloss: "冬の寒さが厳しく、最寒月平均気温が-3℃を下回る地域は亜寒帯。" } },
      { value: "西岸海洋性気候(Cfb)", validContext: { sentence: "ロンドンやパリは西岸海洋性気候(Cfb)。", gloss: "夏も涼しく年較差が小さい温帯。偏西風と暖流の影響を受ける大陸西岸が典型。" } },
    ],
  },
];

export const ITEMS: DrillItem[] = [
  ...ENGLISH_ITEMS,
  ...MATH_ITEMS,
  ...JAPANESE_ITEMS,
  ...SCIENCE_ITEMS,
  ...SOCIAL_ITEMS,
];

export function itemsBySubject(subject: Subject): DrillItem[] {
  return ITEMS.filter(it => it.subject === subject);
}
