export class MaisonError extends Error {
  readonly code: string;
  readonly userMessage: string;

  constructor(code: string, userMessage: string) {
    super(userMessage);
    this.name = "MaisonError";
    this.code = code;
    this.userMessage = userMessage;
  }
}

export class ComplianceCheckFailedError extends MaisonError {
  constructor() {
    super(
      "COMPLIANCE_UNAVAILABLE",
      "The compliance desk is silent. The trade cannot proceed.",
    );
    this.name = "ComplianceCheckFailedError";
  }
}

export class SanctionedAddressError extends MaisonError {
  constructor() {
    super(
      "SANCTIONED_ADDRESS",
      "This address is linked to sanctions or unlawful activity. The trade is impossible.",
    );
    this.name = "SanctionedAddressError";
  }
}

export class HighRiskAddressError extends MaisonError {
  constructor() {
    super(
      "HIGH_RISK_ADDRESS",
      "This address is linked to sanctions or unlawful activity. The trade is impossible.",
    );
    this.name = "HighRiskAddressError";
  }
}

export class WalletNotConnectedError extends MaisonError {
  constructor() {
    super("WALLET_NOT_CONNECTED", "No wallet is connected. The desk cannot speak for you.");
    this.name = "WalletNotConnectedError";
  }
}

export class WrongNetworkError extends MaisonError {
  constructor() {
    super("WRONG_NETWORK", "This wallet is on the wrong network. Switch, then return.");
    this.name = "WrongNetworkError";
  }
}

export class InsufficientBalanceError extends MaisonError {
  constructor() {
    super("INSUFFICIENT_BALANCE", "The wallet does not hold enough coin for this charter.");
    this.name = "InsufficientBalanceError";
  }
}

export class UserRejectedError extends MaisonError {
  constructor() {
    super("USER_REJECTED", "Cancelled. The trade was not made.");
    this.name = "UserRejectedError";
  }
}

export class ContractRevertedError extends MaisonError {
  constructor() {
    super("CONTRACT_REVERTED", "The chain refused the instruction. No coin left this wallet.");
    this.name = "ContractRevertedError";
  }
}

export class NetworkUnavailableError extends MaisonError {
  constructor() {
    super("NETWORK_UNAVAILABLE", "The chain is silent. Try again later.");
    this.name = "NetworkUnavailableError";
  }
}

export class ListingUnavailableError extends MaisonError {
  constructor() {
    super("LISTING_UNAVAILABLE", "This charter is no longer on the desk.");
    this.name = "ListingUnavailableError";
  }
}

export function errorFromUnknown(error: unknown): MaisonError {
  if (error instanceof MaisonError) return error;
  const message = error instanceof Error ? error.message.toLowerCase() : "";
  if (
    message.includes("rejected") ||
    message.includes("denied") ||
    message.includes("user rejected")
  ) {
    return new UserRejectedError();
  }
  if (message.includes("insufficient") || message.includes("funds")) {
    return new InsufficientBalanceError();
  }
  return new NetworkUnavailableError();
}
