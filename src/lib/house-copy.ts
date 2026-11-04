import { useI18n, type Locale } from "@/lib/i18n";

export type HouseCopy = {
  navManifest: string;
  navHierarchy: string;
  navMarket: string;
  navCurator: string;
  navWall: string;
  navMirrors: string;
  navGates: string;
  manifestKicker: string;
  manifestHeading: string;
  manifesto: string[];
  curatorKicker: string;
  curatorHeading: string;
  curatorIntro: string;
  diary: Array<{ date: string; title: string; body: string }>;
  wallKicker: string;
  wallHeading: string;
  wallBody: string;
  wallAnonymous: string;
  wallLevel: string;
  wallEmpty: string;
  mirrorsKicker: string;
  mirrorsHeading: string;
  mirrorsLocked: string;
  mirrorsHint: string;
  mirrorsConnect: string;
  mirrorsNoWallet: string;
  mirrorsPaste: string;
  mirrorsOpen: string;
  mirrorsFail: string;
  mirrorsDisconnect: string;
  mirrorsWelcome: (alias: string, level: string) => string;
  bookKicker: string;
  bookHeading: string;
  fragments: Array<{ title: string; latin: string; line: string }>;
  notesKicker: string;
  notesHeading: string;
  notes: string[];
  leakKicker: string;
  leakHeading: string;
  leakBody: string;
  leakClock: string;
  innerHeading: string;
  innerBody: string;
  gatesKicker: string;
  gatesHeading: string;
  gatesRiddle: string;
  gatesHint: string;
  gatesSubmit: string;
  gatesWrong: string;
  gatesOpen: string;
  inviteKicker: string;
  inviteHeading: string;
  inviteBody: string;
  inviteFoot: string;
};

