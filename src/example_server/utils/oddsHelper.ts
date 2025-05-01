import { ImmutableOrder } from "../ic/declarations/orderbook/orderbook.did";
import { decimals } from "./icHelper";
import {roundToNearest05 } from "./utils";

export const NORMALISING_FACTOR = 100_000;

export function getOdds(premium: number) {
  const odds = 1 / premium;
  return odds;
}

export function getPremium(odds: number) {
  return 1 / odds;
}

export function getContractsFromStake(
  odds: number,
  stake: number,
  betSide: string
) {
  let contracts: number;

  if (betSide === "buy") {
    contracts = stake * odds;
  } else {
    const premium = 1 - getPremium(odds);
    contracts = stake / premium;
  }
  // TODO: Add validation that makes sure stake always results in contracts close to this number
  // Simply make sure stake is within these intervals (100000 Contracts) and big enough
  return scaleUpContracts(contracts);
}

// Calculate original stake from order or if cancelled, calculate amount of stake that was matched
export const calculateOrderStake = (order: ImmutableOrder): number => {
  let stake: number;

  const status = Object.keys(order.status)[0];
  const contractsScaled =
    status === "cancelled"
      ? Number(order.initialContracts - order.currentContracts)
      : Number(order.initialContracts);

  const scaledDownContracts = scaleDownContracts(contractsScaled);

  let scaledDownPremium = scaleDownPremium(Number(order.premium));
  if (Object.keys(order.side)[0] === "buy") {
    stake = scaledDownContracts * scaledDownPremium;
  } else {
    scaledDownPremium = 1 - scaledDownPremium;
    stake = scaledDownContracts * scaledDownPremium;
  }
  return stake;
};

export const getContractsFromPremium = (
  stake: number,
  premium: number
): number => {
  return scaleUpContracts(stake / premium);
};

export const calculateStakeFromOrder = (order: ImmutableOrder): number => {
  const premium = scaleDownPremium(Number(order.premium));
  if (Object.keys(order.side)[0] === "buy") {
    return premium * scaleDownContracts(Number(order.currentContracts));
  } else {
    return (1 - premium) * scaleDownContracts(Number(order.currentContracts));
  }
};

export function getStakeFromOdds(
  odds: number,
  contracts: number,
  betSide: string
): number {
  if (odds === 0) return 0;

  let stake: number;
  if (betSide === "buy") {
    stake = contracts / odds;
  } else {
    const premium = 1 - getPremium(odds);
    stake = contracts * premium;
  }
  return stake;
}

export const scaleUpContracts = (contracts: number): number => {
  return contracts * decimals * NORMALISING_FACTOR;
};

export const scaleDownContracts = (contracts: number): number => {
  return contracts / (decimals * NORMALISING_FACTOR);
};

export const scaleUpStake = (stake: number): number => {
  return stake * decimals;
};

export const scaleDownStake = (stake: number): number => {
  return stake / (decimals);
};


export const scaleUpOdds = (odds: number): number => {
  return odds * decimals;
};

export const scaleDownOdds = (odds: number): number => {
  return odds / decimals;
};

export const scaleDownPremium = (premium: number): number => {
  return premium / decimals;
};

export const scaleUpPremium = (premium: number): number => {
  return premium * decimals;
};
