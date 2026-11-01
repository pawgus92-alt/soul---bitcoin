import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Locale = "en" | "ru";

type CopyItem = { title: string; text: string };
type LedgerRow = { city: string; client: string; amount: string };
type Testimonial = { quote: string; name: string; role: string };
type Step = { step: string; title: string; text: string };

export type Copy = {
  documentTitle: string;
  documentDescription: string;
  brand: string;
  deskLine: string;
  navTerms: string;
  navInventory: string;
  navClients: string;
  navContract: string;
  langEn: string;
  langRu: string;
  langSwitch: string;
  badgeInvite: string;
  cities: string[];
  heroTitle: string;
  heroAccent: string;
  heroBody: (usd: string) => string;
  readTerms: string;
  vatLine: string;
  heroAside: string;
  skuLabel: string;
  fetchingRate: string;
  rateDeskSilent: string;
  fetchRateAgain: string;
  skuBulletOne: string;
  skuBulletSettle: (usd: string) => string;
  skuBulletRefund: string;
  skuFoot: (usd: string) => string;
  terms: Step[];
  assetsRetained: string;
  whatYouKeep: string;
  keep: CopyItem[];
  assetsAcquired: string;
  whatWeTake: string;
  take: CopyItem[];
  quietReferences: string;
  clientsHeading: string;
  testimonials: Testimonial[];
  closing: string;
  contractHeading: string;
  contractBody: (usd: string) => string;
  footerDesk: string;
  ledger: LedgerRow[];
  payInBitcoin: string;
  fetchingBitcoinRate: string;
  payAmount: (btc: string) => string;
  sellSoul: string;
  invoiceBadge: string;
  invoiceTitle: string;
  invoiceDescription: (usd: string) => string;
  sellInvoiceBadge: string;
  sellInvoiceTitle: string;
  sellInvoiceDescription: string;
  sellPriceHint: (usd: string) => string;
  askingMarket: string;
  rateDeskSilentDetail: (detail: string) => string;
  amountDue: string;
  spotVia: (source: string) => string;
  bitcoinAddress: string;
  copyAddress: string;
  copiedJacket: string;
  clipboardDeclined: string;
  ledgerName: string;
  ledgerPlaceholder: string;
  acceptTerms: string;
  remainLiving: string;
  sendAmount: (btc: string) => string;
  waitingForRate: string;
  waitForRate: string;
  tickTheBox: string;
  watchingMempool: string;
  settlingHint: (btc: string) => string;
  boughtSoul: string;
  boughtSoulHint: string;
  soldSoul: string;
  soldSoulHint: string;
  acceptSellTerms: string;
  printCertificate: string;
  returnToSociety: string;
  anonymousHolder: string;
  nftReceiveLabel: string;
  nftReceivePlaceholder: string;
  nftReceiveHint: string;
  invalidReceiveAddress: string;
  certNft: string;
  certNftPending: string;
  certNftInscribing: string;
  certNftMinted: string;
  certNftFailed: string;
  certViewOrdinal: string;
  certViewOrder: string;
  nftPostageTitle: string;
  nftPostageHint: string;
  nftRetry: string;
  copySerial: string;
  copiedSerial: string;
  mintingNft: string;
  certKicker: string;
  certTitle: string;
  certSubtitle: string;
  certCertify: string;
  certHasPurchased: string;
  certHasSold: string;
  certOneSoul: string;
  certVeryRich: string;
  certHalfBitcoin: string;
  certProof: string;
  certSellProof: string;
  certSellSubtitle: string;
  certNo: string;
  certPaid: string;
  certIssued: string;
  dateLocale: string;
};

