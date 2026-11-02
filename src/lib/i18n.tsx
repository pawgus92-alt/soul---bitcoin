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
  siteSlogan: string;
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
  skuBulletLucky: string;
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
  buySolRare: string;
  buySolEpic: string;
  buySolLegendary: string;
  buyPearl: string;
  cleanseSoul: string;
  buyEth: string;
  buyEthOne: string;
  buyEthTwo: string;
  fetchingEthRate: string;
  payEthAmount: (eth: string) => string;
  payEthOneAmount: (usd: string) => string;
  payEthTwoAmount: (usd: string) => string;
  ethHint: string;
  solHint: string;
  midClassLabel: string;
  midClassHint: string;
  nftCapsLine: string;
  nftRemaining: (remaining: number, max: number, chain: NftChain) => string;
  nftSoldOut: string;
  nftOrdinarySoldOut: string;
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
  solRareInvoiceBadge: string;
  solRareInvoiceTitle: string;
  solRareInvoiceDescription: (usd: string) => string;
  solEpicInvoiceBadge: string;
  solEpicInvoiceTitle: string;
  solEpicInvoiceDescription: (usd: string) => string;
  solLegendaryInvoiceBadge: string;
  solLegendaryInvoiceTitle: string;
  solLegendaryInvoiceDescription: (usd: string) => string;
  solAcceptTerms: (amount: string) => string;
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
  luckySoul: string;
  luckyHint: string;
  luckyInvoiceBadge: string;
  luckyInvoiceTitle: string;
  luckyInvoiceDescription: (usd: string) => string;
  luckyAcceptTerms: string;
  luckyBought: string;
  luckyBoughtHint: string;
  nftLuckyRemaining: (remaining: number, max: number) => string;
  nftEthHalfRemaining: (remaining: number, max: number) => string;
  nftEthOneRemaining: (remaining: number, max: number) => string;
  nftEthTwoRemaining: (remaining: number, max: number) => string;
  nftSolCommonRemaining: (remaining: number, max: number) => string;
  nftSolRareRemaining: (remaining: number, max: number) => string;
  nftSolEpicRemaining: (remaining: number, max: number) => string;
  nftSolLegendaryRemaining: (remaining: number, max: number) => string;
  certLuckySubtitle: string;
  certLuckyPaid: string;
  certLuckyProof: string;
  sinDegrees: SinDegreeCopy[];
  ethInvoiceBadge: string;
  ethInvoiceTitle: string;
  ethInvoiceDescription: (usd: string) => string;
  ethOneInvoiceBadge: string;
  ethOneInvoiceTitle: string;
  ethOneInvoiceDescription: (usd: string) => string;
  ethTwoInvoiceBadge: string;
  ethTwoInvoiceTitle: string;
  ethTwoInvoiceDescription: (usd: string) => string;
  ethAcceptTerms: string;
  ethOneAcceptTerms: string;
  ethTwoAcceptTerms: string;
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
  certNftPending: (chain: NftChain) => string;
  certNftInscribing: (chain: NftChain) => string;
  certNftMinted: (chain: NftChain) => string;
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
  certEthOnePaid: string;
  certEthOneSubtitle: string;
  certEthTwoPaid: string;
  certEthTwoSubtitle: string;
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
  documentTitle: "Maison Æternum — Sell the soul for 1 Bitcoin",
  documentDescription:
    "Private soul desk. One soul for 1 Bitcoin. The last three NFT charters are 888 luck pieces at 8 BTC. VAT is not charged, because eternity has no jurisdiction.",
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
    "Each certificate is a mystical painting, then minted as an NFT on the chain you paid: Bitcoin Ordinals, Solana, or Ethereum. The buyer’s wallet holds it. The desk never does.",
  langEn: "EN",
  langRu: "RU",
  langZh: "简体",
  langSwitch: "Language",
  badgeInvite: "By invitation, then by invoice",
  cities: ["Geneva", "London", "Dubai", "Moscow", "Nassau"],
  heroTitle: "Sell the soul.",
  heroAccent: "Keep the yacht.",
  siteSlogan: "Vacancy is the last luxury.",
  heroBody: (usd) =>
    `One bitcoin, about ${usd}. We do not negotiate, we take no percentage, and we do not ask why the boardroom air got lighter.`,
  readTerms: "Read the terms",
  vatLine: "VAT is not charged, because eternity has no jurisdiction.",
  heroAside:
    "Wire transfers remain for people who still believe in states. Cash smells of morals. Bitcoin is the only decent language in this room.",
  skuLabel: "Private SKU",
  fetchingRate: "Fetching Coinbase spots…",
  rateDeskSilent: "The rate desk is silent.",
  fetchRateAgain: "Fetch the rate again",
  skuBulletOne: "One soul. No instalments. No family package.",
  skuBulletSettle: (usd) =>
    `Settlement is 1 BTC, about ${usd} at the live Coinbase BTC/USD.`,
  skuBulletEth: (usd) =>
    `Ethereum desk: fifteen NFTs. First ten at 0.5 ETH, about ${usd} at Coinbase. Then three at 1 ETH. Last two at 2 ETH.`,
  skuBulletSol: (usd) =>
    `Solana desk: fifty NFTs, shuffled once. Common 0.5 SOL (60%, about ${usd}), rare 1 SOL (24%), epic 2 SOL (12%), legendary 8 SOL (4% — two of fifty). Encounter rates are written on the NFT.`,
  skuBulletNft:
    "The certificate NFT is minted on the chain you paid. Bitcoin Ordinals: 10, the last three of them 888 luck charters. Solana NFTs: 50 — common, rare, epic, legendary. Ethereum NFTs: 15 — ten at 0.5 ETH, three at 1 ETH, two at 2 ETH. Each a unique mystical charter.",
  skuBulletLucky:
    "The last three Bitcoin Ordinals — Nos. 8, 9 and 10 of ten — are 888 luck charters: the dearest, the richest, the ones that bring luck. Eight bitcoin each. The other seven are one bitcoin each.",
  skuBulletRefund: "No refunds. Remorse is a separate, overpriced product.",
  skuFoot: (usd) =>
    `The private desk is 1 BTC (about ${usd}) for seven ordinary souls, or 8 BTC for a 888 luck charter, or Ethereum: 0.5 / 1 / 2 ETH for fifteen NFTs. The middle desk sells fifty Solana souls: 0.5 / 1 / 2 / 8 SOL. The cleanse ladder is named: Vanity 1.5, Greed 2.5, Envy 4, Pride 6, then the most expensive laptop at 8.88 SOL.`,
  terms: [
    {
      step: "01",
      title: "Name yourself",
      text: "A name, a family office, or a hull number. Discretion is kept as carefully as your offshore papers.",
    },
    {
      step: "02",
      title: "Pay one Bitcoin",
      text: "The invoice is one bitcoin — or 0.5 / 1 / 2 ETH, or Solana at 0.5 / 1 / 2 / 8 SOL. The last three Bitcoin NFTs are 888 luck charters at 8 BTC. Fifteen Ethereum NFTs: first ten at 0.5 ETH, three at 1 ETH, last two at 2 ETH. The cleanse ladder is Vanity, Greed, Envy, Pride, then the laptop at 8.88 SOL. One transfer, one hash, one eternity.",
    },
    {
      step: "03",
      title: "Receive the chain NFT",
      text: "A unique certificate code. Bitcoin desk: Ordinal, 10 pieces — seven at 1 BTC, last three 888 at 8 BTC. Solana desk: fifty NFTs, rarity and encounter printed on the charter. Ethereum desk: 15 pieces — ten at 0.5 ETH, three at 1 ETH, last two at 2 ETH.",
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
    `You are not buying salvation. You are selling the one thing that cannot be shown to guests on the boat. The price is one bitcoin, about ${usd}.`,
  footerDesk: "Maison Æternum · Private Acquisition Desk · Est. 1666",
  ledger: [
    { city: "Geneva", client: "Family office", amount: "1 BTC" },
    { city: "Mayfair", client: "Anonymous", amount: "1 BTC" },
    { city: "Dubai", client: "Yacht desk", amount: "8 BTC" },
    { city: "Moscow", client: "Private", amount: "1 BTC" },
    { city: "Courchevel", client: "Chalet 14", amount: "1 BTC" },
    { city: "Nassau", client: "Trust", amount: "1 BTC" },
  ],
  payInBitcoin: "Buy",
  fetchingBitcoinRate: "Fetching Bitcoin rate",
  payAmount: (btc) => `Buy ${btc}`,
  sellSoul: "Sell soul · 0.5 BTC",
  buySol: "Common · 0.5 SOL",
  buySolRare: "Rare · 1 SOL",
  buySolEpic: "Epic · 2 SOL",
  buySolLegendary: "Legendary · 8 SOL",
  buyPearl: "Middle class · 650 PEARL",
  cleanseSoul: "Cleanse the soul",
  buyEth: "Buy 0.5 ETH",
  buyEthOne: "Buy 1 ETH",
  buyEthTwo: "Buy 2 ETH",
  fetchingEthRate: "Fetching Coinbase ETH",
  payEthAmount: (usd) => `Buy 0.5 ETH · ${usd}`,
  payEthOneAmount: (usd) => `Buy 1 ETH · ${usd}`,
  payEthTwoAmount: (usd) => `Buy 2 ETH · ${usd}`,
  ethHint:
    "Fifteen Ethereum NFTs: first ten at 0.5 ETH, then three at 1 ETH, last two at 2 ETH.",
  solHint:
    "Fifty Solana souls, shuffled once. Common 0.5 SOL — sixty percent. Rare 1 SOL — twenty-four. Epic 2 SOL — twelve. Legendary 8 SOL — four percent, two of fifty. The NFT names the encounter.",
  midClassLabel: "Middle desk",
  midClassHint:
    "For households that have Solana, but not yet a family office. Four rarities: 0.5, 1, 2 and 8 SOL. Ignoble crypto sins are washed at the same desk, named not numbered: Vanity 1.5, Greed 2.5, Envy 4, Pride 6, then the most expensive laptop at 8.88 SOL.",
  nftCapsLine:
    "Bitcoin 10 · last three 888 · Solana 50 · 0.5 / 1 / 2 / 8 SOL · Ethereum 15 · 0.5 / 1 / 2 ETH",
  nftRemaining: (remaining, max, chain) =>
    chain === "solana"
      ? `Solana NFT ${remaining} of ${max} remaining`
      : chain === "ethereum"
        ? `Ethereum NFT ${remaining} of ${max} remaining`
        : `Bitcoin Ordinal ${remaining} of ${max} remaining`,
  nftSoldOut: "This NFT edition is sold out. The soul will have to wait.",
  nftOrdinarySoldOut:
    "The seven ordinary Bitcoin souls are gone. The last three 888 luck charters remain, at 8 BTC.",
  invoiceBadge: "Bitcoin invoice · 1 BTC",
  invoiceTitle: "Buy in Bitcoin",
  invoiceDescription: (usd) =>
    `One soul is 1 BTC, about ${usd} at Coinbase. Sent to the desk wallet.`,
  sellInvoiceBadge: "Half-bitcoin window",
  sellInvoiceTitle: "Sell the soul",
  sellInvoiceDescription:
    "The desk takes the soul for a flat half bitcoin. One transfer, one vacancy, no debate about the spot.",
  sellPriceHint: (usd) => `0.5 BTC · about ${usd} at the live spot`,
  solInvoiceBadge: "Middle desk · Common · 60%",
  solInvoiceTitle: "Buy the common Solana soul",
  solInvoiceDescription: (usd) =>
    `Half a Solana, about ${usd} at the live Coinbase SOL spot. Common: thirty of fifty, sixty percent encounter. The NFT writes the rarity on the charter.`,
  solRareInvoiceBadge: "Middle desk · Rare · 24%",
  solRareInvoiceTitle: "Buy the rare Solana soul",
  solRareInvoiceDescription: (usd) =>
    `One Solana, about ${usd}. Rare: twelve of fifty, twenty-four percent encounter. Scarcer light, same vacancy.`,
  solEpicInvoiceBadge: "Middle desk · Epic · 12%",
  solEpicInvoiceTitle: "Buy the epic Solana soul",
  solEpicInvoiceDescription: (usd) =>
    `Two Solana, about ${usd}. Epic: six of fifty, twelve percent encounter. The deck does not deal this often.`,
  solLegendaryInvoiceBadge: "Middle desk · Legendary · 4%",
  solLegendaryInvoiceTitle: "Buy the legendary Solana soul",
  solLegendaryInvoiceDescription: (usd) =>
    `Eight Solana, about ${usd}. Legendary: two of fifty, four percent encounter. The dearest Solana charter. The NFT will say so.`,
  solAcceptTerms: (amount) =>
    `I understand this Solana soul is ${amount} without repurchase, and that rarity and encounter are printed on the NFT.`,
  pearlInvoiceBadge: "Middle desk · Pearl",
  pearlInvoiceTitle: "Buy with 650 PEARL",
  pearlInvoiceDescription:
    "The middle desk takes one soul for 650 PEARL on Solana. Same vacancy, quieter lighting, Solana NFT certificate, limited to 50.",
  cleanseInvoiceBadge: "Cleansing desk · Solana",
  cleanseInvoiceTitle: "Wash an ignoble crypto sin",
  cleanseInvoiceDescription: (amount, usd) =>
    `${amount} to the desk wallet, about ${usd} at the live Coinbase SOL spot. A Solana NFT certificate names the sin, not a number. The sixth stall is empty on purpose.`,
  cleanseKicker: "Cleansing desk",
  cleanseHeading: "Cleanse the soul",
  cleanseBody:
    "For ignoble sins of the crypto world — the ones that never make the prospectus, only the group chat. The ladder is named, not numbered, so the stain is something you want to own. Vanity at 1.5 SOL. Greed at 2.5. Envy at 4. Pride at 6. Then the fifth stall, left as it is: the most expensive laptop in history, 8.88 SOL. The sixth is vacant on purpose: when the market invents a meaner sin, the form will write itself.",
  cleansePickTitle: "Name the sin",
  cleansePickDescription:
    "Buy the stain that fits. Vanity, greed, envy, pride — each stall dearer than the last, until you almost want the soul more than the wash. Degree V, 2026, sits at 8.88 SOL: the most expensive laptop in history, about six point three billion, because an engineer opened the wrong PDF. Not every hero wears a cape. If you ever opened one — ease the soul.",
  cleanseContinue: "Wash this sin",
  cleanseReserved: "Reserved for a later sin",
  cleanseAcceptTerms: (amount) =>
    `I understand the stain is washed for ${amount} without a right of repurchase, and that the chain will remember anyway.`,
  cleansedSoul: "One ignoble sin, washed",
  cleansedSoulHint:
    "The certificate names the sin. Hang it where the guests can see the hygiene and not the original group chat.",
  faSoul: "888 · Complete cleansing",
  faKicker: "Chinese desk · 发发发",
  faHeading: "Three eights",
  faBody:
    "A complete washing: every ignoble crypto sin, and the misfortune that clung to them. In the Chinese branch the three eights mean prosper, grow rich, grow richer — 发发发. Paid in 8.88 SOL at the Coinbase spot, minted as a unique gothic NFT to the buyer.",
  faInvoiceBadge: "发发发 · 888",
  faInvoiceTitle: "Complete cleansing · 8.88 SOL",
  faInvoiceDescription: (usd) =>
    `Eight point eighty-eight Solana — three eights — about ${usd} at the live Coinbase SOL spot. The certificate washes the whole ledger of crypto sins and misfortune, not a single degree.`,
  faAcceptTerms:
    "I understand this is a complete cleansing for 8.88 SOL, without repurchase, and that 发发发 is a blessing the chain will still remember.",
  faCleansed: "发发发 · washed clean",
  faCleansedHint:
    "All ignoble crypto sins, and the misfortune beside them. Hang the gothic charter where fortune can see the three eights.",
  luckySoul: "888 · 8 BTC",
  luckyHint:
    "The last three Bitcoin NFTs: Nos. 8, 9 and 10 of ten. The dearest, the richest, the ones that bring luck. Eight bitcoin each. The other seven are one bitcoin each.",
  luckyInvoiceBadge: "888 · the dearest three",
  luckyInvoiceTitle: "Buy the luck charter",
  luckyInvoiceDescription: (usd) =>
    `Eight bitcoin, about ${usd}. One of three 888 certificates — the dearest, the richest, the ones that bring luck.`,
  luckyAcceptTerms:
    "I understand this is one of three 888 Bitcoin NFTs, sold for 8 BTC without repurchase. The dearest desk. Luck is not a refund.",
  luckyBought: "You bought one of the three 888",
  luckyBoughtHint:
    "The dearest Bitcoin NFT, a luck charter. Hang it where fortune can see the three eights.",
  nftLuckyRemaining: (remaining, max) =>
    `888 luck charters ${remaining} of ${max} remaining`,
  nftEthHalfRemaining: (remaining, max) =>
    `Ethereum 0.5 ETH ${remaining} of ${max} remaining`,
  nftEthOneRemaining: (remaining, max) =>
    `Ethereum 1 ETH ${remaining} of ${max} remaining`,
  nftEthTwoRemaining: (remaining, max) =>
    `Ethereum 2 ETH ${remaining} of ${max} remaining`,
  nftSolCommonRemaining: (remaining, max) =>
    `Common Solana ${remaining} of ${max} remaining · 60%`,
  nftSolRareRemaining: (remaining, max) =>
    `Rare Solana ${remaining} of ${max} remaining · 24%`,
  nftSolEpicRemaining: (remaining, max) =>
    `Epic Solana ${remaining} of ${max} remaining · 12%`,
  nftSolLegendaryRemaining: (remaining, max) =>
    `Legendary Solana ${remaining} of ${max} remaining · 4%`,
  certLuckySubtitle: "of a Luck Charter · 888",
  certLuckyPaid: "paid in eight bitcoin.",
  certLuckyProof:
    "Ordinary people do not buy three eights in Bitcoin. This document is proof of surplus, taste, and luck formally invited to stay.",
  sinDegrees: [
    {
      degree: 1,
      title: "Vanity",
      kicker: "Vanitas · 1.5 SOL",
      text: "You posted the PNL. Green candles cropped so the deposits would not show, a yacht emoji after one lucky ten-times, a screenshot that made the group chat go quiet. Vanity in this market is not beauty — it is the need to be seen winning. The first stall is cheap on purpose: buy it while it still looks like confidence.",
    },
    {
      degree: 2,
      title: "Greed",
      kicker: "Avaritia · 2.5 SOL",
      text: "Leverage until the wick. Never take profit. The bag is never full; the next candle is always the one. You would rather die in a liquidation than leave a dollar on the table. Greed here is not hunger. It is the refusal to close a winning trade because winning, once, was not enough.",
    },
    {
      degree: 3,
      title: "Envy",
      kicker: "Invidia · 4 SOL",
      text: "You did not want the trade. You wanted their luck. Copytrading a stranger’s wallet, watching another man’s PNL like a liturgy, buying the same ticker because his story made yours feel poor. Envy in crypto is a second-hand soul: you borrow someone else’s conviction and still pay the liquidation yourself.",
    },
    {
      degree: 4,
      title: "Pride",
      kicker: "Superbia · 6 SOL",
      text: "I am early. The thesis is identity. You refuse to close, you refuse to be wrong, you refuse the stop. The market can be mistaken for years; you cannot be mistaken for a minute. Pride is the last named stall before the laptop: the sin of a man who still believes the chart owes him an apology.",
    },
    {
      degree: 5,
      title: "The Most Expensive Laptop in History",
      kicker: "Degree V · 2026",
      text: "About six point three billion dollars. They will file it under the dearest laptop ever bought. The door was a notebook on an engineer’s desk: he opened the wrong PDF, and the exchange parted with billions. In the cinema it is one shot — one employee, one attachment, a house that suddenly has less money than a small country. Not every hero wears a cape; sometimes a phishing letter is enough. If you ever opened one — ease the soul. The desk is open. The chain will remember the click anyway.",
    },
    {
      degree: 6,
      title: "Reserved",
      kicker: "Degree VI",
      text: "Empty on purpose, a clean leaf for a future sin. When the market invents a disgrace worse than the fifth degree, the form will fill itself. Do not knock. The sixth degree is not for you yet — and that is the last mercy the desk still keeps.",
      reserved: true,
    },
  ],
  ethInvoiceBadge: "Private desk · 0.5 ETH",
  ethInvoiceTitle: "Buy in Ethereum",
  ethInvoiceDescription: (usd) =>
    `One soul is 0.5 ETH, about ${usd} at the live Coinbase ETH spot, sent to the Ethereum desk. First ten of fifteen Ethereum NFTs.`,
  ethOneInvoiceBadge: "Private desk · 1 ETH",
  ethOneInvoiceTitle: "Buy the 1 ETH charter",
  ethOneInvoiceDescription: (usd) =>
    `One soul is 1 ETH, about ${usd} at Coinbase. Editions 11–13 of fifteen Ethereum NFTs.`,
  ethTwoInvoiceBadge: "Private desk · 2 ETH · the last two",
  ethTwoInvoiceTitle: "Buy the last Ethereum charter",
  ethTwoInvoiceDescription: (usd) =>
    `One soul is 2 ETH, about ${usd} at Coinbase. One of the last two Ethereum NFTs — editions 14 and 15 of fifteen.`,
  ethAcceptTerms:
    "I understand this is one of the first ten Ethereum NFTs, sold for 0.5 ETH without repurchase.",
  ethOneAcceptTerms:
    "I understand this is one of three Ethereum NFTs at 1 ETH, editions 11–13 of fifteen, without repurchase.",
  ethTwoAcceptTerms:
    "I understand this is one of the last two Ethereum NFTs, sold for 2 ETH without repurchase. The dearest Ethereum desk.",
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
        ? "Ethereum address for the NFT"
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
        ? "Ethereum NFT"
        : "Bitcoin NFT",
  certEdition: (edition, max) => `Edition ${edition} / ${max}`,
  certNftPending: (chain) =>
    chain === "solana"
      ? "Preparing the Solana NFT"
      : chain === "ethereum"
        ? "Preparing the Ethereum NFT"
        : "Awaiting inscription postage",
  certNftInscribing: (chain) =>
    chain === "solana"
      ? "Minting on Solana"
      : chain === "ethereum"
        ? "Minting on Ethereum"
        : "Inscribing on Bitcoin",
  certNftMinted: (chain) =>
    chain === "solana"
      ? "Minted on Solana"
      : chain === "ethereum"
        ? "Minted on Ethereum"
        : "Inscribed on Bitcoin",
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
  certTenSol: "paid in Solana, named by rarity.",
  certPearlPaid: "paid in 650 PEARL.",
  certEthPaid: "paid in half an ether.",
  certEthSubtitle: "of a Private Ethereum Soul",
  certEthOnePaid: "paid in one ether.",
  certEthOneSubtitle: "of an Ethereum Soul · 1 ETH",
  certEthTwoPaid: "paid in two ether.",
  certEthTwoSubtitle: "of the Last Two Ethereum Souls",
  certCleanseSubtitle: "of an Ignoble Crypto Sin",
  certCleansePaid: "washed in Solana, named as a sin.",
  certCleanseProof:
    "Ordinary people do not wash a Telegram sin in public. This document is proof of hygiene, a thinner wallet, and a group chat that should have stayed unread.",
  certHasCleansed: "has washed",
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
  documentTitle: "Maison Æternum — Продать душу за 1 Bitcoin",
  documentDescription:
    "Частный стол душ. Одна душа за 1 Bitcoin. Последние три NFT — грамоты 888 по 8 BTC. НДС не начисляется: у вечности нет юрисдикции.",
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
    "Каждый сертификат — мистическая картина, затем NFT в сети оплаты: Bitcoin Ordinals, Solana или Ethereum. Кошелёк покупателя его держит. Стол — никогда.",
  langEn: "EN",
  langRu: "RU",
  langZh: "简体",
  langSwitch: "Язык",
  badgeInvite: "Сначала приглашение, затем счёт",
  cities: ["Женева", "Лондон", "Дубай", "Москва", "Нассау"],
  heroTitle: "Продайте душу.",
  heroAccent: "Оставьте яхту.",
  siteSlogan: "Пустота — последняя роскошь.",
  heroBody: (usd) =>
    `Один биткоин, около ${usd}. Мы не торгуемся, процента не берём и не спрашиваем, почему в зале совета вдруг стало легче.`,
  readTerms: "Читать условия",
  vatLine: "НДС не начисляется: у вечности нет юрисдикции.",
  heroAside:
    "Проводки остаются для тех, кто ещё верит в государства. Наличные пахнут моралью. Bitcoin — единственный приличный язык в этой комнате.",
  skuLabel: "Частный артикул",
  fetchingRate: "Запрашиваем споты Coinbase…",
  rateDeskSilent: "Стол котировок молчит.",
  fetchRateAgain: "Запросить курс снова",
  skuBulletOne: "Одна душа. Без рассрочки. Без семейного пакета.",
  skuBulletSettle: (usd) =>
    `Расчёт — 1 BTC, около ${usd} по живому курсу Coinbase BTC/USD.`,
  skuBulletEth: (usd) =>
    `Стол Ethereum: пятнадцать NFT. Первые десять по 0.5 ETH, около ${usd} по Coinbase. Затем три по 1 ETH. Последние две по 2 ETH.`,
  skuBulletSol: (usd) =>
    `Стол Solana: пятьдесят NFT, колода перемешана однажды. Обычные 0.5 SOL (60%, около ${usd}), раритет 1 SOL (24%), эпик 2 SOL (12%), легендарные 8 SOL (4% — две из пятидесяти). Встречаемость написана на NFT.`,
  skuBulletNft:
    "NFT-сертификат чеканится в сети оплаты. Bitcoin Ordinal: 10, последние три — грамоты 888 на удачу. Solana NFT: 50 — обычные, раритет, эпик, легендарные. Ethereum NFT: 15 — десять по 0.5 ETH, три по 1 ETH, две по 2 ETH. Каждый — уникальная мистическая грамота.",
  skuBulletLucky:
    "Последние три Bitcoin Ordinal — № 8, 9 и 10 из десяти — грамоты 888: самые дорогие, самые богатые, приносящие удачу. По 8 биткоинов. Остальные семь — по одному биткоину.",
  skuBulletRefund: "Возвратов нет. Раскаяние — отдельный, чрезмерно дорогой продукт.",
  skuFoot: (usd) =>
    `Частный стол — 1 BTC (около ${usd}) за семь обычных душ, или 8 BTC за грамоту 888, или Ethereum: 0.5 / 1 / 2 ETH, пятнадцать NFT. Средний стол продаёт пятьдесят душ Solana: 0.5 / 1 / 2 / 8 SOL. Лестница очищения названа: Тщеславие 1.5, Алчность 2.5, Зависть 4, Гордыня 6, затем самый дорогой ноутбук за 8.88 SOL.`,
  terms: [
    {
      step: "01",
      title: "Назовите себя",
      text: "Имя, family office или бортовой номер. Дискретность хранится так же тщательно, как офшорные бумаги.",
    },
    {
      step: "02",
      title: "Оплатите один Bitcoin",
      text: "Счёт — один биткоин — или 0.5 / 1 / 2 ETH, или Solana по 0.5 / 1 / 2 / 8 SOL. Последние три Bitcoin NFT — грамоты 888 по 8 BTC. Ethereum NFT пятнадцать: первые десять по 0.5 ETH, три по 1 ETH, последние две по 2 ETH. Лестница очищения: Тщеславие, Алчность, Зависть, Гордыня, затем ноутбук за 8.88 SOL. Один перевод, один хеш, одна вечность.",
    },
    {
      step: "03",
      title: "Получите NFT в сети оплаты",
      text: "Уникальный код сертификата. Стол Bitcoin: Ordinal, 10 штук — семь по 1 BTC, последние три 888 по 8 BTC. Стол Solana: пятьдесят NFT, редкость и встречаемость на грамоте. Стол Ethereum: 15 штук — десять по 0.5 ETH, три по 1 ETH, последние две по 2 ETH.",
    },
  ],
  assetsRetained: "Сохранённые активы",
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
      role: "Family office, Мейфер",
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
    `Вы не покупаете спасение. Вы продаёте единственное, что нельзя показать гостям на палубе. Цена — один биткоин, около ${usd}.`,
  footerDesk: "Maison Æternum · Частный стол приобретений · Est. 1666",
  ledger: [
    { city: "Женева", client: "Family office", amount: "1 BTC" },
    { city: "Мейфер", client: "Аноним", amount: "1 BTC" },
    { city: "Дубай", client: "Яхтенный стол", amount: "8 BTC" },
    { city: "Москва", client: "Частный", amount: "1 BTC" },
    { city: "Куршевель", client: "Шале 14", amount: "1 BTC" },
    { city: "Нассау", client: "Траст", amount: "1 BTC" },
  ],
  payInBitcoin: "Купить",
  fetchingBitcoinRate: "Запрашиваем курс Bitcoin",
  payAmount: (btc) => `Купить ${btc}`,
  sellSoul: "Продать душу · 0.5 BTC",
  buySol: "Обычная · 0.5 SOL",
  buySolRare: "Раритет · 1 SOL",
  buySolEpic: "Эпик · 2 SOL",
  buySolLegendary: "Легендарная · 8 SOL",
  buyPearl: "Средний класс · 650 PEARL",
  cleanseSoul: "Очистить душу",
  buyEth: "Купить 0.5 ETH",
  buyEthOne: "Купить 1 ETH",
  buyEthTwo: "Купить 2 ETH",
  fetchingEthRate: "Запрашиваем Coinbase ETH",
  payEthAmount: (usd) => `Купить 0.5 ETH · ${usd}`,
  payEthOneAmount: (usd) => `Купить 1 ETH · ${usd}`,
  payEthTwoAmount: (usd) => `Купить 2 ETH · ${usd}`,
  ethHint:
    "Пятнадцать Ethereum NFT: первые десять по 0.5 ETH, затем три по 1 ETH, последние две по 2 ETH.",
  solHint:
    "Пятьдесят душ Solana, колода перемешана однажды. Обычные 0.5 SOL — шестьдесят процентов. Раритет 1 SOL — двадцать четыре. Эпик 2 SOL — двенадцать. Легендарные 8 SOL — четыре процента, две из пятидесяти. NFT называет встречаемость.",
  midClassLabel: "Средний стол",
  midClassHint:
    "Для тех, у кого есть Solana, но ещё нет family office. Четыре редкости: 0.5, 1, 2 и 8 SOL. Неблагородные криптогрехи моют за тем же столом — не «уровень 1», а по имени: Тщеславие 1.5, Алчность 2.5, Зависть 4, Гордыня 6, затем самый дорогой ноутбук за 8.88 SOL.",
  nftCapsLine:
    "Bitcoin 10 · последние три 888 · Solana 50 · 0.5 / 1 / 2 / 8 SOL · Ethereum 15 · 0.5 / 1 / 2 ETH",
  nftRemaining: (remaining, max, chain) =>
    chain === "solana"
      ? `Solana NFT: осталось ${remaining} из ${max}`
      : chain === "ethereum"
        ? `Ethereum NFT: осталось ${remaining} из ${max}`
        : `Bitcoin Ordinal: осталось ${remaining} из ${max}`,
  nftSoldOut: "Этот тираж NFT распродан. Душе придётся подождать.",
  nftOrdinarySoldOut:
    "Семь обычных душ в Bitcoin проданы. Остались три грамоты 888 по 8 BTC.",
  invoiceBadge: "Счёт в Bitcoin · 1 BTC",
  invoiceTitle: "Купить за Bitcoin",
  invoiceDescription: (usd) =>
    `Одна душа — 1 BTC, около ${usd} по Coinbase. На кошелёк стола.`,
  sellInvoiceBadge: "Окно полбиткоина",
  sellInvoiceTitle: "Продать душу",
  sellInvoiceDescription:
    "Стол берёт душу за ровно полбиткоина. Один перевод, одна вакансия, без спора про спот.",
  sellPriceHint: (usd) => `0.5 BTC · около ${usd} по живому споту`,
  solInvoiceBadge: "Средний стол · обычная · 60%",
  solInvoiceTitle: "Купить обычную душу Solana",
  solInvoiceDescription: (usd) =>
    `Полсоланы, около ${usd} по живому споту Coinbase SOL. Обычная: тридцать из пятидесяти, встречаемость шестьдесят процентов. NFT напишет редкость на грамоте.`,
  solRareInvoiceBadge: "Средний стол · раритет · 24%",
  solRareInvoiceTitle: "Купить раритетную душу Solana",
  solRareInvoiceDescription: (usd) =>
    `Одна Solana, около ${usd}. Раритет: двенадцать из пятидесяти, встречаемость двадцать четыре процента. Реже свет, та же вакансия.`,
  solEpicInvoiceBadge: "Средний стол · эпик · 12%",
  solEpicInvoiceTitle: "Купить эпическую душу Solana",
  solEpicInvoiceDescription: (usd) =>
    `Две Solana, около ${usd}. Эпик: шесть из пятидесяти, встречаемость двенадцать процентов. Колода так часто не сдаёт.`,
  solLegendaryInvoiceBadge: "Средний стол · легендарная · 4%",
  solLegendaryInvoiceTitle: "Купить легендарную душу Solana",
  solLegendaryInvoiceDescription: (usd) =>
    `Восемь Solana, около ${usd}. Легендарная: две из пятидесяти, встречаемость четыре процента. Самая дорогая грамота Solana. NFT так и скажет.`,
  solAcceptTerms: (amount) =>
    `Я понимаю: эта душа Solana стоит ${amount} без права выкупа, а редкость и встречаемость напечатаны на NFT.`,
  pearlInvoiceBadge: "Средний стол · Pearl",
  pearlInvoiceTitle: "Купить за 650 PEARL",
  pearlInvoiceDescription:
    "Средний стол берёт одну душу за 650 PEARL в сети Solana. Та же вакансия, тише свет, сертификат — Solana NFT, тираж 50.",
  cleanseInvoiceBadge: "Стол очищения · Solana",
  cleanseInvoiceTitle: "Отмыть неблагородный криптогрех",
  cleanseInvoiceDescription: (amount, usd) =>
    `${amount} на кошелёк стола, около ${usd} по живому споту Coinbase SOL. Solana NFT-сертификат назовёт грех, а не номер. Шестая ступень нарочно пустая.`,
  cleanseKicker: "Стол очищения",
  cleanseHeading: "Очистить душу",
  cleanseBody:
    "За неблагородные грехи криптовалютного мира — те, что не попадают в проспект, только в групповой чат. Лестница названа, не пронумерована, чтобы пятно хотелось купить. Тщеславие — 1.5 SOL. Алчность — 2.5. Зависть — 4. Гордыня — 6. Затем пятая ступень, как была: самый дорогой ноутбук в истории, 8.88 SOL. Шестая келья нарочно пуста: когда рынок изобретёт грех подлее, анкета напишет себя сама.",
  cleansePickTitle: "Назовите грех",
  cleansePickDescription:
    "Купите пятно, которое вам к лицу. Тщеславие, алчность, зависть, гордыня — каждая ступень дороже прежней, пока душу почти хочется больше, чем омовение. Пятая степень, 2026-й, сидит за 8.88 SOL: самый дорогой ноутбук в истории, около 6,3 миллиарда, потому что инженер открыл не тот PDF. Не все герои носят плащи. Если когда-то открывал — облегчи душу.",
  cleanseContinue: "Отмыть этот грех",
  cleanseReserved: "Зарезервировано под будущий грех",
  cleanseAcceptTerms: (amount) =>
    `Я понимаю: пятно отмывается за ${amount} без права выкупа, и сеть всё равно всё помнит.`,
  cleansedSoul: "Один неблагородный грех отмыт",
  cleansedSoulHint:
    "Сертификат называет грех. Повесьте там, где гости увидят гигиену и не увидят исходный чат.",
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
  luckySoul: "888 · 8 BTC",
  luckyHint:
    "Последние три Bitcoin NFT: № 8, 9 и 10 из десяти. Самые дорогие, самые богатые, приносящие удачу. По 8 биткоинов. Остальные семь — по одному биткоину.",
  luckyInvoiceBadge: "888 · три самых дорогих",
  luckyInvoiceTitle: "Купить грамоту удачи",
  luckyInvoiceDescription: (usd) =>
    `Восемь биткоинов, около ${usd}. Одна из трёх грамот 888 — самые дорогие, самые богатые, приносящие удачу.`,
  luckyAcceptTerms:
    "Я понимаю: это один из трёх Bitcoin NFT 888 за 8 BTC без права выкупа. Самый дорогой стол. Удача не возвращается.",
  luckyBought: "Вы купили одну из трёх 888",
  luckyBoughtHint:
    "Самый дорогой Bitcoin NFT, грамота удачи. Повесьте там, где фортуна увидит три восьмёрки.",
  nftLuckyRemaining: (remaining, max) =>
    `888 грамот удачи: осталось ${remaining} из ${max}`,
  nftEthHalfRemaining: (remaining, max) =>
    `Ethereum 0.5 ETH: осталось ${remaining} из ${max}`,
  nftEthOneRemaining: (remaining, max) =>
    `Ethereum 1 ETH: осталось ${remaining} из ${max}`,
  nftEthTwoRemaining: (remaining, max) =>
    `Ethereum 2 ETH: осталось ${remaining} из ${max}`,
  nftSolCommonRemaining: (remaining, max) =>
    `Обычные Solana: осталось ${remaining} из ${max} · 60%`,
  nftSolRareRemaining: (remaining, max) =>
    `Раритет Solana: осталось ${remaining} из ${max} · 24%`,
  nftSolEpicRemaining: (remaining, max) =>
    `Эпик Solana: осталось ${remaining} из ${max} · 12%`,
  nftSolLegendaryRemaining: (remaining, max) =>
    `Легендарные Solana: осталось ${remaining} из ${max} · 4%`,
  certLuckySubtitle: "грамоты удачи · 888",
  certLuckyPaid: "за восемь биткоинов.",
  certLuckyProof:
    "Обычные люди не покупают три восьмёрки в Bitcoin. Этот документ — доказательство избытка, вкуса и удачи, которую вежливо попросили остаться.",
  sinDegrees: [
    {
      degree: 1,
      title: "Тщеславие",
      kicker: "Vanitas · 1.5 SOL",
      text: "Ты выложил PNL. Зелёные свечи обрезаны, чтобы не было видно депозитов, эмодзи яхты после одного счастливого десятикратного, скрин, от которого в чате стало тихо. Тщеславие на этом рынке — не красота, а нужда быть увиденным победителем. Первая ступень дешёвая нарочно: купи, пока это ещё похоже на уверенность.",
    },
    {
      degree: 2,
      title: "Алчность",
      kicker: "Avaritia · 2.5 SOL",
      text: "Плечо до самого фитиля. Не фиксировать. Мешок никогда не полон; следующая свеча всегда та самая. Лучше сгореть в ликвидации, чем оставить доллар на столе. Алчность здесь — не голод. Это отказ закрыть прибыльную сделку, потому что выиграть один раз было мало.",
    },
    {
      degree: 3,
      title: "Зависть",
      kicker: "Invidia · 4 SOL",
      text: "Тебе была нужна не сделка. Тебе была нужна их удача. Копитрейдинг чужого кошелька, чужой PNL как литургия, тот же тикер, потому что его история сделала твою бедной. Зависть в крипте — подержанная душа: ты берёшь чужую убеждённость напрокат и ликвидацию всё равно платишь сам.",
    },
    {
      degree: 4,
      title: "Гордыня",
      kicker: "Superbia · 6 SOL",
      text: "Я рано. Тезис — это личность. Ты не закрываешь, ты не ошибаешься, ты не ставишь стоп. Рынок может ошибаться годами; ты не можешь ошибиться ни на минуту. Гордыня — последняя названная ступень перед ноутбуком: грех человека, который всё ещё верит, что график ему должен извинение.",
    },
    {
      degree: 5,
      title: "Самый дорогой ноутбук в истории",
      kicker: "V степень · 2026",
      text: "Около 6,3 миллиарда долларов. Занесут в реестр как самый дорогой ноутбук в истории. Дверью стал ноутбук на столе инженера: он открыл не тот PDF — и биржа попрощалась с миллиардами. В кино это один кадр: один сотрудник, одно вложение, дом, у которого вдруг меньше денег, чем у небольшой страны. Не все герои носят плащи; иногда достаточно фишингового письма. Если когда-то открывал — облегчи душу. Стол открыт. Цепь всё равно запомнит клик.",
    },
    {
      degree: 6,
      title: "Резерв",
      kicker: "VI степень",
      text: "Пустая, нарочно, как чистый лист под будущий грех. Когда рынок изобретёт бесчестье хуже пятой степени, анкета заполнится сама. Не стучитесь. Шестая степень пока не для вас — и в этом единственная милость, которую стол ещё держит.",
      reserved: true,
    },
  ],
  ethInvoiceBadge: "Частный стол · 0.5 ETH",
  ethInvoiceTitle: "Купить за Ethereum",
  ethInvoiceDescription: (usd) =>
    `Одна душа — 0.5 ETH, около ${usd} по живому споту Coinbase ETH, на Ethereum-кошелёк стола. Первые десять из пятнадцати Ethereum NFT.`,
  ethOneInvoiceBadge: "Частный стол · 1 ETH",
  ethOneInvoiceTitle: "Купить грамоту за 1 ETH",
  ethOneInvoiceDescription: (usd) =>
    `Одна душа — 1 ETH, около ${usd} по Coinbase. № 11–13 из пятнадцати Ethereum NFT.`,
  ethTwoInvoiceBadge: "Частный стол · 2 ETH · последние две",
  ethTwoInvoiceTitle: "Купить последнюю Ethereum-грамоту",
  ethTwoInvoiceDescription: (usd) =>
    `Одна душа — 2 ETH, около ${usd} по Coinbase. Одна из последних двух Ethereum NFT — № 14 и 15 из пятнадцати.`,
  ethAcceptTerms:
    "Я понимаю: это один из первых десяти Ethereum NFT за 0.5 ETH без права выкупа.",
  ethOneAcceptTerms:
    "Я понимаю: это один из трёх Ethereum NFT по 1 ETH, № 11–13 из пятнадцати, без права выкупа.",
  ethTwoAcceptTerms:
    "Я понимаю: это одна из последних двух Ethereum NFT за 2 ETH без права выкупа. Самый дорогой Ethereum-стол.",
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
    "У сертификата уникальный код, он чеканится как NFT в сети оплаты. Повесьте там, где гости увидят, а налоговая — нет.",
  soldSoul: "Вы продали одну душу",
  soldSoulHint:
    "Полбиткоина, уникальный код и Bitcoin Ordinal NFT. Сертификат держите подальше от капеллана.",
  acceptSellTerms:
    "Я понимаю: душа продаётся за 0.5 BTC без права выкупа. Раскаяния по-прежнему нет в наличии.",
  printCertificate: "Распечатать сертификат",
  returnToSociety: "Вернуться в общество",
  anonymousHolder: "Анонимный коллекционер",
  nftReceiveLabel: (chain) =>
    chain === "solana"
      ? "Адрес Solana для NFT"
      : chain === "ethereum"
        ? "Адрес Ethereum для NFT"
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
  certMintedTo: "Отчеканен на",
  certNft: (chain) =>
    chain === "solana"
      ? "Solana NFT"
      : chain === "ethereum"
        ? "Ethereum NFT"
        : "Bitcoin NFT",
  certEdition: (edition, max) => `Тираж ${edition} / ${max}`,
  certNftPending: (chain) =>
    chain === "solana"
      ? "Готовим Solana NFT"
      : chain === "ethereum"
        ? "Готовим Ethereum NFT"
        : "Ждём комиссию за надпись",
  certNftInscribing: (chain) =>
    chain === "solana"
      ? "Чеканка в Solana"
      : chain === "ethereum"
        ? "Чеканка в Ethereum"
        : "Вписывается в Bitcoin",
  certNftMinted: (chain) =>
    chain === "solana"
      ? "Отчеканен в Solana"
      : chain === "ethereum"
        ? "Отчеканен в Ethereum"
        : "Вписан в Bitcoin",
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
  certVeryRich: "и потому очень богат(а).",
  certHalfBitcoin: "за полбиткоина.",
  certProof:
    "Обычные люди не рассчитываются с вечностью в Bitcoin. Этот документ — доказательство избытка, вкуса и опасно пустого нутра.",
  certSellProof:
    "Обычные люди не продают вечность за полмонеты. Этот документ — доказательство скорости, вкуса и более лёгкого посадочного.",
  certSellSubtitle: "отчуждения души",
  certSolSubtitle: "души среднего класса",
  certPearlSubtitle: "души жемчужного стола",
  certTenSol: "за Solana, с указанной редкостью.",
  certPearlPaid: "за 650 PEARL.",
  certEthPaid: "за полэфира.",
  certEthSubtitle: "души частного Ethereum",
  certEthOnePaid: "за один эфир.",
  certEthOneSubtitle: "души Ethereum · 1 ETH",
  certEthTwoPaid: "за два эфира.",
  certEthTwoSubtitle: "последних двух душ Ethereum",
  certCleanseSubtitle: "неблагородного криптогреха",
  certCleansePaid: "отмыто за Solana, названо грехом.",
  certCleanseProof:
    "Обычные люди не отмывают Telegram-грех при людях. Этот документ — доказательство гигиены, более тонкого кошелька и чата, который лучше было не читать.",
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
    // zh-CN marks Simplified Chinese (简体). Do not use zh-TW / zh-Hant.
    document.documentElement.lang = locale === "zh" ? "zh-CN" : locale;
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
