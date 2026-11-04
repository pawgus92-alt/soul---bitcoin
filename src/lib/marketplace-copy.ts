import { useI18n, type Locale } from "@/lib/i18n";

export type MarketplaceCopy = {
  nav: string;
  kicker: string;
  heading: string;
  formula: string;
  custody: string;
  cryptoOnly: string;
  screening: string;
  fee: string;
  returnDesk: string;
  empty: string;
  remaining: (n: number, max: number) => string;
  seller: string;
  buy: string;
  notOffered: string;
  connectTitle: string;
  connectBody: string;
  connectEth: string;
  connectSol: string;
  connectBtc: string;
  noWallet: string;
  metamaskLink: string;
  phantomLink: string;
  xverseLink: string;
  disconnect: string;
  networkTitle: string;
  confirmTitle: string;
  confirmBody: string;
  confirmWallet: string;
  cancel: string;
  screeningWait: string;
  doneTitle: string;
  doneBody: string;
  close: string;
  listedAs: string;
  protocolFee: string;
};

const en: MarketplaceCopy = {
  nav: "Vitrine",
  kicker: "Non-custodial desk",
  heading: "The house is a vitrine. It is not a vault.",
  formula: "The platform does not hold your funds. Your keys remain only with you. We cannot freeze, return, or take your assets, because we do not have them.",
  custody: "Every trade is signed in your wallet and paid directly to the seller. The house has no deposit, no withdrawal, and no inner balance.",
  cryptoOnly:
    "The desk works only with cryptocurrency. Bank transfers and cards are not accepted. If you hold none, acquire it on a regulated exchange such as Kraken or Bitstamp, then return.",
  screening:
    "Each address is screened for sanctions and unlawful activity. This is not identity verification. The house does not keep passports.",
  fee: "Protocol fee: none. Zero basis points. The seller receives the recorded price.",
  returnDesk: "Return to the desk",
  empty: "No charters are listed.",
  remaining: (n, max) => `remaining ${n} of ${max}`,
  seller: "Seller",
  buy: "Acquire",
  notOffered: "Not offered at the desk.",
  connectTitle: "Connect a wallet",
  connectBody: "The house never holds the keys. Choose the wallet that will sign.",
  connectEth: "Ethereum wallet",
  connectSol: "Solana wallet",
  connectBtc: "Bitcoin wallet",
  noWallet: "No browser wallet was found. Open the wallet application.",
  metamaskLink: "Open MetaMask",
  phantomLink: "Open Phantom",
  xverseLink: "Open Xverse",
  disconnect: "Disconnect",
  networkTitle: "This wallet is on the wrong network. Switch, then return.",
  confirmTitle: "Confirm in the wallet",
  confirmBody: "Coin travels from you to the seller. The house does not stand in the middle.",
  confirmWallet: "Sign in wallet",
  cancel: "Withdraw the hand",
  screeningWait: "The address is being read on the chain.",
  doneTitle: "The trade is complete.",
  doneBody:
    "The asset moved directly from seller to you. The house held no funds at any stage.",
  close: "Close",
  listedAs: "Listed as",
  protocolFee: "Protocol fee 0.",
};

