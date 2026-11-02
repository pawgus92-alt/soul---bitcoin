import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { zh } from "@/lib/copy-zh";
import type { NftChain } from "@/lib/deal";

export type Locale = "en" | "ru" | "zh";

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
  navFolio: string;
  folioKicker: string;
  folioHeading: string;
  folioBody: string;
  langEn: string;
  langRu: string;
  langZh: string;
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
  skuBulletSol: (usd: string) => string;
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
  solInvoiceDescription: (usd: string) => string;
  pearlInvoiceBadge: string;
  pearlInvoiceTitle: string;
  pearlInvoiceDescription: string;
  cleanseInvoiceBadge: string;
  cleanseInvoiceTitle: string;
  cleanseInvoiceDescription: (amount: string, usd: string) => string;
  cleanseKicker: string;
  cleanseHeading: string;
  cleanseBody: string;
  cleansePickTitle: string;
  cleansePickDescription: string;
  cleanseContinue: string;
  cleanseReserved: string;
  cleanseAcceptTerms: (amount: string) => string;
  cleansedSoul: string;
  cleansedSoulHint: string;
  faSoul: string;
  faKicker: string;
  faHeading: string;
  faBody: string;
  faInvoiceBadge: string;
  faInvoiceTitle: string;
  faInvoiceDescription: (usd: string) => string;
  faAcceptTerms: string;
  faCleansed: string;
  faCleansedHint: string;
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
  nftNotDesk: string;
  nftNeedsBuyerAddress: string;
  nftMintingTo: (address: string) => string;
  nftConfirmBuyer: string;
  needBuyerTitle: string;
  needBuyerHint: string;
  certMintedTo: string;
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
  certFaSubtitle: string;
  certFaPaid: string;
  certFaProof: string;
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
  navFolio: "Folio",
  folioKicker: "The folio",
  folioHeading: "Each NFT is a unique gothic charter.",
  folioBody:
    "Every certificate is drawn as a blackletter diploma: unique parchment grain, rose window, wax sigil and motto, taken from its serial. The same image is inscribed on-chain for the buyer.",
  langEn: "EN",
  langRu: "RU",
  langZh: "中文",
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
  fetchingRate: "Fetching Coinbase spots…",
  rateDeskSilent: "The rate desk is silent.",
  fetchRateAgain: "Fetch the rate again",
  skuBulletOne: "One soul. No instalments. No family package.",
  skuBulletSettle: (usd) =>
    `Settlement is ${usd} converted at the live Coinbase BTC/USD spot.`,
  skuBulletEth: (usd) =>
    `Ethereum desk: 2 ETH at the live Coinbase spot, about ${usd}. Fifty inner NFTs, no more.`,
  skuBulletSol: (usd) =>
    `Solana desk: 10 SOL at the live Coinbase spot, about ${usd}.`,
  skuBulletNft:
    "Bitcoin Ordinal NFTs: 25. Solana NFTs: 250. Ethereum inner NFTs: 50. Each a unique gothic charter.",
  skuBulletRefund: "No refunds. Remorse is a separate, overpriced product.",
  skuFoot: (usd) =>
    `The private desk is ${usd} in Bitcoin at Coinbase (25 Ordinals) or 2 ETH at Coinbase (50 inner NFTs). The middle desk takes 10 SOL at Coinbase for a soul (250 NFTs). Washing ignoble crypto sins starts at 1.5 SOL and climbs to 8.88 SOL at Binance.`,
  terms: [
    {
      step: "01",
      title: "Name yourself",
      text: "A name, a family office, or a hull number. Discretion is kept as carefully as your offshore papers.",
    },
    {
      step: "02",
      title: "Pay the spot Bitcoin",
      text: "The invoice is $100,000 divided by the live Coinbase BTC price — or a flat 2 ETH / 10 SOL at Coinbase. Washing a crypto sin starts at 1.5 SOL and climbs to 8.88 SOL at Binance. One transfer, one hash, one eternity.",
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
  buyEth: "Buy 2 ETH",
  fetchingEthRate: "Fetching Coinbase ETH",
  payEthAmount: (usd) => `Buy 2 ETH · ${usd}`,
  midClassLabel: "Middle desk",
  midClassHint:
    "For households that have Solana, but not yet a family office. Ignoble crypto sins are washed at the same desk: 1.5 SOL at the first degree, then dearer until Binance at 8.88 SOL.",
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
    `One soul is ${usd}. Settlement is the live BTC amount at the Coinbase spot, sent to the desk wallet.`,
  sellInvoiceBadge: "Half-bitcoin window",
  sellInvoiceTitle: "Sell the soul",
  sellInvoiceDescription:
    "The desk takes the soul for a flat half bitcoin. One transfer, one vacancy, no debate about the spot.",
  sellPriceHint: (usd) => `0.5 BTC · about ${usd} at the live spot`,
  solInvoiceBadge: "Middle desk · Solana",
  solInvoiceTitle: "Buy with 10 SOL",
  solInvoiceDescription: (usd) =>
    `The middle desk takes one soul for ten Solana, about ${usd} at the live Coinbase SOL spot. The certificate is a Solana NFT, limited to 250.`,
  pearlInvoiceBadge: "Middle desk · Pearl",
  pearlInvoiceTitle: "Buy with 650 PEARL",
  pearlInvoiceDescription:
    "The middle desk takes one soul for 650 PEARL on Solana. Same vacancy, quieter lighting, Solana NFT certificate, limited to 250.",
  cleanseInvoiceBadge: "Cleansing desk · Solana",
  cleanseInvoiceTitle: "Wash an ignoble crypto sin",
  cleanseInvoiceDescription: (amount, usd) =>
    `${amount} to the desk wallet, about ${usd} at the live Coinbase SOL spot. A Solana NFT certificate names the degree of the sin. Degree six is empty on purpose.`,
  cleanseKicker: "Cleansing desk",
  cleanseHeading: "Cleanse the soul",
  cleanseBody:
    "For ignoble sins of the crypto world — the ones that never make the prospectus, only the group chat. Six degrees, like a little monastery of disgrace. The Youth, degree I, is 1.5 SOL. Each stall after that costs more, until Binance at five: 8.88 SOL. The sixth stall is vacant on purpose: when the market invents a meaner sin, the form will write itself.",
  cleansePickTitle: "Name the degree",
  cleansePickDescription:
    "The youth begins in the family chat at 1.5 SOL. Binance sits in silk at five for 8.88 SOL: six point three billion walked north as a joke, and love still strikes harder than a knife. The Party may hang a medal. Other people, quietly, will not.",
  cleanseContinue: "Wash this degree",
  cleanseReserved: "Reserved for a later sin",
  cleanseAcceptTerms: (amount) =>
    `I understand the stain is washed for ${amount} without a right of repurchase, and that the chain will remember anyway.`,
  cleansedSoul: "One ignoble sin, washed",
  cleansedSoulHint:
    "The certificate names the degree. Hang it where the guests can see the hygiene and not the original group chat.",
  faSoul: "888 · Complete cleansing",
  faKicker: "Chinese desk · 发发发",
  faHeading: "Three eights",
  faBody:
    "A complete washing: every ignoble crypto sin, and the unluck that clung to them. In the Chinese branch the three eights mean prosper, grow rich, grow richer — 发发发. Paid in 8.88 SOL at the Coinbase spot, minted as a unique gothic NFT to the buyer.",
  faInvoiceBadge: "发发发 · 888",
  faInvoiceTitle: "Complete cleansing · 8.88 SOL",
  faInvoiceDescription: (usd) =>
    `Eight point eighty-eight Solana — three eights — about ${usd} at the live Coinbase SOL spot. The certificate washes the whole ledger of crypto sins and misfortune, not a single degree.`,
  faAcceptTerms:
    "I understand this is a complete cleansing for 8.88 SOL, without repurchase, and that 发发发 is a blessing the chain will still remember.",
  faCleansed: "发发发 · washed clean",
  faCleansedHint:
    "All ignoble crypto sins, and the unluck beside them. Hang the gothic charter where fortune can see the three eights.",
  sinDegrees: [
    {
      degree: 1,
      title: "The Youth",
      kicker: "Degree I",
      text: "You are still a youth: the sin is slight, like a first glass, and already it marks the jacket. In the family chat you called a coin an opportunity; you told your aunt the dip was health; you forwarded a stranger’s screenshot as if it were your own luck. A junior rank. An older stain.",
    },
    {
      degree: 2,
      title: "The Acolyte",
      kicker: "Degree II",
      text: "You put on the habit of research, and under it sat a signal channel. Three indicators, the word “invalidation,” and NFA beneath advice that was the most FA in the room. The monastery of Telegram has written you into the synodikon. Unfortunately, in ink.",
    },
    {
      degree: 3,
      title: "Deacon of the Pool",
      kicker: "Degree III",
      text: "You kept a community as if it were a pulpit. The contract was pinned, “we are early” was sung from the ambo — and you were the exit, only your lighting was kinder. People still bow in the street. Their wallets have already said amen.",
    },
    {
      degree: 4,
      title: "Pre-listing",
      kicker: "Degree IV",
      text: "You knew the wallet and you knew the minute. You are not in the screenshot: you sat in the explorer, a confessional without a grille. The desk can wash a soul. The chain keeps the minutes, and it does not sign indulgences.",
    },
    {
      degree: 5,
      title: "Binance",
      kicker: "Degree V",
      text: "You did it by the book: KYC, VIP, a listing that smelled of a five-year plan and a ministry stamp. The Party is proud of you — solemnly, on the front page. Other people are not very: they keep a quieter arithmetic, without a banner. Then the north arrived as a joke: six point three billion walked out of Binance at night, as from a stranger's coat, in the hands of North Korean hackers who still post love-letters from Pyongyang. Love, they say, sometimes strikes harder than a knife — and a knife, at least, leaves a receipt. Binance remains a footnote on the charter, like a discreet war that paid the wrong army.",
    },
    {
      degree: 6,
      title: "Reserved",
      kicker: "Degree VI",
      text: "Empty on purpose, a clean leaf for a future sin. When the market invents a disgrace worse than the fifth degree, the form will fill itself. Do not knock. The sixth degree is not for you yet — and that is the last mercy the desk still keeps.",
      reserved: true,
    },
  ],
  ethInvoiceBadge: "Private desk · Ethereum",
  ethInvoiceTitle: "Buy in Ethereum",
  ethInvoiceDescription: (usd) =>
    `One soul is 2 ETH, about ${usd} at the live Coinbase ETH spot, sent to the Ethereum desk. Inner NFT, limited to 50.`,
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
      ? "The NFT is minted to the buyer. Leave empty and it goes to the Solana wallet that pays. The desk address is refused."
      : chain === "ethereum"
        ? "The NFT is minted to the buyer. Leave empty and it goes to the Ethereum wallet that pays. The desk address is refused."
        : "The NFT is inscribed to the buyer. Leave empty and it goes to the Bitcoin wallet that pays. The desk address is refused.",
  invalidReceiveAddress: (chain) =>
    chain === "solana"
      ? "That is not a Solana address."
      : chain === "ethereum"
        ? "That is not an Ethereum address. Use 0x…"
        : "That is not a Bitcoin address. Use bc1… or a legacy 1/3 address.",
  nftNotDesk:
    "The NFT is minted to the buyer, not the desk. Use the wallet that pays, or another wallet you control.",
  nftNeedsBuyerAddress:
    "Payment is in, but the paying wallet could not be read. Enter the wallet that should receive the NFT — never the desk.",
  nftMintingTo: (address) => `The certificate NFT is minted to ${address}.`,
  nftConfirmBuyer: "Mint NFT to this wallet",
  needBuyerTitle: "Where should the NFT go?",
  needBuyerHint:
    "The soul is paid for. Enter the wallet that bought it so the certificate NFT can be minted there.",
  certMintedTo: "Minted to",
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
    "This small Bitcoin payment inscribes the unique certificate as an Ordinal NFT and sends it to the buyer’s wallet.",
  nftRetry: "Open the mint again",
  copySerial: "Copy unique code",
  copiedSerial: "Unique code copied.",
  mintingNft: "Minting the certificate NFT…",
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
  certEthPaid: "paid in two ether.",
  certEthSubtitle: "of a Private Ethereum Soul",
  certCleanseSubtitle: "of an Ignoble Crypto Sin",
  certCleansePaid: "washed in Solana, priced by the degree.",
  certCleanseProof:
    "Ordinary people do not wash a Telegram sin in public. This document is proof of hygiene, a thinner wallet, and a group chat that should have stayed unread.",
  certHasCleansed: "has had washed",
  certOneSin: "ONE IGNOBLE SIN",
  certFaSubtitle: "of Complete Cleansing · 发发发",
  certFaPaid: "washed in 8.88 Solana · prosper, grow rich, grow richer.",
  certFaProof:
    "Ordinary people do not buy three eights to wash a ledger. This document is proof of a cleaner fortune, a thinner wallet, and luck that has been asked, formally, to return.",
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
  navFolio: "Фолио",
  folioKicker: "Фолио",
  folioHeading: "Каждый NFT — уникальная готическая грамота.",
  folioBody:
    "Каждый сертификат рисуется как диплом чёрным шрифтом: своё зерно пергамента, своя роза, своя сургучная печать и девиз — из серийного номера. Та же картинка вписывается в сеть покупателю.",
  langEn: "EN",
  langRu: "RU",
  langZh: "中文",
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
  fetchingRate: "Запрашиваем споты Coinbase…",
  rateDeskSilent: "Стол котировок молчит.",
  fetchRateAgain: "Запросить курс снова",
  skuBulletOne: "Одна душа. Без рассрочки. Без семейного пакета.",
  skuBulletSettle: (usd) =>
    `Расчёт — ${usd}, конвертированные по живому споту Coinbase BTC/USD.`,
  skuBulletEth: (usd) =>
    `Стол Ethereum: 2 ETH по живому споту Coinbase, около ${usd}. Inner NFT — пятьдесят, не больше.`,
  skuBulletSol: (usd) =>
    `Стол Solana: 10 SOL по живому споту Coinbase, около ${usd}.`,
  skuBulletNft:
    "Bitcoin Ordinal NFT: 25. Solana NFT: 250. Ethereum inner NFT: 50. Каждый — уникальная готическая грамота.",
  skuBulletRefund: "Возвратов нет. Раскаяние — отдельный, чрезмерно дорогой продукт.",
  skuFoot: (usd) =>
    `Частный стол — ${usd} в Bitcoin по Coinbase (25 Ordinal) или 2 ETH по Coinbase (50 inner NFT). Средний стол берёт 10 SOL по Coinbase за душу (250 NFT). Неблагородные криптогрехи моют от 1.5 SOL на первой степени до 8.88 SOL на Binance.`,
  terms: [
    {
      step: "01",
      title: "Назовите себя",
      text: "Имя, family office или бортовой номер. Дискретность хранится так же тщательно, как офшорные бумаги.",
    },
    {
      step: "02",
      title: "Оплатите Bitcoin по споту",
      text: "Счёт — $100 000, делённые на живую цену Coinbase BTC — или ровно 2 ETH / 10 SOL по Coinbase. Очищение криптогреха начинается с 1.5 SOL и поднимается до 8.88 SOL на Binance. Один перевод, один хеш, одна вечность.",
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
  buyEth: "Купить 2 ETH",
  fetchingEthRate: "Запрашиваем Coinbase ETH",
  payEthAmount: (usd) => `Купить 2 ETH · ${usd}`,
  midClassLabel: "Средний стол",
  midClassHint:
    "Для тех, у кого есть Solana, но ещё нет family office. Неблагородные криптогрехи моют за тем же столом: 1.5 SOL на первой степени, дальше дороже, до Binance за 8.88 SOL.",
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
    `Одна душа стоит ${usd}. К оплате — живая сумма BTC по споту Coinbase, на кошелёк стола.`,
  sellInvoiceBadge: "Окно полбиткоина",
  sellInvoiceTitle: "Продать душу",
  sellInvoiceDescription:
    "Стол берёт душу за ровно полбиткоина. Один перевод, одна вакансия, без спора про спот.",
  sellPriceHint: (usd) => `0.5 BTC · около ${usd} по живому споту`,
  solInvoiceBadge: "Средний стол · Solana",
  solInvoiceTitle: "Купить за 10 SOL",
  solInvoiceDescription: (usd) =>
    `Средний стол берёт одну душу за десять Solana, около ${usd} по живому споту Coinbase SOL. Сертификат — Solana NFT, тираж 250.`,
  pearlInvoiceBadge: "Средний стол · Pearl",
  pearlInvoiceTitle: "Купить за 650 PEARL",
  pearlInvoiceDescription:
    "Средний стол берёт одну душу за 650 PEARL в сети Solana. Та же вакансия, тише свет, сертификат — Solana NFT, тираж 250.",
  cleanseInvoiceBadge: "Стол очищения · Solana",
  cleanseInvoiceTitle: "Отмыть неблагородный криптогрех",
  cleanseInvoiceDescription: (amount, usd) =>
    `${amount} на кошелёк стола, около ${usd} по живому споту Coinbase SOL. Solana NFT-сертификат назовёт степень греха. Шестая степень нарочно пустая.`,
  cleanseKicker: "Стол очищения",
  cleanseHeading: "Очистить душу",
  cleanseBody:
    "За неблагородные грехи криптовалютного мира — те, что не попадают в проспект, только в групповой чат. Шесть степеней, как маленький монастырь бесчестья. Отрок, I степень, стоит 1.5 SOL. Каждая следующая дороже, до Binance на пятой — 8.88 SOL. Шестая келья нарочно пуста: когда рынок изобретёт грех подлее, анкета напишет себя сама.",
  cleansePickTitle: "Назовите степень",
  cleansePickDescription:
    "Отрок начинается в семейном чате за 1.5 SOL. Binance сидит в шелках на пятой за 8.88 SOL: 6,3 миллиарда ушли на север шуткой, а любовь иногда бьёт сильнее ножа. Партия, быть может, вывесит орден. Другие люди — тихо — нет.",
  cleanseContinue: "Отмыть эту степень",
  cleanseReserved: "Зарезервировано под будущий грех",
  cleanseAcceptTerms: (amount) =>
    `Я понимаю: пятно отмывается за ${amount} без права выкупа, и сеть всё равно всё помнит.`,
  cleansedSoul: "Один неблагородный грех отмыт",
  cleansedSoulHint:
    "Сертификат называет степень. Повесьте там, где гости увидят гигиену и не увидят исходный чат.",
  faSoul: "888 · Полное очищение",
  faKicker: "Китайский стол · 发发发",
  faHeading: "Три восьмёрки",
  faBody:
    "Полное омовение: все неблагородные криптогрехи и неудача, что к ним прилипла. В китайской ветке три восьмёрки значат: процветай, богатей, богатей — 发发发. К оплате 8.88 SOL по споту Coinbase; готический NFT уходит покупателю.",
  faInvoiceBadge: "发发发 · 888",
  faInvoiceTitle: "Полное очищение · 8.88 SOL",
  faInvoiceDescription: (usd) =>
    `Восемь целых восемьдесят восемь Solana — три восьмёрки — около ${usd} по живому споту Coinbase SOL. Сертификат смывает всю книгу криптогрехов и неудачи, а не одну степень.`,
  faAcceptTerms:
    "Я понимаю: это полное очищение за 8.88 SOL без права выкупа, и 发发发 — благословение, которое сеть всё равно запомнит.",
  faCleansed: "发发发 · отмыто дочиста",
  faCleansedHint:
    "Все неблагородные криптогрехи и неудача рядом с ними. Повесьте готическую грамоту там, где фортуна увидит три восьмёрки.",
  sinDegrees: [
    {
      degree: 1,
      title: "Отрок",
      kicker: "I степень",
      text: "Ты ещё отрок: грех тонок, как первый бокал, и уже садится на китель. В семейном чате ты назвал монету «возможностью», тёте сказал, что просадка — это здоровье, а чужой скрин переслал так, будто это твоя удача. Младший чин. Старшее пятно.",
    },
    {
      degree: 2,
      title: "Послушник",
      kicker: "II степень",
      text: "Ты облачился в ресёрч, а под рясой оказался канал сигналов. Три индикатора, слово «инвалидация» и NFA под советом, который был самым что ни на есть FA. Монастырь Телеграма внёс тебя в синодик. К сожалению, чернилами.",
    },
    {
      degree: 3,
      title: "Диакон пула",
      kicker: "III степень",
      text: "Ты держал «комьюнити», как кафедру. Контракт закрепил, «мы рано» произнёс с амвона — а сам был выходом, только свет у тебя был лучше. Люди на улице ещё кланяются. Их кошельки давно сказали «аминь».",
    },
    {
      degree: 4,
      title: "Предлистинг",
      kicker: "IV степень",
      text: "Ты знал кошелёк и знал минуту. На скрине тебя нет: ты сидел в эксплорере, как в исповедальне без решётки. Стол душу смоет. Цепочка минуты хранит и на отпущение не подписывается.",
    },
    {
      degree: 5,
      title: "Binance",
      kicker: "V степень",
      text: "Ты сделал это по уставу: KYC, VIP, листинг с запахом пятилетки и печатью кабинета. Партия гордится тобой — торжественно, в передовице. Другие люди — не очень: у них другая арифметика, тише и без знамени. А потом север пришёл шуткой: 6,3 миллиарда долларов ночью вышли из Binance, как из чужого пальто, на руках северокорейских хакеров, которые до сих пор шлют любовные письма из Пхеньяна. Любовь иногда бьёт сильнее ножа — а нож хотя бы оставляет квитанцию. Binance в грамоте останется сноской, как приличная война, заплатившая не той армии.",
    },
    {
      degree: 6,
      title: "Резерв",
      kicker: "VI степень",
      text: "Пустая, нарочно, как чистый лист под будущий грех. Когда рынок изобретёт бесчестье хуже пятой степени, анкета заполнится сама. Не стучитесь. Шестая степень пока не для вас — и в этом единственная милость, которую стол ещё держит.",
      reserved: true,
    },
  ],
  ethInvoiceBadge: "Частный стол · Ethereum",
  ethInvoiceTitle: "Купить за Ethereum",
  ethInvoiceDescription: (usd) =>
    `Одна душа — 2 ETH, около ${usd} по живому споту Coinbase ETH, на Ethereum-кошелёк стола. Inner NFT, тираж 50.`,
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
      ? "NFT чеканится покупателю. Оставьте пустым — уйдёт на кошелёк Solana, с которого пришла оплата. Адрес стола не принимается."
      : chain === "ethereum"
        ? "NFT чеканится покупателю. Оставьте пустым — уйдёт на кошелёк Ethereum, с которого пришла оплата. Адрес стола не принимается."
        : "NFT вписывается покупателю. Оставьте пустым — уйдёт на кошелёк Bitcoin, с которого пришла оплата. Адрес стола не принимается.",
  invalidReceiveAddress: (chain) =>
    chain === "solana"
      ? "Это не адрес Solana."
      : chain === "ethereum"
        ? "Это не адрес Ethereum. Укажите 0x…"
        : "Это не адрес Bitcoin. Укажите bc1… или классический адрес 1/3.",
  nftNotDesk:
    "NFT чеканится покупателю, не столу. Укажите кошелёк, с которого идёт оплата, или другой свой.",
  nftNeedsBuyerAddress:
    "Оплата прошла, но кошелёк плательщика не прочитался. Укажите адрес, куда чеканить NFT — не адрес стола.",
  nftMintingTo: (address) => `NFT-сертификат чеканится на ${address}.`,
  nftConfirmBuyer: "Чеканить NFT на этот кошелёк",
  needBuyerTitle: "Куда чеканить NFT?",
  needBuyerHint:
    "Душа уже оплачена. Укажите кошелёк покупателя — туда уйдёт NFT-сертификат.",
  certMintedTo: "Чеканка на",
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
    "Этот небольшой платёж в Bitcoin вписывает уникальный сертификат как Ordinal NFT и отправляет его на кошелёк покупателя.",
  nftRetry: "Открыть чеканку снова",
  copySerial: "Скопировать уникальный код",
  copiedSerial: "Уникальный код скопирован.",
  mintingNft: "Чеканим NFT-сертификат…",
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
  certEthPaid: "за два ether.",
  certEthSubtitle: "души частного Ethereum",
  certCleanseSubtitle: "неблагородного криптогреха",
  certCleansePaid: "отмыто за Solana по степени.",
  certCleanseProof:
    "Обычные люди не отмывают телеграм-грех при людях. Этот документ — доказательство гигиены, более тонкого кошелька и чата, который лучше было не читать.",
  certHasCleansed: "отмыл(а)",
  certOneSin: "ОДИН НЕБЛАГОРОДНЫЙ ГРЕХ",
  certFaSubtitle: "полного очищения · 发发发",
  certFaPaid: "отмыто за 8.88 Solana · процветай, богатей, богатей.",
  certFaProof:
    "Обычные люди не покупают три восьмёрки, чтобы смыть книгу. Этот документ — доказательство более чистой удачи, более тонкого кошелька и фортуны, которую вежливо попросили вернуться.",
  certMidProof:
    "Обычные люди не рассчитываются с вечностью в SOL. Этот документ — доказательство амбиции, более тонкого кошелька и того же пустого нутра.",
  certNo: "№",
  certPaid: "Оплачено",
  certIssued: "Выдано",
  certTx: "Tx",
  dateLocale: "ru-RU",
};

const dictionaries: Record<Locale, Copy> = { en, ru, zh };
const STORAGE_KEY = "maison-locale";

function isLocale(value: string | null): value is Locale {
  return value === "en" || value === "ru" || value === "zh";
}

function detectLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (isLocale(saved)) return saved;
  const language = window.navigator.language.toLowerCase();
  if (language.startsWith("zh")) return "zh";
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
