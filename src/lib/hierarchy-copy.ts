import { useI18n, type Locale } from "@/lib/i18n";
import type { HierarchyRankId, PowerBranchId, ScalaStepId } from "@/lib/sins";

export type StepCopy = {
  name: string;
  sinName: string;
  manifestation: string;
  body: string;
  quote: string;
  quoteBy: string;
};

export type RankCopy = {
  name: string;
  charge: string;
  body: string;
};

export type BranchCopy = {
  name: string;
  manifestation: string;
  body: string;
  quote: string;
  quoteBy: string;
  entrance: string;
};

export type HierarchyCopy = {
  nav: string;
  kicker: string;
  heading: string;
  formula: string;
  formulaSecond: string;
  returnDesk: string;
  diagramKicker: string;
  occupied: (n: number, max: number) => string;
  notSold: string;
  recorded: string;
  unclaimed: string;
  ranks: Record<HierarchyRankId, RankCopy>;
  steps: Record<ScalaStepId, StepCopy>;
  branches: Record<PowerBranchId, BranchCopy>;
  powerKicker: string;
  powerHeading: string;
  powerSymmetry: string;
  succession: string;
  btcCanon: string;
  scalaKicker: string;
  scalaHeading: string;
  scalaLogic: string;
  pathKicker: string;
  pathHeading: string;
  gateITitle: string;
  gateILatin: string;
  gateIBody: string[];
  gateIITitle: string;
  gateIILatin: string;
  gateIIBody: string;
  gateIIChoices: string[];
  gateIIRefuse: string;
  gateIIITitle: string;
  gateIIILatin: string;
  gateIIIBody: string[];
  wallKicker: string;
  wallHeading: string;
  wallBody: string;
  apocryphonKicker: string;
  apocryphonHeading: string;
  apocryphonQuote: string;
  apocryphonBy: string;
  apocryphonBody: string;
  whyKicker: string;
  whyHeading: string;
  whyBody: string;
  faqKicker: string;
  faqHeading: string;
  faq: Array<{ q: string; a: string }>;
  diaryKicker: string;
  diaryHeading: string;
  diary: Array<{ date: string; body: string }>;
};

