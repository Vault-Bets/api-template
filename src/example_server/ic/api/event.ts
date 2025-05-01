import { initializeEvent } from "../createActor/event";
import {
  OrderBooksResponse,
  OrderBookResponse,
  PlaceOrder,
  ImmutableOrder,
} from "../declarations/orderbook/orderbook.did";
import { roundToNearestFiveMillion, stringifyJson } from "../../utils/utils";
import { scaleUpOdds } from "../../utils/oddsHelper";
import { Principal } from "@dfinity/principal";

/**
 * Fetches the order books for an event
 *
 * @param canisterID - The canister ID of the event
 *
 * @returns The order books for all the markets on the event
 */
export const fetchOrderBooks = async (
  canisterID: string
): Promise<OrderBooksResponse> => {
  const eventActor = await initializeEvent(canisterID);
  try {
    const orderBooks: OrderBooksResponse = await eventActor.getOrderBooks();
    return orderBooks;
  } catch (error) {
    const message = `[${canisterID}] Error fetching order books: ${error}`;
    console.error(message)
    throw error;
  }
};

/**
 * Fetches the order book for an event
 *
 * @param canisterID - The canister ID of the event
 * @param marketId - The id of the market
 *
 * @returns The order book for a given market
 */
export const fetchOrderBook = async (marketId: bigint, canisterID: string) => {
  const eventActor = await initializeEvent(canisterID);
  console.debug(`[${canisterID}, ${marketId}] Fetching order book for market`);
  try {
    // @ts-expect-error OrderBookResponse is not typed correctly
    const orderBook: [] | OrderBookResponse = await eventActor.getOrderBook(
      marketId
    );
    console.info(`[${canisterID}, ${marketId}] Successfully fetched order book`);
    return orderBook;
  } catch (error) {
    const message = `[${canisterID}, ${marketId}] Error fetching order book: ${error}`;
    console.error(message);
    throw error;
  }
};

export const placeBet = async (
  canisterID: string,
  marketId: bigint,
  order: PlaceOrder,
) => {
  const eventActor = await initializeEvent(canisterID);
  const side = Object.keys(order)[0];
  console.debug(`[${canisterID}, ${marketId}] Placing bet on side ${side}`);
  try {
    // @ts-expect-error PlaceOrderResult is not typed correctly
    const immutableOrder: ImmutableOrder = await eventActor.placeOrder(
      marketId,
      order
    );
    if (immutableOrder === null) {
      const message = `[${canisterID}, ${marketId}, ${side}] placeOrder on event canister failed`;
      console.error(message);
      throw new Error(message);
    }
    console.info(
      `[${canisterID}, ${marketId}, ${side}] Successfully placed bet ${immutableOrder.id}`
    );
    return immutableOrder;
  } catch (error) {
    const message = `[${canisterID}, ${marketId}, ${side}] Error placing bet: ${stringifyJson(error)}`;
    console.error(message);
    throw error;
  }
};

export const cancelBet = async (
  canisterID: string,
  orderId: string,
): Promise<number> => {
  const eventActor = await initializeEvent(canisterID);
  console.debug(`[${canisterID}, ${orderId}] Cancelling bet`);
  try {
    const refundAmount = await eventActor.cancelOrder(orderId);
    console.info(`[${canisterID}, ${orderId}] Successfully cancelled bet`);
    return Number(refundAmount);
  } catch (error) {
    const stringifiedError = stringifyJson(error);
    const message = `[${canisterID}, ${orderId}] Error cancelling bet: ${stringifiedError}`;
    console.error(message);

    throw error;
  }
};

export const updateOrder = async (
  canisterID: string,
  orderId: string,
  newOdds: number,
) => {
  const eventActor = await initializeEvent(canisterID);
  console.debug(`[${canisterID}, ${orderId}] Updating order odds to ${newOdds}`);
  try {
    // @ts-expect-error UpdateOrderResult is not typed correctly
    const immutableOrder: ImmutableOrder = await eventActor.updateOrder(
      orderId,
      BigInt(roundToNearestFiveMillion(scaleUpOdds(newOdds)))
    );
    console.info(
      `[${canisterID}, ${orderId}] Updated odds. Result: ${stringifyJson({
        id: immutableOrder.id,
        premium: immutableOrder.premium,
        marketId: immutableOrder.marketId,
        side: Object.keys(immutableOrder.side)[0],
        initialContracts: immutableOrder.initialContracts,
        stake: immutableOrder.stake,
      })}`
    );
    return immutableOrder;
  } catch (error) {
    const message = `[${canisterID}, ${orderId}] Error updating order odds: ${stringifyJson(
      error
    )}`;
    console.error(message);
    throw error;
  }
};

export const getBotsOrdersByMarket = async (
  canisterID: string,
  marketId: bigint,
): Promise<Array<ImmutableOrder>> => {
  const eventActor = await initializeEvent(canisterID);
  console.debug(
    `[${canisterID}, ${marketId}] Getting bot orders for tradingBot for market`
  );
  try {
    const immutableOrders: Array<ImmutableOrder> =
      await eventActor.getUserOrdersByMarket(marketId);
    console.info(
      `[${canisterID}, ${marketId}] Got ${immutableOrders.length} bot orders on specific market`
    );
    return immutableOrders;
  } catch (error) {
    const message = `[${canisterID}, ${marketId}] Error fetching bot orders: ${stringifyJson(
      error
    )}`;
    console.error(message);
    throw new Error("Failed to retrieve bot orders");
  }
};

export const getBotsOrders = async (canisterID: string) => {
  const eventActor = await initializeEvent(canisterID);
  console.debug(`[${canisterID}] Getting all bot orders for tradingBot`);
  const immutableOrders: Array<ImmutableOrder> =
    await eventActor.getUserOrders();
  console.info(
    `[${canisterID}] Got all bot orders of length: ${immutableOrders.length}`
  );
  return immutableOrders;
};

export const getOrder = async (
  canisterID: string,
  orderId: string
): Promise<ImmutableOrder> => {
  const eventActor = await initializeEvent(canisterID);
  console.debug(`[${canisterID}, ${orderId}] Getting order ${orderId}`);
  // @ts-expect-error GetOrderResult is not typed correctly
  const order: ImmutableOrder = await eventActor.getOrder(orderId);
  return order;
};

export const validateBetMatch = async (
  canisterID: string,
  marketId: bigint,
  order: PlaceOrder,
  principal: Principal
) => {
  const eventActor = await initializeEvent(canisterID);
  console.debug(`[${canisterID}] Validating bet match`);
  try {
    const betMatch = await eventActor.validateFreeBetOrder(
      marketId,
      order,
      principal
    );
    return betMatch;
  } catch (error) {
    const message = `[${canisterID}, ${principal}] Error validating bet match: ${stringifyJson(
      error
    )}`;
    console.error(message);
    return error;
  }
};
