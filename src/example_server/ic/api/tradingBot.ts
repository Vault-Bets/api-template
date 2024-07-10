import { initializeTradingBot } from '../createActor/tradingBot';
import { PlaceOrder, ImmutableOrder } from '../declarations/tradingBot/tradingBot.did';
import { Principal } from '@dfinity/principal';
import { stringifyJson } from '../../utils/utils';


/**
 * Sends request to trading bot cansiter to place a bet
 *
 * @param eventCansisterId - The canister ID of the event
 * @param marketId - The ID of the market
 * @param placeOrder - The order to place
 *
 * @returns The order books for all the markets on the event
 */
export const placeBet = async (
  eventCansisterId: string,
  marketId: bigint,
  placeOrder: PlaceOrder

): Promise<ImmutableOrder> => {
  const tradingBot = await initializeTradingBot(process.env.TRADING_BOT_CANISTER_ID!);
  console.info(`Placing bet for market ${marketId} on event ${eventCansisterId}`);
  // @ts-expect-error icblast is not typed
  const placeBetResult: ImmutableOrder = await tradingBot.placeBet(
    Principal.fromText(eventCansisterId),
    marketId,
    placeOrder
  );
  console.info(`Placed bet for market ${marketId} on event ${eventCansisterId}. Result: ${stringifyJson(placeBetResult)}`);
  return placeBetResult;
};

/**
 * Sends request to trading bot cansiter to cancel a bet
 *
 * @param eventCansisterId - The canister ID of the event
 * @param marketId - The ID of the market
 * @param orderId - The orderId to cancel
 *
 * @returns The order books for all the markets on the event
 */
export const cancelBet = async (
  eventCansisterId: string,
  marketId: bigint,
  orderId: string

): Promise<number> => {
  const tradingBot = await initializeTradingBot(process.env.TRADING_BOT_CANISTER_ID!);
  console.info(`Cancelling bet ${orderId} for market ${marketId} on event ${eventCansisterId}`);
  const refundAmount: number = Number(await tradingBot.cancelBet(
    Principal.fromText(eventCansisterId),
    marketId,
    orderId
  ));
  console.info(`Cancelled bet ${orderId} for market ${marketId} on event ${eventCansisterId}. refund amount: ${refundAmount}`);
  return refundAmount;
};


/**
 * Gets the tradingBots open orders
 *
 * @param eventCansisterId - The canister ID of the event
 * @param marketId - The ID of the market
 *
 * @returns The order books for all the markets on the event
 */
export const getBotsOrders = async (
  eventCansisterId: string,
  marketId: bigint,

): Promise<Array<ImmutableOrder>> => {
  console.log(`Getting bot orders for tradingBot Canister ID ${process.env.TRADING_BOT_CANISTER_ID}`);
  const tradingBot = await initializeTradingBot(process.env.TRADING_BOT_CANISTER_ID!);
  const orders: Array<ImmutableOrder>  = await tradingBot.getBotsOrders(
    Principal.fromText(eventCansisterId),
    marketId,
  );
  return orders;
};