const en: HierarchyCopy = {
  nav: "Hierarchy",
  kicker: "Liber Animarum · Scala",
  heading: "The house is read from the seal downward.",
  formula: "The ladder removes sins. Power accepts them. The soul is eternal. So is the sin.",
  formulaSecond: "You entered last. Your soul pays for a door that is already shut.",
  returnDesk: "Return to the desk",
  diagramKicker: "Ordo",
  occupied: (n, max) => `Seated: ${n} of ${max}`,
  notSold: "Not offered.",
  recorded: "Recorded, not sold.",
  unclaimed: "No address is written here.",
  ranks: {
    summus: {
      name: "Highest Curator",
      charge: "One seat. The one who already gave power away.",
      body: "The seal is dull. Three rings remain. Avaritia here is faded. He does not acquire. He has already paid.",
    },
    curator: {
      name: "Curator of the House",
      charge: "One seat. Entrance: three Seals.",
      body: "He who gathered three Seals accepts Avaritia as the wage of office. The Curator is not cleansed. He accumulates.",
    },
    consilium: {
      name: "Council of the Eternal House",
      charge: "Three seats. The first three holders of Keys, by time.",
      body: "The Council is not cleansed. It consumes. Gula of knowledge is the wage of balance. You sit. You speak. You know more than those below.",
    },
    custodes: {
      name: "Keepers of the Threshold",
      charge: "Four seats. The remaining holders of Keys.",
      body: "A deliberative voice. No veto. Gula here is weakened. You watch the door you once paid to pass.",
    },
    scala: {
      name: "The five degrees of the petitioner",
      charge: "Umbra, Petitor, Purgans, Imago, Illuminatus.",
      body: "Five personal sins, removed along the way. The enlightened has taken all five off and still holds no office.",
    },
  },
  steps: {
    umbra: {
      name: "The Shadow",
      sinName: "Lust",
      manifestation: "Lust for the unissued name",
      body: "You came here because you wanted the new. You changed houses the way one changes gloves. Your soul is a collection of brides you never chose.",
      quote: "The soul is form and meaning, not matter.",
      quoteBy: "Aristotle",
    },
    petitor: {
      name: "The Petitioner",
      sinName: "Pride",
      manifestation: "Vanity of the displayed purse",
      body: "You did not buy a name. You bought applause. Your soul is a vitrine, and behind the glass there is nothing.",
      quote: "The human being is a synthesis of soul and body, a relation that relates itself to itself.",
      quoteBy: "Kierkegaard",
    },
    purgans: {
      name: "The One Being Cleansed",
      sinName: "Envy",
      manifestation: "Envy of another’s multiple",
      body: "You looked at another’s purse and counted his fortune as your loss.",
      quote: "The soul is immortal and akin to the divine.",
      quoteBy: "Plato",
    },
    imago: {
      name: "The Reflection",
      sinName: "Wrath",
      manifestation: "Wrath at those who left earlier",
      body: "You cursed the ones who sold before you. Wrath does not restore what is gone. It hastens the fall.",
      quote: "The soul is the first entelechy of a natural body.",
      quoteBy: "Aristotle",
    },
    illuminatus: {
      name: "The Enlightened",
      sinName: "Acedia",
      manifestation: "The sloth of the one who waits for the chart to think",
      body: "You did not read. You did not verify. You did not think. You waited. Your sloth is a faith that the matter will settle itself.",
      quote: "The soul is not given. It is created in the course of a life.",
      quoteBy: "Camus",
    },
  },
  branches: {
    seal: {
      name: "The Seals",
      manifestation: "Avarice of multiples",
      body: "The Curator is not cleansed. He accumulates. Avaritia is the price of office. He who gathered three Seals accepts it as payment.",
      quote: "The art of being a venal little soul while having nothing to sell.",
      quoteBy: "Lec",
      entrance: "Three Seals. Each recorded at 8.88 BTC. Together 26.64 BTC.",
    },
    key: {
      name: "The Keys",
      manifestation: "Gluttony of knowledge",
      body: "The Council is not cleansed. It consumes. Gluttony of knowing is the price of balance. You sit, you confer, you know more than the others.",
      quote: "The concepts “soul” and “spirit” were invented.",
      quoteBy: "Nietzsche",
      entrance: "Seven Keys. Each recorded at 1 BTC. Three seats of Council. Four of the Threshold.",
    },
  },
  powerKicker: "Duae ramus",
  powerHeading: "Two branches of office",
  powerSymmetry:
    "Personal sins are removed. Structural sins are accepted. Office is not washed. It is balanced: the Curator’s Avaritia against the Council’s Gula.",
  succession:
    "If one person gathers all three Seals, he becomes Curator. The former Curator becomes Highest Curator. The three seats of Council are vacated and taken by the first three holders of Keys, by time. The remaining four are Keepers of the Threshold.",
  btcCanon:
    "The Bitcoin collection of the house is ten charters and will not be more: three Seals and seven Keys.",
  scalaKicker: "Quinque gradus",
  scalaHeading: "Five degrees. Five personal sins.",
  scalaLogic:
    "You enter through lust. You wish to be seen. You compare. You rage. At the end you are tempted to stop. The enlightened is the one who has removed all five and still holds no office.",
  pathKicker: "Tria ostia",
  pathHeading: "The petitioner’s path. Three gates. No coin lifts you.",
  gateITitle: "Ascent",
  gateILatin: "Ostium I · burn-to-ascend",
  gateIBody: [
    "Burn three charters of a degree, and settle the difference, to receive one charter of the next.",
    "Three Umbra become one Petitor. Three Petitor become one Purgans. Three Purgans become one Imago. Three Imago become one Illuminatus.",
    "The Enlightened is not taken from the desk. It is gathered. Eighty-one Umbra stand under one Illuminatus.",
  ],
  gateIITitle: "The Ordeal",
  gateIILatin: "Ostium II · Ordeal",
  gateIIBody:
    "The Enlightened has removed five sins, yet Acedia still whispers that you should stop. The ordeal is an act that proves Acedia has been taken off. Choose one of three. The ordeal cannot be purchased.",
  gateIIChoices: [
    "The riddle of the Gates. Answer the Curator’s question from the room of mirrors.",
    "A line in the Book. Write a fragment of Liber Animarum, fifty to one hundred words, which the Curator accepts and records.",
    "A new soul. Bring a collector of the degree Purgans or above.",
  ],
  gateIIRefuse: "The Curator may refuse. That refusal is part of the rite.",
  gateIIITitle: "The Key",
  gateIIILatin: "Ostium III · Ritus Clavis",
  gateIIIBody: [
    "Burn three Illuminatus, and settle the remainder to one bitcoin, to receive one Key of Eternity.",
    "There are seven Keys. A Key may be taken at one bitcoin, or forged by the rite.",
    "When seven Keys are seated, the ladder is closed. Those who arrive later receive a Deferred Key: the right of first repurchase. Not a seat.",
  ],
  wallKicker: "Anonymum",
  wallHeading: "Wall of holders",
  wallBody: "Addresses are shortened. Rank is not. The house writes the degree. It does not write the face.",
  apocryphonKicker: "Apocryphon",
  apocryphonHeading: "A margin the Book does not deny",
  apocryphonQuote: "The concepts “soul” and “spirit” were invented.",
  apocryphonBy: "Nietzsche",
  apocryphonBody:
    "We do not assert that the soul exists. We assert that its absence is the dearest goods the house records.",
  whyKicker: "Septem",
  whyHeading: "Why seven, and not five",
  whyBody:
    "Seven sins. Five degrees. Two branches. Five are removed on the path. Two are accepted in office. None remains without a place. Eternity does not endure a vacancy.",
  faqKicker: "Acta",
  faqHeading: "Questions the desk will answer once",
  faq: [
    {
      q: "May the Enlightened be taken at the desk.",
      a: "No. It is gathered. The desk records the charter after the path is complete.",
    },
    {
      q: "What occurs when three Seals rest in one hand.",
      a: "That hand accepts the Curatorship. The former Curator becomes Highest Curator. Council is reseated by time among the Keys.",
    },
    {
      q: "Does the house claim that a soul is real.",
      a: "The house claims that the absence is recorded, and that the record is dear.",
    },
    {
      q: "When is the ladder shut.",
      a: "When seven Keys are seated. After that, only the Deferred Key remains.",
    },
    {
      q: "Can the ordeal be settled in coin.",
      a: "No.",
    },
  ],
  diaryKicker: "Diarium",
  diaryHeading: "Curator’s diary",
  diary: [
    { date: "1666.06.06", body: "The ladder is drawn. The seats are empty. The ink is not dry." },
    { date: "1666.06.07", body: "Avaritia sits above. Gula sits beside. They do not wash one another." },
    { date: "2026.11.03", body: "The ninth stall of the old desk remains empty. It is not a degree of this scala." },
    { date: "2026.11.03", body: "The iron still asks one word. The ordeal is not a purchase." },
  ],
};

