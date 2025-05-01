import "dotenv/config";
import { ImmutableOrder, OrderBookResponse, PlaceOrder } from "./ic/declarations/orderbook/orderbook.did";
import * as event from "./ic/api/event";
import { decimals } from "./utils/icHelper";
import axios from "axios";
import { EventCanister } from "./models/events";

const GAME_CONTROLLER_HOST = process.env.GAME_CONTROLLER_HOST;

export const getMyOrders = async (
  marketId: number,
  canisterID: string
) => {
  const orders = await event.getBotsOrders(
    canisterID,
  );
  return orders;
};

export const getMyOrdersForSpecificMarket = async (
  marketId: number,
  canisterID: string
) => {
  const orders = await event.getBotsOrdersByMarket(
    canisterID,
    BigInt(marketId)
  );
  return orders;
};

export const placeBet = async (
  marketId: number,
  buyOrSell: { buy: null } | { sell: null },
  odds: number,
  contracts: number,
  canisterID: string
): Promise<ImmutableOrder> => {
  const placeOrder: PlaceOrder = {
    odds: BigInt(decimals * odds),
    side: buyOrSell,
    contracts: BigInt(contracts),
  };
  const placedOrder: ImmutableOrder = await event.placeBet(
    canisterID,
    BigInt(marketId),
    placeOrder
  );
  return placedOrder;
};

export const cancelBet = async (
  orderId: string,
  canisterID: string
) => {
  const refundAmount = await event.cancelBet(canisterID, orderId);
  return refundAmount;
};

export const updateBet = async (
  orderId: string,
  canisterID: string,
  odds: number
) => {
  const updatedOrder = await event.updateOrder(canisterID, orderId, odds);
  return updatedOrder;
};

export const getOrder = async (
  orderId: string,
  canisterID: string
) => {
  const order = await event.getOrder(canisterID, orderId);
  return order;
};

export const fetchOrderBook = async (
  marketId: number,
  canisterID: string
): Promise<OrderBookResponse | []> => {

  const orderBook = await event.fetchOrderBook(BigInt(marketId), canisterID);
  return orderBook;
};

export const getStoredEvents = async (queryParams?: URLSearchParams) => {
  const url = `${GAME_CONTROLLER_HOST}/events/stored`;

  const eventsResponse = await axios.get(url, {
    params: queryParams,
  });
  const events: EventCanister[] = eventsResponse.data;
  return events;
};