const en: HouseCopy = {
  navManifest: "Manifest",
  navHierarchy: "Hierarchy",
  navMarket: "Vitrine",
  navCurator: "Diary",
  navWall: "Wall",
  navMirrors: "Mirrors",
  navGates: "Gates",
  manifestKicker: "First page",
  manifestHeading: "The Maison does not sell morality. It sells a vacancy.",
  manifesto: [
    "Maison Æternum is a private desk for those who can afford an empty interior. The product is one soul. The proof is an NFT on the chain you paid. The desk never holds the charter.",
    "Liber Animarum — the Book of Souls — has seven living pages. Pride, greed, lust, envy, gluttony, wrath, sloth. Each has a name, an appetite, and a stall. After them stands the dearest laptop of 2026. The ninth stall is empty on purpose.",
    "We do not cleanse you. We remember you. Bitcoin is the private language. Ethereum is the last two. Solana is the first instrument. 888 is luck that refuses to share a table with the merely rich.",
    "Vacancy is the last luxury. Once the soul is gone, the yacht looks honest again.",
  ],
  curatorKicker: "House papers",
  curatorHeading: "Curator’s diary",
  curatorIntro:
    "The curator writes in ink that does not dry. These entries are public. The rest lives behind the mirrors.",
  diary: [
    {
      date: "1666.06.06",
      title: "The desk is open",
      body: "Seven pages, one laptop, one empty stall. The street may look. The street may not turn the page.",
    },
    {
      date: "2026.03.01",
      title: "On the dearest machine",
      body: "A notebook left unlocked is still a confession. If you ever opened that door, the eighth stall already knows your name.",
    },
    {
      date: "2026.10.28",
      title: "On collectors",
      body: "A luxury house does not shout remaining supply. It lets the wall of owners grow quietly, and the mirrors open only for those already inside.",
    },
    {
      date: "2026.11.03",
      title: "On the gates",
      body: "The iron still asks one word. In this language it is both a sentence and an offer. Those who guess it receive an invitation, not a discount.",
    },
  ],
  wallKicker: "Anonymous ledger",
  wallHeading: "Wall of owners",
  wallBody:
    "Names are optional. Addresses are shortened. The level is not. If you bought, you are already on this wall — whether you wished to be seen or not.",
  wallAnonymous: "Anonymous holder",
  wallLevel: "Level",
  wallEmpty: "The wall is still polite. It will not stay so.",
  mirrorsKicker: "Token-gated",
  mirrorsHeading: "The room of mirrors",
  mirrorsLocked:
    "The mirrors do not open for the unpurchased. Connect the wallet that holds a Maison NFT, and the glass will admit you.",
  mirrorsHint:
    "Any acquired charter is a key. 888, the Last Two, and the Laptop open the inner cabinet.",
  mirrorsConnect: "Connect wallet",
  mirrorsNoWallet: "No browser wallet found. Paste the address that received the NFT.",
  mirrorsPaste: "or paste the receiving address",
  mirrorsOpen: "Open the glass",
  mirrorsFail: "This address holds no Maison charter. The glass stays dark.",
  mirrorsDisconnect: "Leave the room",
  mirrorsWelcome: (alias, level) =>
    `${alias}. The glass recognises ${level}. You may turn the pages the street cannot.`,
  bookKicker: "Liber Animarum",
  bookHeading: "Fragments the street is not given",
  fragments: [
    { title: "Velemir", latin: "Superbia", line: "I saw myself — and ceased to see the others." },
    { title: "Kun", latin: "Avaritia", line: "One more handful, and I will finally start spending." },
    { title: "Neveya", latin: "Luxuria", line: "Love sometimes cuts deeper than a knife, and still asks to be listed." },
    { title: "Sheptun", latin: "Invidia", line: "I wanted their candle, not their dark." },
    { title: "Pirozhnik", latin: "Gula", line: "The pool was never hungry. I was." },
    { title: "Razlom", latin: "Ira", line: "I broke the chart so it would look at me." },
    { title: "Dremota", latin: "Acedia", line: "I did not sell. I waited until waiting became a product." },
  ],
  notesKicker: "Confidential",
  notesHeading: "Notes of the curator",
  notes: [
    "Do not print remaining supply on the street. Scarcity is a manner, not a banner.",
    "A collector who returns is more expensive to lose than a collector who arrived.",
    "The ninth stall stays empty in public. In the mirrors it already has a working title.",
  ],
  leakKicker: "48 hours early",
  leakHeading: "What the street will hear later",
  leakBody:
    "Working title of stall IX: «The Quiet Listing». It is not for sale. It is not even named outside this room. In forty-eight hours the kicker may change. The stall will still look empty.",
  leakClock: "Public announcement withheld.",
  innerHeading: "Inner cabinet",
  innerBody:
    "You hold a charter the house considers inner: 888, the Last Two, or the Laptop. The curator’s private margin: the next sin will not be a person. It will be a room that remembers who opened it.",
  gatesKicker: "Interactive entrance",
  gatesHeading: "The riddle of the gates",
  gatesRiddle:
    "The desk never raises its voice. It makes one move: it lays a word on the cloth that, in this language, is both a sentence and an offer. Name the word.",
  gatesHint: "One word. Latin is not required. Courtesy is.",
  gatesSubmit: "Speak",
  gatesWrong: "The iron does not move. Try a word that is also a proposal.",
  gatesOpen: "The lock yields. The invitation is below.",
  inviteKicker: "By invitation only",
  inviteHeading: "You may now see the surface of the Shadow.",
  inviteBody:
    "The house does not thank you for guessing. It admits you. Behind this gate: a 1-of-1 surface, a seat at the mirrors once you hold a charter, and the knowledge that vacancy was always the product.",
  inviteFoot: "nihil sine aeternitate · omne est foris · etiam nos ipsi",
};