const ru: MarketplaceCopy = {
  nav: "Витрина",
  kicker: "Некастодиальный стол",
  heading: "Дом — витрина. Он не склеп для чужих ключей.",
  formula:
    "Платформа не хранит ваши средства. Ваши ключи — только у вас. Мы не можем заморозить, вернуть или украсть ваши активы, потому что у нас их нет.",
  custody:
    "Каждая сделка подписывается в вашем кошельке и оплачивается напрямую продавцу. У дома нет депозита, нет вывода и нет внутреннего баланса.",
  cryptoOnly:
    "Платформа работает только с криптовалютой. Мы не принимаем банковские переводы и карты. Если у вас нет криптовалюты — приобретите её на регулируемой бирже (например, Kraken или Bitstamp), а затем вернитесь.",
  screening:
    "Каждый адрес проверяется на санкции и незаконную деятельность. Это не проверка личности. Дом не хранит паспорта.",
  fee: "Комиссия протокола: нет. Ноль базисных пунктов. Продавец получает записанную цену.",
  returnDesk: "К столу",
  empty: "Грамот на витрине нет.",
  remaining: (n, max) => `осталось ${n} из ${max}`,
  seller: "Продавец",
  buy: "Принять",
  notOffered: "У стола не предлагается.",
  connectTitle: "Подключить кошелёк",
  connectBody: "Дом ключи не держит. Выберите кошелёк, который будет подписывать.",
  connectEth: "Кошелёк Ethereum",
  connectSol: "Кошелёк Solana",
  connectBtc: "Кошелёк Bitcoin",
  noWallet: "Браузерный кошелёк не найден. Откройте приложение кошелька.",
  metamaskLink: "Открыть MetaMask",
  phantomLink: "Открыть Phantom",
  xverseLink: "Открыть Xverse",
  disconnect: "Отключить",
  networkTitle: "Этот кошелёк в другой сети. Переключитесь и вернитесь.",
  confirmTitle: "Подтвердить в кошельке",
  confirmBody: "Монета идёт от вас к продавцу. Дом не стоит посередине.",
  confirmWallet: "Подписать в кошельке",
  cancel: "Убрать руку",
  screeningWait: "Адрес читается по цепи.",
  doneTitle: "Сделка завершена.",
  doneBody:
    "Актив перешёл напрямую от продавца к вам. Платформа не хранила средства ни на одном этапе.",
  close: "Закрыть",
  listedAs: "Записано как",
  protocolFee: "Комиссия протокола 0.",
};

const zh: MarketplaceCopy = {
  nav: "橱窗",
  kicker: "非托管柜台",
  heading: "宅邸是橱窗。不是替人保管钥匙的墓室。",
  formula: "平台不保管你的资金。钥匙只在你处。我们无法冻结、退回或取走你的资产，因为我们并不持有它们。",
  custody: "每笔交易在你的钱包中签署，并直接付给卖方。宅邸没有充值、没有提现、没有内部余额。",
  cryptoOnly:
    "本柜台只接受加密货币。不接受银行转账与银行卡。若你没有加密货币，请先在受监管的交易所（如 Kraken 或 Bitstamp）取得，然后再来。",
  screening: "每个地址都会筛查制裁与不法活动。这不是身份核验。宅邸不保存护照。",
  fee: "协议费用：无。零个基点。卖方收到所登记的价格。",
  returnDesk: "返回柜台",
  empty: "橱窗上没有文书。",
  remaining: (n, max) => `余 ${n} / ${max}`,
  seller: "卖方",
  buy: "受领",
  notOffered: "柜台不提供。",
  connectTitle: "连接钱包",
  connectBody: "宅邸从不持有钥匙。选择将要签署的钱包。",
  connectEth: "以太坊钱包",
  connectSol: "Solana 钱包",
  connectBtc: "比特币钱包",
  noWallet: "未发现浏览器钱包。请打开钱包应用。",
  metamaskLink: "打开 MetaMask",
  phantomLink: "打开 Phantom",
  xverseLink: "打开 Xverse",
  disconnect: "断开",
  networkTitle: "此钱包不在正确网络。请切换后再来。",
  confirmTitle: "在钱包中确认",
  confirmBody: "钱币从你流向卖方。宅邸不站在中间。",
  confirmWallet: "在钱包中签名",
  cancel: "收回手",
  screeningWait: "正在链上读取该地址。",
  doneTitle: "交易已完成。",
  doneBody: "资产已从卖方直接转到你处。平台在任何阶段都未保管资金。",
  close: "关闭",
  listedAs: "登记为",
  protocolFee: "协议费 0。",
};

const PACKS: Record<Locale, MarketplaceCopy> = { en, ru, zh };

export function useMarketplaceCopy() {
  const { locale } = useI18n();
  return PACKS[locale] ?? en;
}