const ru: HierarchyCopy = {
  nav: "Иерархия",
  kicker: "Liber Animarum · Scala",
  heading: "Дом читается сверху вниз, от печати.",
  formula: "Лестница снимает грехи. Власть их принимает. Душа вечна. Грех — тоже.",
  formulaSecond: "Ты вошёл последним. Твоя душа платит за вход, который закрыт.",
  returnDesk: "К столу",
  diagramKicker: "Ordo",
  occupied: (n, max) => `Занято: ${n} из ${max}`,
  notSold: "Не предлагается.",
  recorded: "Записывается, не продаётся.",
  unclaimed: "Адрес не вписан.",
  ranks: {
    summus: {
      name: "Высший Куратор",
      charge: "Одно место. Тот, кто уже отдал власть.",
      body: "Печать потускнела. Три кольца остаются. Avaritia здесь выцветает. Он не приобретает. Он уже заплатил.",
    },
    curator: {
      name: "Куратор Дома",
      charge: "Одно место. Вход: три Печати.",
      body: "Тот, кто собрал три Печати, принимает Avaritia как плату за должность. Куратор не очищается. Он накапливает.",
    },
    consilium: {
      name: "Совет Дома Вечности",
      charge: "Три места. Первые трое держателей Ключей, по времени.",
      body: "Совет не очищается. Он поглощает. Чревоугодие знания — плата за равновесие. Ты заседаешь. Ты говоришь. Ты знаешь больше тех, кто ниже.",
    },
    custodes: {
      name: "Хранители Порога",
      charge: "Четыре места. Остальные держатели Ключей.",
      body: "Совещательный голос. Без вето. Gula здесь ослаблена. Ты стережёшь дверь, за которую уже платил.",
    },
    scala: {
      name: "Пять ступеней соискателя",
      charge: "Umbra, Petitor, Purgans, Imago, Illuminatus.",
      body: "Пять личных грехов, снимаемых по пути. Просветлённый снял все пять и всё ещё не имеет власти.",
    },
  },
  steps: {
    umbra: {
      name: "Тень",
      sinName: "Похоть",
      manifestation: "Похоть к новому имени",
      body: "Ты пришёл сюда, потому что хотел нового. Ты менял дома как перчатки. Твоя душа — коллекция невест, которых ты так и не выбрал.",
      quote: "Душа есть форма и смысл, а не материя.",
      quoteBy: "Аристотель",
    },
    petitor: {
      name: "Соискатель",
      sinName: "Гордыня",
      manifestation: "Тщеславие выставленного кошелька",
      body: "Ты покупал не имя, а аплодисменты. Твоя душа — витрина, за которой пустота.",
      quote: "Человек есть синтез души и тела, отношение, которое относится к самому себе.",
      quoteBy: "Кьеркегор",
    },
    purgans: {
      name: "Очищающийся",
      sinName: "Зависть",
      manifestation: "Зависть к чужому кратному",
      body: "Ты смотрел на чужой кошелёк и считал его удачу своей потерей.",
      quote: "Душа бессмертна и сродни божественному.",
      quoteBy: "Платон",
    },
    imago: {
      name: "Отражение",
      sinName: "Гнев",
      manifestation: "Гнев на тех, кто вышел раньше",
      body: "Ты проклинал тех, кто продал раньше. Гнев не вернёт потерянное. Он ускоряет падение.",
      quote: "Душа есть первая энтелехия естественного тела.",
      quoteBy: "Аристотель",
    },
    illuminatus: {
      name: "Просветлённый",
      sinName: "Уныние",
      manifestation: "Лень того, кто ждёт, пока график подумает за него",
      body: "Ты не читал, не проверял, не думал. Ты ждал. Твоя лень — вера в то, что всё решится само.",
      quote: "Душа не дана. Она создаётся в течение жизни.",
      quoteBy: "Камю",
    },
  },
  branches: {
    seal: {
      name: "Печати",
      manifestation: "Жадность кратных",
      body: "Куратор не очищается. Он накапливает. Алчность — цена власти. Тот, кто собрал три Печати, принимает её как плату.",
      quote: "Искусство быть продажной душонкой, не имея ничего на продажу.",
      quoteBy: "Лец",
      entrance: "Три Печати. Каждая записана как 8.88 BTC. Вместе 26.64 BTC.",
    },
    key: {
      name: "Ключи",
      manifestation: "Обжорство знания",
      body: "Совет не очищается. Он поглощает. Чревоугодие знания — цена равновесия. Ты заседаешь, обсуждаешь, знаешь больше других.",
      quote: "Понятия «душа», «дух» выдуманы.",
      quoteBy: "Ницше",
      entrance: "Семь Ключей. Каждый записан как 1 BTC. Три места Совета. Четыре — Порога.",
    },
  },
  powerKicker: "Duae ramus",
  powerHeading: "Две ветви власти",
  powerSymmetry:
    "Личные грехи снимаются. Структурные принимаются. Власть не очищается. Она уравновешивается: алчность Куратора против чревоугодия Совета.",
  succession:
    "Если один человек собирает все три Печати, он становится Куратором. Прежний Куратор становится Высшим Куратором. Три места Совета освобождаются и занимаются первыми тремя держателями Ключей по времени. Остальные четыре — Хранители Порога.",
  btcCanon:
    "Bitcoin-собрание дома — десять грамот, и больше не будет: три Печати и семь Ключей.",
  scalaKicker: "Quinque gradus",
  scalaHeading: "Пять ступеней. Пять личных грехов.",
  scalaLogic:
    "Входишь через похоть, хочешь быть замечен, сравниваешь, злишься, и в конце соблазняешься остановиться. Просветлённый — тот, кто снял все пять и ещё не имеет власти.",
  pathKicker: "Tria ostia",
  pathHeading: "Путь соискателя. Три врата. Монета вверх не поднимает.",
  gateITitle: "Восхождение",
  gateILatin: "Ostium I · burn-to-ascend",
  gateIBody: [
    "Сжечь три грамоты ступени и доплатить разницу — получить одну грамоту следующей.",
    "Три Umbra дают одного Petitor. Три Petitor — одного Purgans. Три Purgans — одного Imago. Три Imago — одного Illuminatus.",
    "Просветлённого нельзя взять у стола. Его собирают. Восемьдесят одна Umbra стоят под одним Illuminatus.",
  ],
  gateIITitle: "Испытание",
  gateIILatin: "Ostium II · Ordeal",
  gateIIBody:
    "Illuminatus снял пять грехов, но Acedia шепчет остановиться. Испытание — акт, доказывающий, что Acedia снята. Одно из трёх. Испытание нельзя купить.",
  gateIIChoices: [
    "Загадка Врат. Решить вопрос Куратора из Комнаты зеркал.",
    "Строка в Книге. Написать фрагмент Liber Animarum, пятьдесят-сто слов, который Куратор примет и запишет.",
    "Новая душа. Привести коллекционера степени Purgans и выше.",
  ],
  gateIIRefuse: "Куратор может отказать. Отказ входит в обряд.",
  gateIIITitle: "Ключ",
  gateIIILatin: "Ostium III · Ritus Clavis",
  gateIIIBody: [
    "Сжечь три Illuminatus и доплатить до одного bitcoin — получить один Ключ Вечности.",
    "Ключей семь. Ключ берут за один bitcoin либо выковывают обрядом.",
    "Когда семь Ключей заняты, лестница закрывается. Опоздавшие получают Отсроченный Ключ: право первого выкупа. Не место.",
  ],
  wallKicker: "Anonymum",
  wallHeading: "Стена владельцев",
  wallBody: "Адреса укорочены. Степень — нет. Дом пишет ранг. Лицо он не пишет.",
  apocryphonKicker: "Apocryphon",
  apocryphonHeading: "Поле, которого Книга не отрицает",
  apocryphonQuote: "Понятия «душа», «дух» выдуманы.",
  apocryphonBy: "Ницше",
  apocryphonBody:
    "Мы не утверждаем, что душа существует. Мы утверждаем, что её отсутствие — самый дорогой товар.",
  whyKicker: "Septem",
  whyHeading: "Почему семь, а не пять",
  whyBody:
    "Семь грехов. Пять ступеней. Две ветви. Пять снимаются на пути. Два принимаются у власти. Ни один не остаётся без места. Ибо вечность не терпит пустоты.",
  faqKicker: "Acta",
  faqHeading: "Вопросы, на которые стол отвечает один раз",
  faq: [
    {
      q: "Можно ли взять Просветлённого у стола.",
      a: "Нет. Его собирают. Стол записывает грамоту после пути.",
    },
    {
      q: "Что происходит, когда три Печати в одной руке.",
      a: "Эта рука принимает кураторство. Прежний Куратор становится Высшим. Совет пересаживается по времени среди Ключей.",
    },
    {
      q: "Утверждает ли дом, что душа реальна.",
      a: "Дом утверждает, что отсутствие записано, и что запись дорога.",
    },
    {
      q: "Когда лестница закрыта.",
      a: "Когда заняты семь Ключей. После этого остаётся только Отсроченный Ключ.",
    },
    {
      q: "Можно ли закрыть испытание монетой.",
      a: "Нет.",
    },
  ],
  diaryKicker: "Diarium",
  diaryHeading: "Дневник куратора",
  diary: [
    { date: "1666.06.06", body: "Лестница начерчена. Места пусты. Чернила не высохли." },
    { date: "1666.06.07", body: "Avaritia сидит выше. Gula — рядом. Они не смывают друг друга." },
    { date: "2026.11.03", body: "Девятое стойло старого стола по-прежнему пусто. Это не ступень этой лестницы." },
    { date: "2026.11.03", body: "Железо по-прежнему спрашивает одно слово. Испытание не покупка." },
  ],
};