const ru: HouseCopy = {
  navManifest: "Манифест",
  navHierarchy: "Иерархия",
  navMarket: "Витрина",
  navCurator: "Дневник",
  navWall: "Стена",
  navMirrors: "Зеркала",
  navGates: "Врата",
  manifestKicker: "Первая страница",
  manifestHeading: "Дом не продаёт мораль. Он продаёт вакансию.",
  manifesto: [
    "Maison Æternum — частный стол для тех, кому по карману пустой интерьер. Товар — одна душа. Доказательство — NFT в сети оплаты. Стол грамоту не держит.",
    "Liber Animarum — Книга Душ — семь живых страниц. Гордыня, алчность, похоть, зависть, чревоугодие, гнев, уныние. У каждой — имя, аппетит и стойло. За ними — самый дорогой ноутбук 2026-го. Девятое стойло пусто нарочно.",
    "Мы вас не очищаем. Мы вас помним. Bitcoin — частный язык. Ethereum — последние двое. Solana — первый инструмент. 888 — удача, которая не садится за стол с просто богатыми.",
    "Вакансия — последняя роскошь. Когда душа ушла, яхта снова выглядит честно.",
  ],
  curatorKicker: "Бумаги дома",
  curatorHeading: "Дневник куратора",
  curatorIntro:
    "Куратор пишет чернилами, которые не сохнут. Эти записи публичны. Остальное живёт за зеркалами.",
  diary: [
    {
      date: "1666.06.06",
      title: "Стол открыт",
      body: "Семь страниц, один ноутбук, одно пустое стойло. Улица может смотреть. Улица не может перевернуть страницу.",
    },
    {
      date: "2026.03.01",
      title: "О самой дорогой машине",
      body: "Ноутбук, который не закрыли, — всё ещё исповедь. Если вы когда-то открывали ту дверь, восьмое стойло уже знает ваше имя.",
    },
    {
      date: "2026.10.28",
      title: "О коллекционерах",
      body: "Роскошный дом не кричит об остатке тиража. Он даёт стене владельцев расти тихо, а зеркалам — открываться только для тех, кто уже внутри.",
    },
    {
      date: "2026.11.03",
      title: "О вратах",
      body: "Железо по-прежнему спрашивает одно слово. В этом языке оно и фраза, и оферта. Угадавший получает приглашение, а не скидку.",
    },
  ],
  wallKicker: "Анонимный реестр",
  wallHeading: "Стена владельцев",
  wallBody:
    "Имена необязательны. Адреса укорочены. Уровень — нет. Если вы купили, вы уже на этой стене — хотели вы быть видимы или нет.",
  wallAnonymous: "Анонимный держатель",
  wallLevel: "Уровень",
  wallEmpty: "Стена ещё вежлива. Так не останется.",
  mirrorsKicker: "Token-gated",
  mirrorsHeading: "Комната зеркал",
  mirrorsLocked:
    "Зеркала не открываются некупленным. Подключите кошелёк, в котором лежит NFT Дома, — и стекло вас впустит.",
  mirrorsHint:
    "Любая приобретённая грамота — ключ. 888, Последние двое и Ноутбук открывают внутренний кабинет.",
  mirrorsConnect: "Подключить кошелёк",
  mirrorsNoWallet: "Браузерный кошелёк не найден. Вставьте адрес, на который пришёл NFT.",
  mirrorsPaste: "или вставьте адрес получения NFT",
  mirrorsOpen: "Открыть стекло",
  mirrorsFail: "На этом адресе нет грамоты Дома. Стекло остаётся тёмным.",
  mirrorsDisconnect: "Покинуть комнату",
  mirrorsWelcome: (alias, level) =>
    `${alias}. Стекло узнаёт ${level}. Вам можно листать то, чего улица не получит.`,
  bookKicker: "Liber Animarum",
  bookHeading: "Фрагменты, которых нет на улице",
  fragments: [
    { title: "Велемир", latin: "Superbia", line: "Я видел себя — и перестал видеть остальных." },
    { title: "Кун", latin: "Avaritia", line: "Ещё одна горсть — и я наконец начну тратить." },
    { title: "Невея", latin: "Luxuria", line: "Любовь иногда бьёт сильнее ножа — и всё равно просит листинг." },
    { title: "Шептун", latin: "Invidia", line: "Я хотел их свечу, а не их тьму." },
    { title: "Пирожник", latin: "Gula", line: "Пул никогда не был голоден. Голоден был я." },
    { title: "Разлом", latin: "Ira", line: "Я сломал график, чтобы он на меня посмотрел." },
    { title: "Дремота", latin: "Acedia", line: "Я не продавал. Я ждал, пока ожидание само станет товаром." },
  ],
  notesKicker: "Конфиденциально",
  notesHeading: "Заметки куратора",
  notes: [
    "Не пишите остаток тиража на улице. Дефицит — это манера, не баннер.",
    "Коллекционер, который возвращается, дороже того, который только пришёл.",
    "Девятое стойло на публике пусто. В зеркалах у него уже есть рабочее имя.",
  ],
  leakKicker: "За 48 часов до улицы",
  leakHeading: "То, что улица услышит позже",
  leakBody:
    "Рабочее имя стойла IX: «Тихий листинг». Его нет в продаже. Его нет даже в названии за этой комнатой. Через сорок восемь часов кикер может смениться. Стойло всё равно будет выглядеть пустым.",
  leakClock: "Публичное объявление задержано.",
  innerHeading: "Внутренний кабинет",
  innerBody:
    "У вас грамота, которую дом считает внутренней: 888, Последние двое или Ноутбук. Частная помета куратора: следующий грех будет не человеком. Это будет комната, которая помнит, кто её открыл.",
  gatesKicker: "Интерактивный вход",
  gatesHeading: "Загадка Врат",
  gatesRiddle:
    "Стол никогда не повышает голос. Он делает одно движение: кладёт на сукно слово, которое в этом языке и фраза, и оферта. Назови слово.",
  gatesHint: "Одно слово. Латынь не требуется. Вежливость — да.",
  gatesSubmit: "Произнести",
  gatesWrong: "Железо не двинулось. Попробуйте слово, которое есть и предложение.",
  gatesOpen: "Замок уступил. Приглашение ниже.",
  inviteKicker: "Только по приглашению",
  inviteHeading: "Теперь вам видна поверхность Тени.",
  inviteBody:
    "Дом не благодарит за догадку. Он впускает. За этой калиткой: поверхность 1-of-1, место у зеркал, когда будет грамота, и знание, что товаром всегда была вакансия.",
  inviteFoot: "nihil sine aeternitate · omne est foris · etiam nos ipsi",
};