const en: Copy = {
  documentTitle: "Maison Æternum — Sell the soul for $100,000 in Bitcoin",
  documentDescription:
    "Private soul desk. One soul for $100,000, paid in Bitcoin at the live spot rate. VAT is not charged, because eternity has no jurisdiction.",
  brand: "Maison Æternum",
  deskLine: "Private Soul Desk · Est. 1666",
  navTerms: "Terms",
  navInventory: "Inventory",
  navClients: "Clients",
  navContract: "Contract",
  langEn: "EN",
  langRu: "RU",
  langSwitch: "Language",
  badgeInvite: "By invitation, then by invoice",
  cities: ["Geneva", "London", "Dubai", "Moscow", "Nassau"],
  heroTitle: "Sell the soul.",
  heroAccent: "Keep the yacht.",
  heroBody: (usd) =>
    `${usd} at the live Bitcoin spot rate. We do not negotiate, we take no percentage, and we do not ask why the boardroom air got lighter.`,
  readTerms: "Read the terms",
  vatLine: "VAT is not charged, because eternity has no jurisdiction.",
  heroAside:
    "Wire transfers remain for people who still believe in states. Cash smells of morals. Bitcoin at the spot rate is the only decent language in this room.",
  skuLabel: "The only SKU",
  fetchingRate: "Fetching the live Bitcoin rate…",
  rateDeskSilent: "The rate desk is silent.",
  fetchRateAgain: "Fetch the rate again",
  skuBulletOne: "One soul. No instalments. No family package.",
  skuBulletSettle: (usd) =>
    `Settlement is ${usd} converted at the live BTC/USD spot rate.`,
  skuBulletRefund: "No refunds. Remorse is a separate, overpriced product.",
  skuFoot: (usd) =>
    `We do not acquire middle-class souls. If you need to check whether ${usd} is affordable, you are early. Return after the first fund.`,
  terms: [
    {
      step: "01",
      title: "Name yourself",
      text: "A name, a family office, or a hull number. Discretion is kept as carefully as your offshore papers.",
    },
    {
      step: "02",
      title: "Pay the spot Bitcoin",
      text: "The invoice is $100,000 divided by the live BTC price. One transfer, one hash, one eternity.",
    },
    {
      step: "03",
      title: "Receive the Bitcoin NFT",
      text: "A unique certificate code, inscribed on Bitcoin as an Ordinal. Keep it beside the second passport.",
    },
  ],
  assetsRetained: "Assets retained",
  whatYouKeep: "What you keep",
  keep: [
    {
      title: "The yacht, the house, the third surname",
      text: "Property stays with you. We only collect what never appears on a balance sheet.",
    },
    {
      title: "The Davos seat",
      text: "Panels on sustainability sound cleaner once the interior is vacant.",
    },
    {
      title: "The ability to sleep",
      text: "Clients report a deep, expensive sleep. The kind that follows a successful delisting.",
    },
  ],
  assetsAcquired: "Assets acquired",
  whatWeTake: "What we take",
  take: [
    {
      title: "The last remainder of embarrassment",
      text: "You will no longer apologize for optimization. Optimization becomes the character.",
    },
    {
      title: "The urge to explain yourself",
      text: "Communications will speak. You will look into the camera like a person without a tail.",
    },
    {
      title: "Interest in meaning",
      text: "If meaning cannot be capitalized, it leaves the portfolio with the soul.",
    },
  ],
  quietReferences: "Quiet references",
  clientsHeading: "Clients who cannot be named aloud",
  testimonials: [
    {
      quote:
        "Cheaper than a London divorce and quieter than a Swiss trust. Book it before the first hearing.",
      name: "K.",
      role: "Family office, Mayfair",
    },
    {
      quote:
        "Sold before the IPO. The covenants got shorter. The roadshow smile got longer.",
      name: "Anonymous",
      role: "Nassau, via nominee",
    },
    {
      quote:
        "My wife still thinks I merely optimized taxes. Technically, she is correct.",
      name: "Private client",
      role: "Courchevel, chalet 14",
    },
  ],
  closing: "Closing",
  contractHeading: "A contract for one eternity",
  contractBody: (usd) =>
    `You are not buying salvation. You are selling the one thing that cannot be shown to guests on the boat. The price is ${usd}, paid in bitcoin at the live spot rate.`,
  footerDesk: "Maison Æternum · Private Acquisition Desk · Est. 1666",
  ledger: [
    { city: "Geneva", client: "Family office", amount: "Spot BTC" },
    { city: "Mayfair", client: "Anonymous", amount: "Spot BTC" },
    { city: "Dubai", client: "Yacht desk", amount: "Spot BTC" },
    { city: "Moscow", client: "Private", amount: "Spot BTC" },
    { city: "Courchevel", client: "Chalet 14", amount: "Spot BTC" },
    { city: "Nassau", client: "Trust", amount: "Spot BTC" },
  ],
  payInBitcoin: "Buy",
  fetchingBitcoinRate: "Fetching Bitcoin rate",
  payAmount: (btc) => `Buy ${btc}`,
  sellSoul: "Sell soul · 0.5 BTC",
  invoiceBadge: "Live Bitcoin invoice",
  invoiceTitle: "Buy in Bitcoin",
  invoiceDescription: (usd) =>
    `One soul is ${usd}. Settlement is the live BTC amount at the current spot rate, sent to the desk wallet.`,
  sellInvoiceBadge: "Half-bitcoin window",
  sellInvoiceTitle: "Sell the soul",
  sellInvoiceDescription:
    "The desk takes the soul for a flat half bitcoin. One transfer, one vacancy, no debate about the spot.",
  sellPriceHint: (usd) => `0.5 BTC · about ${usd} at the live spot`,
  askingMarket: "Asking the market what a soul costs this minute.",
  rateDeskSilentDetail: (detail) => `The rate desk is silent. ${detail}`,
  amountDue: "Amount due",
  spotVia: (source) => `Spot via ${source}`,
  bitcoinAddress: "Bitcoin address",
  copyAddress: "Copy Bitcoin address",
  copiedJacket: "Copied to the dinner jacket.",
  clipboardDeclined:
    "The clipboard declined. Copy the address by hand, as good families do.",
  ledgerName: "Name in the ledger",
  ledgerPlaceholder: "Anonymous / family office / yacht Elena",
  acceptTerms:
    "I understand the soul leaves without repurchase rights. Remorse is a separate product from $2.4M, and it will not be in stock.",
  remainLiving: "Remain among the living",
  sendAmount: (btc) => `Send ${btc}`,
  waitingForRate: "Waiting for the rate",
  waitForRate: "Wait for the live Bitcoin rate before sending.",
  tickTheBox: "Tick the box. A soul does not leave on a verbal instruction.",
  watchingMempool: "Inscribing the certificate",
  settlingHint: (btc) =>
    `Assigning a unique code and opening a Bitcoin Ordinal NFT for ${btc}. Do not close the tab while the hash is still warm.`,
  boughtSoul: "You bought one soul",
  boughtSoulHint:
    "The certificate has a unique code and is minted as a Bitcoin Ordinal NFT. Hang this where the guests can see it and the tax office cannot.",
  soldSoul: "You sold one soul",
  soldSoulHint:
    "Half a bitcoin, a unique code, and a Bitcoin Ordinal NFT. Keep the certificate away from the chaplain.",
  acceptSellTerms:
    "I understand the soul is sold for 0.5 BTC without repurchase rights. Remorse is still not in stock.",
  printCertificate: "Print certificate",
  returnToSociety: "Return to society",
  anonymousHolder: "Anonymous Collector",
  nftReceiveLabel: "Bitcoin address for the NFT",
  nftReceivePlaceholder: "bc1p… taproot preferred",
  nftReceiveHint:
    "The certificate is inscribed as a Bitcoin Ordinal and sent here. Leave empty and the desk holds the NFT against the unique code.",
  invalidReceiveAddress:
    "That is not a Bitcoin address. Use bc1… or leave the field empty.",
  certNft: "Bitcoin NFT",
  certNftPending: "Awaiting inscription postage",
  certNftInscribing: "Inscribing on Bitcoin",
  certNftMinted: "Inscribed on Bitcoin",
  certNftFailed: "Unique code issued · mint desk silent",
  certViewOrdinal: "View inscription",
  certViewOrder: "View mint order",
  nftPostageTitle: "NFT inscription postage",
  nftPostageHint:
    "This small Bitcoin payment inscribes the unique certificate as an Ordinal NFT and sends it to the receive address.",
  nftRetry: "Open the mint again",
  copySerial: "Copy unique code",
  copiedSerial: "Unique code copied.",
  mintingNft: "Minting the Bitcoin NFT…",
  certKicker: "Maison Æternum · Geneva",
  certTitle: "Certificate",
  certSubtitle: "of Soul Acquisition",
  certCertify: "This is to certify that",
  certHasPurchased: "has purchased",
  certHasSold: "has sold",
  certOneSoul: "ONE SOUL",
  certVeryRich: "and is therefore very rich.",
  certHalfBitcoin: "for half a bitcoin.",
  certProof:
    "Ordinary people do not settle eternity in Bitcoin. This document is proof of surplus, taste, and a dangerously empty interior.",
  certSellProof:
    "Ordinary people do not sell eternity for half a coin. This document is proof of speed, taste, and a lighter boarding pass.",
  certSellSubtitle: "of Soul Disposal",
  certNo: "No.",
  certPaid: "Paid",
  certIssued: "Issued",
  dateLocale: "en-GB",
};

