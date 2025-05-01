import { ImmutableOrder, OrderSide } from "../ic/declarations/orderbook/orderbook.did";

export const decimals = 100_000_000;

export const convertNanoSecondsToDate = (nanoSeconds: bigint) => {
  return new Date(Number(nanoSeconds / 1_000_000n));
};

export const getProportionFilled = (order: ImmutableOrder) => {
  return (
    Number(order.initialContracts - order.currentContracts) /
    Number(order.initialContracts)
  );
};