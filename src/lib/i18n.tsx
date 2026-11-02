import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { NftChain } from "@/lib/deal";

export type Locale = "en" | "ru";

type CopyItem = { title: string; text: string };
type LedgerRow = { city: string; client: string; amount: string };
type Testimonial = { quote: string; name: string; role: string };
type Step = { step: string; title: string; text: string };
export type SinDegreeCopy = {
  degree: number;
  title: string;
  kicker: string;
  text: string;
  reserved?: boolean;
};

export type Copy = {
  documentTitle: string;
  documentDescription: string;
  brand: string;
  deskLine: string;
  navTerms: string;
  navInventory: string;
  navClients: string;
  navContract: string;
  navCleanse: string;
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
  skuBulletEth: (usd: string) => string;
  skuBulletNft: string;
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
  buySol: string;
  buyPearl: string;
  cleanseSoul: string;
  buyEth: string;
  fetchingEthRate: string;
  payEthAmount: (eth: string) => string;
  midClassLabel: string;
  midClassHint: string;
  nftCapsLine: string;
  nftRemaining: (remaining: number, max: number, chain: NftChain) => string;
  nftSoldOut: string;
  invoiceBadge: string;
  invoiceTitle: string;
  invoiceDescription: (usd: string) => string;
  sellInvoiceBadge: string;
  sellInvoiceTitle: string;
  sellInvoiceDescription: string;
  sellPriceHint: (usd: string) => string;
  solInvoiceBadge: string;
  solInvoiceTitle: string;
  solInvoiceDescription: string;
  pearlInvoiceBadge: string;
  pearlInvoiceTitle: string;
  pearlInvoiceDescription: string;
  cleanseInvoiceBadge: string;
  cleanseInvoiceTitle: string;
  cleanseInvoiceDescription: string;
  cleanseKicker: string;
  cleanseHeading: string;
  cleanseBody: string;
  cleansePickTitle: string;
  cleansePickDescription: string;
  cleanseContinue: string;
  cleanseReserved: string;
  cleanseAcceptTerms: string;
  cleansedSoul: string;
  cleansedSoulHint: string;
  sinDegrees: SinDegreeCopy[];
  ethInvoiceBadge: string;
  ethInvoiceTitle: string;
  ethInvoiceDescription: (usd: string) => string;
  askingMarket: string;
  rateDeskSilentDetail: (detail: string) => string;
  amountDue: string;
  spotVia: (source: string) => string;
  bitcoinAddress: string;
  ethereumAddress: string;
  payAddress: string;
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
  watchingChain: string;
  paymentWaiting: string;
  paymentSeen: string;
  receivedOf: (received: string, expected: string) => string;
  viewPayment: string;
  settlingHint: (btc: string) => string;
  boughtSoul: string;
  boughtSoulHint: string;
  soldSoul: string;
  soldSoulHint: string;
  acceptSellTerms: string;
  printCertificate: string;
  returnToSociety: string;
  anonymousHolder: string;
  nftReceiveLabel: (chain: NftChain) => string;
  nftReceivePlaceholder: (chain: NftChain) => string;
  nftReceiveHint: (chain: NftChain) => string;
  invalidReceiveAddress: (chain: NftChain) => string;
  certNft: (chain: NftChain) => string;
  certEdition: (edition: number, max: number) => string;
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
  certSolSubtitle: string;
  certPearlSubtitle: string;
  certTenSol: string;
  certPearlPaid: string;
  certEthPaid: string;
  certEthSubtitle: string;
  certCleanseSubtitle: string;
  certCleansePaid: string;
  certCleanseProof: string;
  certHasCleansed: string;
  certOneSin: string;
  certMidProof: string;
  certNo: string;
  certPaid: string;
  certIssued: string;
  certTx: string;
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
  navCleanse: "Cleansing",
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
  skuLabel: "Private SKU",
  fetchingRate: "Fetching the live Bitcoin rate…",
  rateDeskSilent: "The rate desk is silent.",
  fetchRateAgain: "Fetch the rate again",
  skuBulletOne: "One soul. No instalments. No family package.",
  skuBulletSettle: (usd) =>
    `Settlement is ${usd} converted at the live BTC/USD spot rate.`,
  skuBulletEth: (usd) =>
    `The same ${usd} may be paid in Ethereum at the live ETH spot. Fifty inner NFTs, no more.`,
  skuBulletNft:
    "Bitcoin Ordinal NFTs: 25. Solana NFTs: 250. Ethereum inner NFTs: 50.",
  skuBulletRefund: "No refunds. Remorse is a separate, overpriced product.",
  skuFoot: (usd) =>
    `The private desk is ${usd} in Bitcoin (25 Ordinals) or ${usd} in Ethereum (50 inner NFTs). The middle desk takes 10 SOL on Solana (250 NFTs), including the washing of ignoble crypto sins.`,
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
      title: "Receive the chain NFT",
      text: "A unique certificate code. Bitcoin desk: Ordinal, 25 pieces. Solana desk: Solana NFT, 250 pieces. Ethereum desk: inner NFT, 50 pieces.",
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
  buySol: "Middle class · 10 SOL",
  buyPearl: "Middle class · 650 PEARL",
  cleanseSoul: "Cleanse the soul",
  buyEth: "Buy · ETH",
  fetchingEthRate: "Fetching Ethereum rate",
  payEthAmount: (eth) => `Buy ${eth}`,
  midClassLabel: "Middle desk",
  midClassHint:
    "For households that have Solana, but not yet a family office. Ignoble crypto sins are washed at the same desk, in six degrees.",
  nftCapsLine: "Bitcoin 25 · Solana 250 · ETH inner 50",
  nftRemaining: (remaining, max, chain) =>
    chain === "solana"
      ? `Solana NFT ${remaining} of ${max} remaining`
      : chain === "ethereum"
        ? `ETH inner NFT ${remaining} of ${max} remaining`
        : `Bitcoin Ordinal ${remaining} of ${max} remaining`,
  nftSoldOut: "This NFT edition is sold out. The soul will have to wait.",
  invoiceBadge: "Live Bitcoin invoice",
  invoiceTitle: "Buy in Bitcoin",
  invoiceDescription: (usd) =>
    `One soul is ${usd}. Settlement is the live BTC amount at the current spot rate, sent to the desk wallet.`,
  sellInvoiceBadge: "Half-bitcoin window",
  sellInvoiceTitle: "Sell the soul",
  sellInvoiceDescription:
    "The desk takes the soul for a flat half bitcoin. One transfer, one vacancy, no debate about the spot.",
  sellPriceHint: (usd) => `0.5 BTC · about ${usd} at the live spot`,
  solInvoiceBadge: "Middle desk · Solana",
  solInvoiceTitle: "Buy with 10 SOL",
  solInvoiceDescription:
    "The middle desk takes one soul for ten Solana, sent to the Solana address. The certificate is a Solana NFT, limited to 250.",
  pearlInvoiceBadge: "Middle desk · Pearl",
  pearlInvoiceTitle: "Buy with 650 PEARL",
  pearlInvoiceDescription:
    "The middle desk takes one soul for 650 PEARL on Solana. Same vacancy, quieter lighting, Solana NFT certificate, limited to 250.",
  cleanseInvoiceBadge: "Cleansing desk · Solana",
  cleanseInvoiceTitle: "Wash an ignoble crypto sin",
  cleanseInvoiceDescription:
    "Ten Solana to the desk wallet. A Solana NFT certificate names the degree of the sin. Degree six is empty on purpose.",
  cleanseKicker: "Cleansing desk",
  cleanseHeading: "Cleanse the soul",
  cleanseBody:
    "For ignoble sins of the crypto world. Six degrees. The sixth is vacant, reserved for a future disgrace the market has not yet invented.",
  cleansePickTitle: "Name the degree",
  cleansePickDescription:
    "The youth starts at one. Binance sits at five. The Party may be proud. Other people, less so.",
  cleanseContinue: "Wash this degree",
  cleanseReserved: "Reserved for a later sin",
  cleanseAcceptTerms:
    "I understand the stain is washed for 10 SOL without a right of repurchase, and that the chain will remember anyway.",
  cleansedSoul: "One ignoble sin, washed",
  cleansedSoulHint:
    "The certificate names the degree. Hang it where the guests can see the hygiene and not the original group chat.",
  sinDegrees: [
    {
      degree: 1,
      title: "The Youth",
      kicker: "Degree I",
      text: "You are still a youth. You did something small and ugly: you shilled a coin in the family chat, you told your aunt the dip was healthy, you forwarded a screenshot you were not meant to have. The sin is junior. The stain is already on the jacket.",
    },
    {
      degree: 2,
      title: "The Acolyte",
      kicker: "Degree II",
      text: "You joined a signal channel and called it research. You posted a chart with three indicators and the word “invalidation”. You wrote NFA under advice that was extremely FA. The monastery of Telegram has noticed you, unfortunately.",
    },
    {
      degree: 3,
      title: "Deacon of the Pool",
      kicker: "Degree III",
      text: "You ran a community. You pinned a contract. You wrote “we are early” while you were the exit liquidity with better lighting. People still wave in the street. Their wallets do not.",
    },
    {
      degree: 4,
      title: "Pre-listing",
      kicker: "Degree IV",
      text: "You knew the wallet. You knew the minute. You were not in the screenshot; you were in the explorer. The desk can wash the soul. The chain keeps the minutes, and it does not take confession.",
    },
    {
      degree: 5,
      title: "Binance",
      kicker: "Degree V",
      text: "You did it properly: KYC, VIP, a listing that smelled of a five-year plan. The Party is proud of you. Other people are not very. We will mention Binance only in the footnotes, like a discreet war.",
    },
    {
      degree: 6,
      title: "Reserved",
      kicker: "Degree VI",
      text: "Empty on purpose. When the market invents a worse ignoble sin, the form will be filled. Do not apply. The sixth degree is not for you yet, and that is the only mercy left.",
      reserved: true,
    },
  ],
  ethInvoiceBadge: "Private desk · Ethereum",
  ethInvoiceTitle: "Buy in Ethereum",
  ethInvoiceDescription: (usd) =>
    `One soul is ${usd}. Settlement is the live ETH amount at the current spot rate, sent to the Ethereum desk. Inner NFT, limited to 50.`,
  askingMarket: "Asking the market what a soul costs this minute.",
  rateDeskSilentDetail: (detail) => `The rate desk is silent. ${detail}`,
  amountDue: "Amount due",
  spotVia: (source) => `Spot via ${source}`,
  bitcoinAddress: "Bitcoin address",
  ethereumAddress: "Ethereum address",
  payAddress: "Pay to",
  copyAddress: "Copy address",
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
  waitForRate: "Wait for the live rate before sending.",
  tickTheBox: "Tick the box. A soul does not leave on a verbal instruction.",
  watchingMempool: "Watching the chain",
  watchingChain: "Waiting for the payment to hit the desk wallet.",
  paymentWaiting: "Nothing has arrived yet. Send the invoice, then keep this tab open.",
  paymentSeen: "Payment seen. Issuing the unique NFT certificate.",
  receivedOf: (received, expected) => `Received ${received} of ${expected}`,
  viewPayment: "View payment",
  settlingHint: (btc) =>
    `Send ${btc} to the desk wallet. The certificate is issued only after the chain shows the transfer.`,
  boughtSoul: "You bought one soul",
  boughtSoulHint:
    "The certificate has a unique code and is minted as an NFT on the chain you paid. Hang this where the guests can see it and the tax office cannot.",
  soldSoul: "You sold one soul",
  soldSoulHint:
    "Half a bitcoin, a unique code, and a Bitcoin Ordinal NFT. Keep the certificate away from the chaplain.",
  acceptSellTerms:
    "I understand the soul is sold for 0.5 BTC without repurchase rights. Remorse is still not in stock.",
  printCertificate: "Print certificate",
  returnToSociety: "Return to society",
  anonymousHolder: "Anonymous Collector",
  nftReceiveLabel: (chain) =>
    chain === "solana"
      ? "Solana address for the NFT"
      : chain === "ethereum"
        ? "Ethereum address for the inner NFT"
        : "Bitcoin address for the NFT",
  nftReceivePlaceholder: (chain) =>
    chain === "solana"
      ? "SoL… wallet address"
      : chain === "ethereum"
        ? "0x… Ethereum address"
        : "bc1p… taproot preferred",
  nftReceiveHint: (chain) =>
    chain === "solana"
      ? "The certificate is minted as a Solana NFT and sent here. Leave empty and the desk holds it against the unique code."
      : chain === "ethereum"
        ? "The certificate is minted as an Ethereum inner NFT and sent here. Leave empty and the desk holds it against the unique code."
        : "The certificate is inscribed as a Bitcoin Ordinal and sent here. Leave empty and the desk holds the NFT against the unique code.",
  invalidReceiveAddress: (chain) =>
    chain === "solana"
      ? "That is not a Solana address. Use a Solana wallet or leave the field empty."
      : chain === "ethereum"
        ? "That is not an Ethereum address. Use 0x… or leave the field empty."
        : "That is not a Bitcoin address. Use bc1… or leave the field empty.",
  certNft: (chain) =>
    chain === "solana"
      ? "Solana NFT"
      : chain === "ethereum"
        ? "ETH inner NFT"
        : "Bitcoin NFT",
  certEdition: (edition, max) => `Edition ${edition} / ${max}`,
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
  certSolSubtitle: "of a Middle-Class Soul",
  certPearlSubtitle: "of a Pearl-Desk Soul",
  certTenSol: "paid in ten Solana.",
  certPearlPaid: "paid in 650 PEARL.",
  certEthPaid: "paid in Ethereum.",
  certEthSubtitle: "of a Private Ethereum Soul",
  certCleanseSubtitle: "of an Ignoble Crypto Sin",
  certCleansePaid: "washed in ten Solana.",
  certCleanseProof:
    "Ordinary people do not wash a Telegram sin in public. This document is proof of hygiene, a thinner wallet, and a group chat that should have stayed unread.",
  certHasCleansed: "has had washed",
  certOneSin: "ONE IGNOBLE SIN",
  certMidProof:
    "Ordinary people do not settle eternity in SOL. This document is proof of ambition, a thinner wallet, and the same empty interior.",
  certNo: "No.",
  certPaid: "Paid",
  certIssued: "Issued",
  certTx: "Tx",
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
  navCleanse: "Очищение",
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
  skuLabel: "Частный SKU",
  fetchingRate: "Запрашиваем живой курс Bitcoin…",
  rateDeskSilent: "Стол котировок молчит.",
  fetchRateAgain: "Запросить курс снова",
  skuBulletOne: "Одна душа. Без рассрочки. Без семейного пакета.",
  skuBulletSettle: (usd) =>
    `Расчёт — ${usd}, конвертированные по живому спот-курсу BTC/USD.`,
  skuBulletEth: (usd) =>
    `Те же ${usd} можно оплатить в Ethereum по живому споту ETH. Inner NFT — пятьдесят, не больше.`,
  skuBulletNft:
    "Bitcoin Ordinal NFT: 25. Solana NFT: 250. Ethereum inner NFT: 50.",
  skuBulletRefund: "Возвратов нет. Раскаяние — отдельный, чрезмерно дорогой продукт.",
  skuFoot: (usd) =>
    `Частный стол — ${usd} в Bitcoin (25 Ordinal) или ${usd} в Ethereum (50 inner NFT). Средний стол берёт 10 SOL в Solana (250 NFT), включая отмывание неблагородных криптогрехов.`,
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
      title: "Получите NFT сети",
      text: "Уникальный код сертификата. Стол Bitcoin: Ordinal, 25 штук. Стол Solana: Solana NFT, 250 штук. Стол Ethereum: inner NFT, 50 штук.",
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
  buySol: "Средний класс · 10 SOL",
  buyPearl: "Средний класс · 650 PEARL",
  cleanseSoul: "Очистить душу",
  buyEth: "Купить · ETH",
  fetchingEthRate: "Запрашиваем курс Ethereum",
  payEthAmount: (eth) => `Купить ${eth}`,
  midClassLabel: "Средний стол",
  midClassHint:
    "Для тех, у кого есть Solana, но ещё нет family office. Неблагородные криптогрехи моют за тем же столом, в шести степенях.",
  nftCapsLine: "Bitcoin 25 · Solana 250 · ETH inner 50",
  nftRemaining: (remaining, max, chain) =>
    chain === "solana"
      ? `Solana NFT: осталось ${remaining} из ${max}`
      : chain === "ethereum"
        ? `ETH inner NFT: осталось ${remaining} из ${max}`
        : `Bitcoin Ordinal: осталось ${remaining} из ${max}`,
  nftSoldOut: "Этот тираж NFT распродан. Душе придётся подождать.",
  invoiceBadge: "Живой счёт в Bitcoin",
  invoiceTitle: "Купить за Bitcoin",
  invoiceDescription: (usd) =>
    `Одна душа стоит ${usd}. К оплате — живая сумма BTC по текущему споту, на кошелёк стола.`,
  sellInvoiceBadge: "Окно полбиткоина",
  sellInvoiceTitle: "Продать душу",
  sellInvoiceDescription:
    "Стол берёт душу за ровно полбиткоина. Один перевод, одна вакансия, без спора про спот.",
  sellPriceHint: (usd) => `0.5 BTC · около ${usd} по живому споту`,
  solInvoiceBadge: "Средний стол · Solana",
  solInvoiceTitle: "Купить за 10 SOL",
  solInvoiceDescription:
    "Средний стол берёт одну душу за десять Solana на адрес Solana. Сертификат — Solana NFT, тираж 250.",
  pearlInvoiceBadge: "Средний стол · Pearl",
  pearlInvoiceTitle: "Купить за 650 PEARL",
  pearlInvoiceDescription:
    "Средний стол берёт одну душу за 650 PEARL в сети Solana. Та же вакансия, тише свет, сертификат — Solana NFT, тираж 250.",
  cleanseInvoiceBadge: "Стол очищения · Solana",
  cleanseInvoiceTitle: "Отмыть неблагородный криптогрех",
  cleanseInvoiceDescription:
    "Десять Solana на кошелёк стола. Solana NFT-сертификат назовёт степень греха. Шестая степень нарочно пустая.",
  cleanseKicker: "Стол очищения",
  cleanseHeading: "Очистить душу",
  cleanseBody:
    "За неблагородные грехи криптовалютного мира. Шесть степеней. Шестая вакантна: рынок ещё не изобрёл достаточно стыдное.",
  cleansePickTitle: "Назовите степень",
  cleansePickDescription:
    "Отрок начинается с первой. Binance сидит на пятой. Партия, возможно, гордится. Другие люди — меньше.",
  cleanseContinue: "Отмыть эту степень",
  cleanseReserved: "Зарезервировано под будущий грех",
  cleanseAcceptTerms:
    "Я понимаю: пятно отмывается за 10 SOL без права выкупа, и сеть всё равно всё помнит.",
  cleansedSoul: "Один неблагородный грех отмыт",
  cleansedSoulHint:
    "Сертификат называет степень. Повесьте там, где гости увидят гигиену и не увидят исходный чат.",
  sinDegrees: [
    {
      degree: 1,
      title: "Отрок",
      kicker: "I степень",
      text: "Ты ещё отрок. Сделал плохо: нахвалил монету в семейном чате, сказал тёте, что просадка — это здоровье, переслал скрин, которого у тебя не должно было быть. Грех младший. Пятно на кителе уже есть.",
    },
    {
      degree: 2,
      title: "Послушник",
      kicker: "II степень",
      text: "Ты зашёл в канал сигналов и назвал это ресёрчем. Выложил график с тремя индикаторами и словом «инвалидация». Написал NFA под советом, который был очень даже FA. Монастырь Телеграма тебя заметил. К сожалению.",
    },
    {
      degree: 3,
      title: "Диакон пула",
      kicker: "III степень",
      text: "Ты вёл «комьюнити». Закрепил контракт. Написал «мы рано», хотя ты был выходом с лучшим светом. Люди на улице ещё машут. Их кошельки — нет.",
    },
    {
      degree: 4,
      title: "Предлистинг",
      kicker: "IV степень",
      text: "Ты знал кошелёк. Ты знал минуту. Тебя не было на скрине — ты был в эксплорере. Стол может отмыть душу. Сеть минуты хранит и на исповедь не записывается.",
    },
    {
      degree: 5,
      title: "Binance",
      kicker: "V степень",
      text: "Ты сделал всё по-взрослому: KYC, VIP, листинг с запахом пятилетки. Партия гордится тобой. Другие люди — не очень. Binance в сертификате будет только в сноске, как приличная война.",
    },
    {
      degree: 6,
      title: "Резерв",
      kicker: "VI степень",
      text: "Пустая, нарочно. Когда рынок изобретёт худший неблагородный грех, анкета заполнится. Не подавайте. Шестая степень пока не для вас — и это единственная оставшаяся милость.",
      reserved: true,
    },
  ],
  ethInvoiceBadge: "Частный стол · Ethereum",
  ethInvoiceTitle: "Купить за Ethereum",
  ethInvoiceDescription: (usd) =>
    `Одна душа стоит ${usd}. К оплате — живая сумма ETH по текущему споту, на Ethereum-кошелёк стола. Inner NFT, тираж 50.`,
  askingMarket: "Спрашиваем рынок, сколько стоит душа в эту минуту.",
  rateDeskSilentDetail: (detail) => `Стол котировок молчит. ${detail}`,
  amountDue: "К оплате",
  spotVia: (source) => `Спот через ${source}`,
  bitcoinAddress: "Адрес Bitcoin",
  ethereumAddress: "Адрес Ethereum",
  payAddress: "Куда платить",
  copyAddress: "Скопировать адрес",
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
  waitForRate: "Дождитесь живого курса, прежде чем отправлять.",
  tickTheBox: "Поставьте галочку. Душа не уходит по устной инструкции.",
  watchingMempool: "Смотрим сеть",
  watchingChain: "Ждём, пока платёж дойдёт до кошелька стола.",
  paymentWaiting:
    "Пока ничего не пришло. Отправьте счёт и не закрывайте вкладку.",
  paymentSeen: "Платёж виден. Выдаём уникальный NFT-сертификат.",
  receivedOf: (received, expected) => `Получено ${received} из ${expected}`,
  viewPayment: "Открыть платёж",
  settlingHint: (btc) =>
    `Отправьте ${btc} на кошелёк стола. Сертификат выдаётся только когда сеть покажет перевод.`,
  boughtSoul: "Вы купили одну душу",
  boughtSoulHint:
    "У сертификата уникальный код, он чеканится как NFT в той сети, которой вы оплатили. Повесьте это там, где гости увидят, а налоговая — нет.",
  soldSoul: "Вы продали одну душу",
  soldSoulHint:
    "Полбиткоина, уникальный код и Bitcoin Ordinal NFT. Сертификат держите подальше от капеллана.",
  acceptSellTerms:
    "Я понимаю: душа продаётся за 0.5 BTC без права выкупа. Раскаяния по-прежнему нет в наличии.",
  printCertificate: "Печать сертификата",
  returnToSociety: "Вернуться в общество",
  anonymousHolder: "Анонимный коллекционер",
  nftReceiveLabel: (chain) =>
    chain === "solana"
      ? "Адрес Solana для NFT"
      : chain === "ethereum"
        ? "Адрес Ethereum для inner NFT"
        : "Адрес Bitcoin для NFT",
  nftReceivePlaceholder: (chain) =>
    chain === "solana"
      ? "SoL… адрес кошелька"
      : chain === "ethereum"
        ? "0x… адрес Ethereum"
        : "bc1p… лучше taproot",
  nftReceiveHint: (chain) =>
    chain === "solana"
      ? "Сертификат чеканится как Solana NFT и уходит сюда. Оставьте пустым — стол будет держать его против уникального кода."
      : chain === "ethereum"
        ? "Сертификат чеканится как Ethereum inner NFT и уходит сюда. Оставьте пустым — стол будет держать его против уникального кода."
        : "Сертификат вписывается как Bitcoin Ordinal и уходит сюда. Оставьте пустым — стол будет держать NFT против уникального кода.",
  invalidReceiveAddress: (chain) =>
    chain === "solana"
      ? "Это не адрес Solana. Укажите кошелёк Solana или оставьте поле пустым."
      : chain === "ethereum"
        ? "Это не адрес Ethereum. Укажите 0x… или оставьте поле пустым."
        : "Это не адрес Bitcoin. Укажите bc1… или оставьте поле пустым.",
  certNft: (chain) =>
    chain === "solana"
      ? "Solana NFT"
      : chain === "ethereum"
        ? "ETH inner NFT"
        : "Bitcoin NFT",
  certEdition: (edition, max) => `Тираж ${edition} / ${max}`,
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
  certSolSubtitle: "души среднего класса",
  certPearlSubtitle: "души жемчужного стола",
  certTenSol: "за десять Solana.",
  certPearlPaid: "за 650 PEARL.",
  certEthPaid: "за Ethereum.",
  certEthSubtitle: "души частного Ethereum",
  certCleanseSubtitle: "неблагородного криптогреха",
  certCleansePaid: "отмыто за десять Solana.",
  certCleanseProof:
    "Обычные люди не отмывают телеграм-грех при людях. Этот документ — доказательство гигиены, более тонкого кошелька и чата, который лучше было не читать.",
  certHasCleansed: "отмыл(а)",
  certOneSin: "ОДИН НЕБЛАГОРОДНЫЙ ГРЕХ",
  certMidProof:
    "Обычные люди не рассчитываются с вечностью в SOL. Этот документ — доказательство амбиции, более тонкого кошелька и того же пустого нутра.",
  certNo: "№",
  certPaid: "Оплачено",
  certIssued: "Выдано",
  certTx: "Tx",
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
