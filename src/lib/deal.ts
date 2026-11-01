export const DEAL_USD = 100_000;
export const DEAL_BTC = "1.00000000";
export const BTC_ADDRESS = "bc1qDEMOAETERNUMSOULDESK1666NOTREAL0000";

export const CITIES = ["Geneva", "London", "Dubai", "Moscow", "Nassau"] as const;

export const LEDGER = [
  { city: "Geneva", client: "Family office", amount: "1.00000000 BTC" },
  { city: "Mayfair", client: "Anonymous", amount: "0.99840112 BTC" },
  { city: "Dubai", client: "Yacht desk", amount: "1.00000000 BTC" },
  { city: "Moscow", client: "Private", amount: "1.00000000 BTC" },
  { city: "Courchevel", client: "Chalet 14", amount: "1.02000000 BTC" },
  { city: "Nassau", client: "Trust", amount: "1.00000000 BTC" },
] as const;

export const KEEP = [
  {
    title: "Яхту, дом и третью фамилию",
    text: "Имущество остаётся при вас. Мы интересуемся только тем, что не проходит по балансу.",
  },
  {
    title: "Место в Давосе",
    text: "Панели про устойчивость звучат убедительнее, когда внутри уже пусто.",
  },
  {
    title: "Способность спать",
    text: "Клиенты отмечают глубокий, дорогой сон. Как после успешного делистинга.",
  },
];

export const TAKE = [
  {
    title: "Последний остаток неловкости",
    text: "Больше не придётся извиняться за оптимизацию. Оптимизация станет характером.",
  },
  {
    title: "Желание объясняться",
    text: "Пресс-служба скажет всё сама. Вы будете смотреть в камеру как человек без хвоста.",
  },
  {
    title: "Интерес к смыслу",
    text: "Если смысл нельзя капитализировать, он покидает портфель вместе с душой.",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Дешевле лондонского развода и тише швейцарского траста. Рекомендую до первого слушания.",
    name: "К.",
    role: "Family office, Mayfair",
  },
  {
    quote:
      "Продал до IPO. Ковенанты стали короче, улыбка на roadshow — длиннее.",
    name: "Аноним",
    role: "Нассау, через номинала",
  },
  {
    quote:
      "Жена до сих пор думает, что я просто оптимизировал налоги. Технически она права.",
    name: "Частный клиент",
    role: "Куршевель, шале 14",
  },
];