const zh: HierarchyCopy = {
  nav: "层级",
  kicker: "Liber Animarum · Scala",
  heading: "宅邸自上而下阅读，从印开始。",
  formula: "阶梯卸去罪过。权柄将其接纳。灵魂永在。罪亦永在。",
  formulaSecond: "你最后一个进来。你的灵魂为已经关上的门付账。",
  returnDesk: "返回柜台",
  diagramKicker: "Ordo",
  occupied: (n, max) => `在席：${n} / ${max}`,
  notSold: "不提供。",
  recorded: "只被记录，不被出售。",
  unclaimed: "此处未写入地址。",
  ranks: {
    summus: {
      name: "至高策展人",
      charge: "一席。已经交出权柄之人。",
      body: "印已晦暗。三环仍在。此处的 Avaritia 已褪。他不再获取。他已经付过。",
    },
    curator: {
      name: "宅邸策展人",
      charge: "一席。入门：三枚印。",
      body: "集齐三印者，以 Avaritia 为职分之酬。策展人不受洗涤。他只积蓄。",
    },
    consilium: {
      name: "永恒宅邸议会",
      charge: "三席。按时间顺序，最先持有钥匙的三人。",
      body: "议会不受洗涤。它吞食。知识的贪饕是平衡之酬。你列席。你发言。你比下面的人知道得更多。",
    },
    custodes: {
      name: "门槛看守",
      charge: "四席。其余钥匙持有者。",
      body: "咨议之声。无否决。此处的 Gula 已减弱。你看守你曾经付过的那扇门。",
    },
    scala: {
      name: "求问者的五阶",
      charge: "Umbra, Petitor, Purgans, Imago, Illuminatus.",
      body: "五桩私罪，沿途卸去。开悟者卸尽五罪，仍无职分。",
    },
  },
  steps: {
    umbra: {
      name: "影",
      sinName: "淫",
      manifestation: "对新名字的贪欲",
      body: "你来到这里，因为你想要新的。你更换宅邸如同更换手套。你的灵魂是一列从未被选中的新娘。",
      quote: "灵魂是形式与意义，而不是质料。",
      quoteBy: "亚里士多德",
    },
    petitor: {
      name: "求问者",
      sinName: "骄",
      manifestation: "被陈列的钱袋之虚荣",
      body: "你买下的不是名字，是掌声。你的灵魂是橱窗，玻璃后面空着。",
      quote: "人是灵魂与身体的综合，一种自己与自己发生关系的关系。",
      quoteBy: "克尔凯郭尔",
    },
    purgans: {
      name: "受洗者",
      sinName: "妒",
      manifestation: "嫉妒他人的倍数",
      body: "你看着别人的钱袋，把他的运气算作自己的损失。",
      quote: "灵魂不朽，近于神性。",
      quoteBy: "柏拉图",
    },
    imago: {
      name: "映像",
      sinName: "怒",
      manifestation: "对先离开者的怒",
      body: "你咒骂那些先出手的人。怒不能归还已失之物。它只会加速坠落。",
      quote: "灵魂是自然躯体的第一现实。",
      quoteBy: "亚里士多德",
    },
    illuminatus: {
      name: "开悟者",
      sinName: "怠",
      manifestation: "等候图表替他思想的怠惰",
      body: "你不读，不核，不想。你等待。你的怠惰是一种信仰：事情会自行了结。",
      quote: "灵魂不是被给予的。它在一生中被造成。",
      quoteBy: "加缪",
    },
  },
  branches: {
    seal: {
      name: "印",
      manifestation: "对倍数的贪",
      body: "策展人不受洗涤。他积蓄。贪是权柄的代价。集齐三印者，将其作为酬劳接受。",
      quote: "做一颗可被收买的小灵魂，却并无可以出卖之物，这是一门技艺。",
      quoteBy: "莱茨",
      entrance: "三枚印。各记为 8.88 BTC。合计 26.64 BTC。八八八在此是门上的数字，发发发是封缄，不是道路。",
    },
    key: {
      name: "钥匙",
      manifestation: "知识的贪饕",
      body: "议会不受洗涤。它吞食。知情的贪饕是平衡的代价。你列席，你商议，你比别人知道得更多。",
      quote: "“灵魂”“精神”这些概念是被发明出来的。",
      quoteBy: "尼采",
      entrance: "七把钥匙。各记为 1 BTC。议会三席。门槛四席。",
    },
  },
  powerKicker: "Duae ramus",
  powerHeading: "权柄的两支",
  powerSymmetry:
    "私罪被卸去。结构之罪被接纳。权柄不受洗涤。它被制衡：策展人的贪，对议会的饕。",
  succession:
    "若一人集齐三印，他成为策展人。前任成为至高策展人。议会三席空出，由钥匙持有者按时间最先的三人填入。其余四人是门槛看守。",
  btcCanon: "宅邸的比特币文书共十枚，不再增加：三印、七钥。",
  scalaKicker: "Quinque gradus",
  scalaHeading: "五阶。五桩私罪。",
  scalaLogic:
    "你由贪欲进入。你想被看见。你比较。你发怒。最终你被劝停住。开悟者卸尽五罪，仍无职分。",
  pathKicker: "Tria ostia",
  pathHeading: "求问者之途。三门。钱币不能使你上升。",
  gateITitle: "上升",
  gateILatin: "Ostium I · burn-to-ascend",
  gateIBody: [
    "焚去三枚本阶文书，补足差额，得下一阶一枚。",
    "三 Umbra 成一 Petitor。三 Petitor 成一 Purgans。三 Purgans 成一 Imago。三 Imago 成一 Illuminatus。",
    "开悟者不可从柜台取走。它被聚成。八十一枚 Umbra 承一枚 Illuminatus。",
  ],
  gateIITitle: "试炼",
  gateIILatin: "Ostium II · Ordeal",
  gateIIBody:
    "开悟者已卸五罪，而 Acedia 仍低语：停下。试炼是一个行动，证明怠已被卸去。三择一。试炼不可用钱币了结。",
  gateIIChoices: [
    "门之谜。回答镜室中策展人的问题。",
    "书中一行。书写 Liber Animarum 残篇，五十字至一百字，由策展人接纳并登录。",
    "一枚新灵魂。带来 Purgans 及以上的收藏者。",
  ],
  gateIIRefuse: "策展人可以拒绝。拒绝属于仪式。",
  gateIIITitle: "钥匙",
  gateIIILatin: "Ostium III · Ritus Clavis",
  gateIIIBody: [
    "焚去三枚 Illuminatus，补至一枚 bitcoin，得一把永恒之钥。",
    "钥匙共七。可以一枚 bitcoin 领取，也可以用仪式锻成。",
    "七钥入席，阶梯关闭。迟来者得延期之钥：优先赎回之权。不是席位。",
  ],
  wallKicker: "Anonymum",
  wallHeading: "持有者之墙",
  wallBody: "地址缩短。层级不缩短。宅邸写等级。不写面孔。",
  apocryphonKicker: "Apocryphon",
  apocryphonHeading: "书页不否认的边注",
  apocryphonQuote: "“灵魂”“精神”这些概念是被发明出来的。",
  apocryphonBy: "尼采",
  apocryphonBody: "我们不断言灵魂存在。我们断言：它的缺席，是宅邸所登录的最贵之物。",
  whyKicker: "Septem",
  whyHeading: "为何是七，而不是五",
  whyBody:
    "七罪。五阶。两支。五桩在路上被卸去。两桩在权柄中被接纳。没有一桩无处可放。因为永恒不能忍受空位。",
  faqKicker: "Acta",
  faqHeading: "柜台只回答一次的问题",
  faq: [
    {
      q: "开悟者可否在柜台领取。",
      a: "不可。它被聚成。路径完成之后，柜台才登录文书。",
    },
    {
      q: "三印落入同一只手，将发生什么。",
      a: "这只手接受策展之职。前任成为至高策展人。议会按钥匙的时间重新入席。",
    },
    {
      q: "宅邸是否宣称灵魂为真实。",
      a: "宅邸宣称缺席已被登录，而这份登录是贵的。",
    },
    {
      q: "阶梯何时关闭。",
      a: "七钥入席之时。此后只余延期之钥。",
    },
    {
      q: "试炼可否用钱币了结。",
      a: "不可。",
    },
  ],
  diaryKicker: "Diarium",
  diaryHeading: "策展人日记",
  diary: [
    { date: "1666.06.06", body: "阶梯已画出。席位空着。墨未干。" },
    { date: "1666.06.07", body: "Avaritia 在上。Gula 在侧。它们并不互相洗涤。" },
    { date: "2026.11.03", body: "旧柜台的第九席仍空。它不是这条阶梯的一级。" },
    { date: "2026.11.03", body: "铁仍只问一个词。试炼不是购买。" },
  ],
};

const PACKS: Record<Locale, HierarchyCopy> = { en, ru, zh };

export function useHierarchyCopy() {
  const { locale } = useI18n();
  return PACKS[locale] ?? en;
}

export function hierarchyCopyOf(locale: Locale) {
  return PACKS[locale] ?? en;
}
