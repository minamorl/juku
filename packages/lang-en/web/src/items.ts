// Confusable-pair driven drill items.
// Core idea: every distractor must have a context where IT is the right answer.
// That turns a wrong choice into a 2-for-1 learning moment.

export interface Choice {
  value: string;
  validContext?: {
    sentence: string;
    gloss: string;
  };
}

export interface DrillItem {
  id: string;
  skillTag: string;
  prompt: string;
  choices: Choice[];
  correct: string;
  why: string;
}

export const ITEMS: DrillItem[] = [
  {
    id: "prep-at-in-1",
    skillTag: "preposition.at_in",
    prompt: "I'm good ___ math.",
    correct: "at",
    why: "be good at + 分野(技能)。",
    choices: [
      { value: "at" },
      {
        value: "in",
        validContext: {
          sentence: "I'm good in a crisis.",
          gloss: "be good in + 状況。『〜な状況下で力を発揮する』。同じ『得意』でも分野ではなく状況のとき in。",
        },
      },
      {
        value: "on",
        validContext: {
          sentence: "She's an authority on medieval history.",
          gloss: "on は『〜について』の話題指定。専門領域を語るときに使う。",
        },
      },
    ],
  },
  {
    id: "tense-when-1",
    skillTag: "tense.adverbial_vs_nominal_when",
    prompt: "When I ___ home, I'll call you.",
    correct: "get",
    why: "時の副詞節では未来を現在形で表す。",
    choices: [
      { value: "get" },
      {
        value: "will get",
        validContext: {
          sentence: "I don't know when I will get home.",
          gloss: "同じ when でも『いつ〜か』という名詞節になると未来形 will OK。副詞節と名詞節の区別が核心。",
        },
      },
      {
        value: "got",
        validContext: {
          sentence: "When I got home, the lights were off.",
          gloss: "過去の出来事を語る副詞節なら過去形。時制は文脈で決まる。",
        },
      },
    ],
  },
  {
    id: "article-a-the-1",
    skillTag: "article.a_the_zero",
    prompt: "She is ___ teacher.",
    correct: "a",
    why: "初出・職業の不特定単数 → 不定冠詞 a。",
    choices: [
      { value: "a" },
      {
        value: "the",
        validContext: {
          sentence: "She is the teacher I told you about.",
          gloss: "後ろに『私が話した』という特定情報が付くと the。聞き手が『どの先生か』を絞れる時。",
        },
      },
      {
        value: "(no article)",
        validContext: {
          sentence: "She is Teacher of the Year.",
          gloss: "称号・役職の固有名詞化では無冠詞。Captain Smith、President Tanaka と同じ系統。",
        },
      },
    ],
  },
  {
    id: "since-for-1",
    skillTag: "preposition.since_for",
    prompt: "I have lived here ___ ten years.",
    correct: "for",
    why: "for + 期間の長さ。",
    choices: [
      { value: "for" },
      {
        value: "since",
        validContext: {
          sentence: "I have lived here since 2015.",
          gloss: "since + 起点の時刻。期間ではなく『いつから』を指すとき。",
        },
      },
      {
        value: "in",
        validContext: {
          sentence: "I'll finish it in ten years.",
          gloss: "in + 期間 は『〜後に』『〜以内に』の未来方向。完了の所要時間にも。",
        },
      },
    ],
  },
  {
    id: "make-do-1",
    skillTag: "verb.make_do",
    prompt: "I have to ___ my homework.",
    correct: "do",
    why: "do は既存の課題・義務をこなす。",
    choices: [
      { value: "do" },
      {
        value: "make",
        validContext: {
          sentence: "I have to make a decision.",
          gloss: "make は無から生み出す/作り出す。decision, plan, mistake は make。",
        },
      },
      {
        value: "take",
        validContext: {
          sentence: "I have to take a test tomorrow.",
          gloss: "take は受け取る/受験する側。test, exam, lesson は take。",
        },
      },
    ],
  },
];
