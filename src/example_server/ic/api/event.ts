import { initializeEvent } from '../createActor/event';
import {
  OrderBooksResponse, OrderBookResponse
} from '../declarations/orderbook/orderbook.did';

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
  const orderBooks: OrderBooksResponse = await eventActor.getOrderBooks();

  return orderBooks;
};

/**
 * Fetches the order book for an event
 *
 * @param canisterID - The canister ID of the event
 * @param marketId - The id of the market
 *
 * @returns The order book for a given market
 */
export const fetchOrderBook = async (
  marketId: bigint,
  canisterID: string
) => {
  const eventActor = await initializeEvent(canisterID);
  // @ts-expect-error OrderBookResponse is not typed correctly
  const orderBook: [] | OrderBookResponse = await eventActor.getOrderBook(marketId);

  return orderBook;
};