const ru: Copy = {
  documentTitle: "Maison Æternum — Продать душу за $100 000 в Bitcoin",
  documentDescription:
    "Частный стол душ. Одна душа за $100 000, оплата Bitcoin по живому спот-курсу. НДС не начисляется: у вечности нет юрисдикции.",
  brand: "Maison Æternum",
  deskLine: "Частный стол душ · Est. 1666",
  navTerms: "Условия",
  navInventory: "Инвентарь",
  navClients: "Клиенты",
  navContract: "Контракт",
  langEn: "EN",
  langRu: "RU",
  langSwitch: "Язык",
  badgeInvite: "Сначала приглашение, затем счёт",
  cities: ["Женева", "Лондон", "Дубай", "Москва", "Нассау"],
  heroTitle: "Продайте душу.",
  heroAccent: "Оставьте яхту.",
  heroBody: (usd) =>
    `${usd} по живому спот-курсу Bitcoin. Мы не торгуемся, процента не берём и не спрашиваем, почему в зале совета вдруг стало легче.`,
  readTerms: "Читать условия",
  vatLine: "НДС не начисляется: у вечности нет юрисдикции.",
  heroAside:
    "Проводки остаются для тех, кто ещё верит в государства. Наличные пахнут моралью. Bitcoin по споту — единственный приличный язык в этой комнате.",
  skuLabel: "Единственный SKU",
  fetchingRate: "Запрашиваем живой курс Bitcoin…",
  rateDeskSilent: "Стол котировок молчит.",
  fetchRateAgain: "Запросить курс снова",
  skuBulletOne: "Одна душа. Без рассрочки. Без семейного пакета.",
  skuBulletSettle: (usd) =>
    `Расчёт — ${usd}, конвертированные по живому спот-курсу BTC/USD.`,
  skuBulletRefund: "Возвратов нет. Раскаяние — отдельный, чрезмерно дорогой продукт.",
  skuFoot: (usd) =>
    `Средний класс мы не берём. Если нужно проверять, по карману ли ${usd}, вы рано. Вернитесь после первого фонда.`,
  terms: [
    {
      step: "01",
      title: "Назовите себя",
      text: "Имя, family office или бортовой номер. Дискретность хранится так же тщательно, как офшорные бумаги.",
    },
    {
      step: "02",
      title: "Оплатите Bitcoin по споту",
      text: "Счёт — $100 000, делённые на живую цену BTC. Один перевод, один хеш, одна вечность.",
    },
    {
      step: "03",
      title: "Получите Bitcoin NFT",
      text: "Уникальный код сертификата, вписанный в Bitcoin как Ordinal. Держите его рядом со вторым паспортом.",
    },
  ],
  assetsRetained: "Оставленные активы",
  whatYouKeep: "Что остаётся вам",
  keep: [
    {
      title: "Яхта, дом, третья фамилия",
      text: "Имущество остаётся вам. Мы забираем только то, чего нет в балансе.",
    },
    {
      title: "Место в Давосе",
      text: "Доклады про устойчивость звучат чище, когда внутри уже пусто.",
    },
    {
      title: "Способность спать",
      text: "Клиенты описывают глубокий, дорогой сон. Такой бывает после успешного делистинга.",
    },
  ],
  assetsAcquired: "Приобретённые активы",
  whatWeTake: "Что забираем мы",
  take: [
    {
      title: "Последний остаток смущения",
      text: "Вы больше не будете извиняться за оптимизацию. Оптимизация станет характером.",
    },
    {
      title: "Потребность объясняться",
      text: "За вас будут говорить коммуникации. Вы посмотрите в камеру как человек без хвоста.",
    },
    {
      title: "Интерес к смыслу",
      text: "Если смысл нельзя капитализировать, он уходит из портфеля вместе с душой.",
    },
  ],
  quietReferences: "Тихие рекомендации",
  clientsHeading: "Клиенты, которых нельзя называть вслух",
  testimonials: [
    {
      quote:
        "Дешевле лондонского развода и тише швейцарского траста. Бронируйте до первого слушания.",
      name: "K.",
      role: "Family office, Мэйфер",
    },
    {
      quote:
        "Продал до IPO. Ковенанты стали короче. Улыбка на роудшоу — длиннее.",
      name: "Аноним",
      role: "Нассау, через номинала",
    },
    {
      quote:
        "Жена всё ещё думает, что я всего лишь оптимизировал налоги. Технически она права.",
      name: "Частный клиент",
      role: "Куршевель, шале 14",
    },
  ],
  closing: "Закрытие",
  contractHeading: "Контракт на одну вечность",
  contractBody: (usd) =>
    `Вы не покупаете спасение. Вы продаёте единственное, что нельзя показать гостям на палубе. Цена — ${usd}, оплата bitcoin по живому споту.`,
  footerDesk: "Maison Æternum · Частный стол приобретений · Est. 1666",
  ledger: [
    { city: "Женева", client: "Family office", amount: "Spot BTC" },
    { city: "Мэйфер", client: "Аноним", amount: "Spot BTC" },
    { city: "Дубай", client: "Яхтенный стол", amount: "Spot BTC" },
    { city: "Москва", client: "Частный", amount: "Spot BTC" },
    { city: "Куршевель", client: "Шале 14", amount: "Spot BTC" },
    { city: "Нассау", client: "Траст", amount: "Spot BTC" },
  ],
  payInBitcoin: "Купить",
  fetchingBitcoinRate: "Запрашиваем курс Bitcoin",
  payAmount: (btc) => `Купить ${btc}`,
  sellSoul: "Продать душу · 0.5 BTC",
  invoiceBadge: "Живой счёт в Bitcoin",
  invoiceTitle: "Купить за Bitcoin",
  invoiceDescription: (usd) =>
    `Одна душа стоит ${usd}. К оплате — живая сумма BTC по текущему споту, на кошелёк стола.`,
  sellInvoiceBadge: "Окно полбиткоина",
  sellInvoiceTitle: "Продать душу",
  sellInvoiceDescription:
    "Стол берёт душу за ровно полбиткоина. Один перевод, одна вакансия, без спора про спот.",
  sellPriceHint: (usd) => `0.5 BTC · около ${usd} по живому споту`,
  askingMarket: "Спрашиваем рынок, сколько стоит душа в эту минуту.",
  rateDeskSilentDetail: (detail) => `Стол котировок молчит. ${detail}`,
  amountDue: "К оплате",
  spotVia: (source) => `Спот через ${source}`,
  bitcoinAddress: "Адрес Bitcoin",
  copyAddress: "Скопировать адрес Bitcoin",
  copiedJacket: "Скопировано во внутренний карман смокинга.",
  clipboardDeclined:
    "Буфер обмена отказал. Скопируйте адрес вручную, как делают приличные семьи.",
  ledgerName: "Имя в книге",
  ledgerPlaceholder: "Аноним / family office / яхта Elena",
  acceptTerms:
    "Я понимаю: душа уходит без права выкупа. Раскаяние — отдельный продукт от $2,4 млн, и его не будет в наличии.",
  remainLiving: "Остаться среди живых",
  sendAmount: (btc) => `Отправить ${btc}`,
  waitingForRate: "Ждём курс",
  waitForRate: "Дождитесь живого курса Bitcoin, прежде чем отправлять.",
  tickTheBox: "Поставьте галочку. Душа не уходит по устной инструкции.",
  watchingMempool: "Вписываем сертификат",
  settlingHint: (btc) =>
    `Выдаём уникальный код и открываем Bitcoin Ordinal NFT на ${btc}. Не закрывайте вкладку, пока хеш ещё тёплый.`,
  boughtSoul: "Вы купили одну душу",
  boughtSoulHint:
    "У сертификата уникальный код, он чеканится как Bitcoin Ordinal NFT. Повесьте это там, где гости увидят, а налоговая — нет.",
  soldSoul: "Вы продали одну душу",
  soldSoulHint:
    "Полбиткоина, уникальный код и Bitcoin Ordinal NFT. Сертификат держите подальше от капеллана.",
  acceptSellTerms:
    "Я понимаю: душа продаётся за 0.5 BTC без права выкупа. Раскаяния по-прежнему нет в наличии.",
  printCertificate: "Печать сертификата",
  returnToSociety: "Вернуться в общество",
  anonymousHolder: "Анонимный коллекционер",
  nftReceiveLabel: "Адрес Bitcoin для NFT",
  nftReceivePlaceholder: "bc1p… лучше taproot",
  nftReceiveHint:
    "Сертификат вписывается как Bitcoin Ordinal и уходит сюда. Оставьте пустым — стол будет держать NFT против уникального кода.",
  invalidReceiveAddress:
    "Это не адрес Bitcoin. Укажите bc1… или оставьте поле пустым.",
  certNft: "Bitcoin NFT",
  certNftPending: "Ждём комиссию за надпись",
  certNftInscribing: "Вписывается в Bitcoin",
  certNftMinted: "Вписан в Bitcoin",
  certNftFailed: "Уникальный код выдан · стол чеканки молчит",
  certViewOrdinal: "Открыть надпись",
  certViewOrder: "Открыть заказ чеканки",
  nftPostageTitle: "Комиссия за NFT-надпись",
  nftPostageHint:
    "Этот небольшой платёж в Bitcoin вписывает уникальный сертификат как Ordinal NFT и отправляет его на адрес получения.",
  nftRetry: "Открыть чеканку снова",
  copySerial: "Скопировать уникальный код",
  copiedSerial: "Уникальный код скопирован.",
  mintingNft: "Чеканим Bitcoin NFT…",
  certKicker: "Maison Æternum · Женева",
  certTitle: "Сертификат",
  certSubtitle: "приобретения души",
  certCertify: "Настоящим удостоверяется, что",
  certHasPurchased: "приобрёл(а)",
  certHasSold: "продал(а)",
  certOneSoul: "ОДНУ ДУШУ",
  certVeryRich: "и потому очень богат.",
  certHalfBitcoin: "за полбиткоина.",
  certProof:
    "Обычные люди не рассчитываются с вечностью в Bitcoin. Этот документ — доказательство избытка, вкуса и опасно пустого нутра.",
  certSellProof:
    "Обычные люди не продают вечность за полмонеты. Этот документ — доказательство скорости, вкуса и более лёгкого посадочного.",
  certSellSubtitle: "отчуждения души",
  certNo: "№",
  certPaid: "Оплачено",
  certIssued: "Выдано",
  dateLocale: "ru-RU",
};

const dictionaries: Record<Locale, Copy> = { en, ru };
const STORAGE_KEY = "maison-locale";

function isLocale(value: string | null): value is Locale {
  return value === "en" || value === "ru";
}

function detectLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (isLocale(saved)) return saved;
  const language = window.navigator.language.toLowerCase();
  return language.startsWith("ru") ? "ru" : "en";
}

type LocaleState = {
  locale: Locale;
  copy: Copy;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleState | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => detectLocale());

  useEffect(() => {
    document.documentElement.lang = locale;
    const copy = dictionaries[locale];
    document.title = copy.documentTitle;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", copy.documentDescription);
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const value = useMemo(
    () => ({ locale, copy: dictionaries[locale], setLocale }),
    [locale, setLocale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useI18n must be used inside LocaleProvider");
  }
  return context;
}