const zh: HouseCopy = {
  navManifest: "宣言",
  navHierarchy: "层级",
  navMarket: "橱窗",
  navCurator: "日记",
  navWall: "墙",
  navMirrors: "镜室",
  navGates: "门",
  manifestKicker: "第一页",
  manifestHeading: "本宅不卖道德。本宅出卖空位。",
  manifesto: [
    "Maison Æternum 是给得起空洞内室之人的私人柜台。商品是一枚灵魂。凭证是你付款之链上的 NFT。柜台永不持有文书。",
    "Liber Animarum——灵魂之书——七页皆活。骄、贪、淫、妒、饕、怒、怠。各有其名、其欲、其席。其后是 2026 年最贵的笔记本。第九席故意空着。",
    "我们不为你洗涤。我们记住你。Bitcoin 是私密语言。Ethereum 是最后两位。Solana 是第一件器具。888 是不肯与仅仅有钱之人同桌的运气。",
    "空位是最后的奢侈。灵魂一去，游艇看起来才诚实。",
  ],
  curatorKicker: "宅内纸页",
  curatorHeading: "策展人日记",
  curatorIntro: "策展人用不干的墨书写。这些条目公开。其余活在镜后。",
  diary: [
    {
      date: "1666.06.06",
      title: "柜台已开",
      body: "七页、一台笔记本、一席空位。街面可以看。街面不能翻页。",
    },
    {
      date: "2026.03.01",
      title: "关于最贵的机器",
      body: "未上锁的笔记本仍是忏悔。若你曾打开那扇门，第八席已知道你的名字。",
    },
    {
      date: "2026.10.28",
      title: "关于藏家",
      body: "奢侈宅邸不在街上叫剩余供应量。它让主人墙安静生长，镜子只对已经在内的人打开。",
    },
    {
      date: "2026.11.03",
      title: "关于门",
      body: "铁仍只问一个词。在这种语言里，它既是句子，也是要约。猜中者得到邀请，不是折扣。",
    },
  ],
  wallKicker: "匿名账册",
  wallHeading: "主人墙",
  wallBody:
    "名字可选。地址缩短。层级不可省。若你已购，你已在墙上——无论你是否想被看见。",
  wallAnonymous: "匿名持有人",
  wallLevel: "层级",
  wallEmpty: "这面墙仍客气。它不会一直客气。",
  mirrorsKicker: "Token-gated",
  mirrorsHeading: "镜室",
  mirrorsLocked: "未购者，镜不开。连接持有本宅 NFT 的钱包，玻璃才会放行。",
  mirrorsHint: "任何已购文书皆是钥匙。888、最后两位与笔记本打开内室。",
  mirrorsConnect: "连接钱包",
  mirrorsNoWallet: "未发现浏览器钱包。请粘贴收到 NFT 的地址。",
  mirrorsPaste: "或粘贴接收 NFT 的地址",
  mirrorsOpen: "打开玻璃",
  mirrorsFail: "此地址没有本宅文书。玻璃仍暗。",
  mirrorsDisconnect: "离开此室",
  mirrorsWelcome: (alias, level) =>
    `${alias}。玻璃认出 ${level}。你可以翻街面翻不到的页。`,
  bookKicker: "Liber Animarum",
  bookHeading: "街面没有的残页",
  fragments: [
    { title: "韦列米尔", latin: "Superbia", line: "我看见了自己——于是不再看见别人。" },
    { title: "库恩", latin: "Avaritia", line: "再一把，我就终于开始花。" },
    { title: "涅维娅", latin: "Luxuria", line: "爱有时比刀更深，却仍要求上架。" },
    { title: "低语者", latin: "Invidia", line: "我想要的是他们的烛，不是他们的暗。" },
    { title: "糕点师", latin: "Gula", line: "池从不饿。饿的是我。" },
    { title: "裂口", latin: "Ira", line: "我弄断图表，好让它看着我。" },
    { title: "昏眠", latin: "Acedia", line: "我没有卖。我等到等待本身成为商品。" },
  ],
  notesKicker: "机密",
  notesHeading: "策展人批注",
  notes: [
    "不要把剩余供应量印在街上。稀缺是风度，不是横幅。",
    "会回来的藏家，比刚刚抵达的更贵。",
    "第九席在公开处仍空。在镜中它已有工作名。",
  ],
  leakKicker: "早街面四十八小时",
  leakHeading: "街面稍后才会听见的",
  leakBody:
    "第九席工作名：「安静上架」。不出售。甚至不在此室外被命名。四十八小时后口号或将更换。席位看起来仍空。",
  leakClock: "公开宣布延后。",
  innerHeading: "内室",
  innerBody:
    "你持有宅邸视为内层的文书：888、最后两位或笔记本。策展人私注：下一个罪将不是一个人。它将是一间记得谁打开过它的房间。",
  gatesKicker: "交互入口",
  gatesHeading: "门之谜",
  gatesRiddle:
    "柜台从不高声。它只做一件事：把一个词放在台布上——在这种语言里，它既是句子，也是要约。说出这个词。",
  gatesHint: "一个词。不必拉丁。需要礼貌。",
  gatesSubmit: "开口",
  gatesWrong: "铁未动。试一个同时也是提议的词。",
  gatesOpen: "锁让步了。邀请在下方。",
  inviteKicker: "仅凭邀请",
  inviteHeading: "你现在看得见影之表面。",
  inviteBody:
    "宅邸不为猜中道谢。它放行。门后：一枚 1-of-1 的表面、持有文书后镜室的座位，以及——空位从来就是商品。",
  inviteFoot: "nihil sine aeternitate · omne est foris · etiam nos ipsi",
};

const PACKS: Record<Locale, HouseCopy> = { en, ru, zh };

export function useHouseCopy() {
  const { locale } = useI18n();
  return PACKS[locale] ?? en;
}

export function isGateAnswer(raw: string) {
  const value = raw
    .trim()
    .toLowerCase()
    .replace(/[«»""'’.,!?]/g, "");
  return [
    "предложение",
    "предложенье",
    "offer",
    "the offer",
    "proposal",
    "an offer",
    "vacancy",
    "вакансия",
    "提议",
    "报价",
    "要约",
    "句子",
  ].includes(value);
}
