import "dotenv/config";
import { OrderBookResponse } from "./ic/declarations/orderbook/orderbook.did";
import * as tradingBot from "./ic/api/tradingBot";
import * as event from "./ic/api/event";
import { decimals } from "./utils/icHelper";
import {
  ImmutableOrder,
  PlaceOrder,
} from "./ic/declarations/tradingBot/tradingBot.did";
import { getEnvVar } from "./utils/utils";
import axios from "axios";
import { EventCanister } from "./models/events";

const GAME_CONTROLLER_HOST = getEnvVar("GAME_CONTROLLER_HOST");

export const getTradingBotOrders = async (
  marketId: number,
  canisterID: string
) => {
  const tradingBotOrders = await tradingBot.getBotsOrders(
    canisterID,
    BigInt(marketId)
  );
  return tradingBotOrders;
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
  const placedOrder: ImmutableOrder = await tradingBot.placeBet(
    canisterID,
    BigInt(marketId),
    placeOrder
  );
  return placedOrder;
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
