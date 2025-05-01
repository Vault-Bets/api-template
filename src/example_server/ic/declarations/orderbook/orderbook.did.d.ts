import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type BetType = string;
export interface BetTypeTradedAmount {
  betType: BetType;
  amount: bigint;
}
export type CancelOrderReceipt = { Ok: bigint } | { Err: string };
export interface DetailsForOrderPlacedEvent {
  order: ImmutableOrder;
  topSellOrder: [] | [OrderBookPricePoint];
  topBuyOrder: [] | [OrderBookPricePoint];
}
export type EnvVariant =
  | { IC: string }
  | { Local: string }
  | { Development: string }
  | { Staging: string };
export interface Event {
  cancelOrder: ActorMethod<[OrderID], CancelOrderReceipt>;
  endEvent: ActorMethod<[InitEventDetails], EventEndData>;
  getAdmins: ActorMethod<[], Array<Principal>>;
  getAllCreatedOrders: ActorMethod<[], Array<ImmutableOrder>>;
  getAllFullyUpdatedOrders: ActorMethod<[], Array<ImmutableOrder>>;
  getAllMatchedOrders: ActorMethod<[], Array<MatchedOrder>>;
  getBetTypeTradedAmount: ActorMethod<[BetType], bigint>;
  getCaller: ActorMethod<[], Principal>;
  getCommission: ActorMethod<[], bigint>;
  getDetailsForOrderPlacedEvent: ActorMethod<
    [string],
    [] | [DetailsForOrderPlacedEvent]
  >;
  getEventDetails: ActorMethod<[], InitEventDetails>;
  getEventStatsData: ActorMethod<[[] | [bigint]], [] | [EventStatsData]>;
  getFullyUpdatedOrders: ActorMethod<
    [bigint, bigint],
    Array<FinalisedCreatedBet>
  >;
  getGraphData: ActorMethod<[], Array<GraphData>>;
  getMarketMakerPrincipals: ActorMethod<[], Array<Principal>>;
  getMarketNames: ActorMethod<[], Array<string>>;
  getMarketTradedAmount: ActorMethod<[MarketID], bigint>;
  getMatchedOrder: ActorMethod<[string], [] | [MatchedOrder]>;
  getOrder: ActorMethod<[string], [] | [ImmutableOrder]>;
  getOrderBook: ActorMethod<[MarketID], [] | [OrderBookResponse]>;
  getOrderBooks: ActorMethod<[], OrderBooksResponse>;
  getOrderBooksStates: ActorMethod<[], Array<OrderBookState>>;
  getOrdersForUser: ActorMethod<[Principal], Array<ImmutableOrder>>;
  getTotalTradedAmount: ActorMethod<[], bigint>;
  getTransactionFee: ActorMethod<[], bigint>;
  getUserOrders: ActorMethod<[], Array<ImmutableOrder>>;
  getUserOrdersByMarket: ActorMethod<[MarketID], Array<ImmutableOrder>>;
  init: ActorMethod<[InitArgs], InitEventDetails>;
  isMarketMakerPrincipal: ActorMethod<[Principal], boolean>;
  panicEvent: ActorMethod<[], EventEndData>;
  panicMarket: ActorMethod<[bigint], Array<TransferResult>>;
  placeFreeBetOrder: ActorMethod<
    [MarketID, PlaceOrder, Principal],
    PlaceOrderResult
  >;
  placeOrder: ActorMethod<[MarketID, PlaceOrder], PlaceOrderResult>;
  removeAdmin: ActorMethod<[Principal], undefined>;
  removeDetailsForOrderPlacedEvent: ActorMethod<[string], undefined>;
  setAdmin: ActorMethod<[Principal], undefined>;
  updateOrder: ActorMethod<[OrderID, bigint], UpdateOrderReceipt>;
  updateOrderBookState: ActorMethod<[MarketID, OrderBookState], boolean>;
  updateState: ActorMethod<[OrderBookState], undefined>;
  validateFreeBetOrder: ActorMethod<
    [MarketID, PlaceOrder, Principal],
    ValidateBetResult
  >;
  validateOrder: ActorMethod<[MarketID, PlaceOrder], ValidateBetResult>;
  withdrawCommissions: ActorMethod<[], Result>;
}
export interface EventEndData {
  eventId: EventID;
  totalCommissions: bigint;
  endTime: Time;
  totalMatched: bigint;
  transferResults: Array<TransferResult>;
  createdBets: Array<FinalisedCreatedBet>;
  totalOpen: bigint;
  marketAccounting: Array<MarketBalance>;
  matchedBets: Array<FinalisedMatchedBet>;
  marketProcessingResults: Array<MarketProcessingResult>;
  canisterId: Principal;
}
export type EventID = bigint;
export interface EventStatsData {
  lastUpdateErrorMessage: [] | [string];
  totalTradedAmount: bigint;
  lastUpdatedAt: Time;
  betTypeTradedAmounts: Array<BetTypeTradedAmount>;
  marketTradedAmounts: Array<MarketTradedAmount>;
  orderBooks: OrderBooksResponse;
  graphData: Array<GraphData>;
}
export interface FailedTransfer {
  user: Principal;
  intendedAmount: bigint;
  error: TransferError;
}
export interface FinalisedCreatedBet {
  status: OrderStatus;
  eventId: EventID;
  marketName: string;
  initialContracts: bigint;
  nftHolder: boolean;
  processedByUserbook: boolean;
  odds: bigint;
  createdAt: Time;
  side: OrderSide;
  user: Principal;
  commission: bigint;
  orderId: OrderID;
  updatedAt: Time;
  stake: bigint;
  marketId: MarketID;
  isFreeBet: boolean;
  outcome: OrderResult;
  unmatchedContracts: bigint;
  canisterId: Principal;
}
export interface FinalisedMatchedBet {
  eventId: EventID;
  marketName: string;
  matchedAt: Time;
  nftHolder: boolean;
  processedByUserbook: boolean;
  odds: bigint;
  createdAt: Time;
  side: OrderSide;
  user: Principal;
  commission: bigint;
  contracts: bigint;
  stake: bigint;
  marketId: MarketID;
  isFreeBet: boolean;
  outcome: OrderResult;
  canisterId: Principal;
}
export interface GraphData {
  marketName: string;
  data: Array<GraphDataPoint>;
  betType: BetType;
  marketId: MarketID;
}
export interface GraphDataPoint {
  odds: bigint;
  time: Time;
  contracts: bigint;
}
export interface ImmutableBalances {
  open: bigint;
  matched: bigint;
  commissions: bigint;
}
export interface ImmutableOrder {
  id: OrderID;
  status: OrderStatus;
  eventId: EventID;
  premium: Premium;
  initialContracts: bigint;
  processedByUserbook: boolean;
  createdAt: Time;
  side: OrderSide;
  user: Principal;
  currentContracts: bigint;
  updatedAt: Time;
  stake: bigint;
  marketId: MarketID;
  isFreeBet: boolean;
}
export interface InitArgs {
  initControllers: Array<Principal>;
  eventArgs: InitEventDetails;
}
export interface InitEventDetails {
  id: EventID;
  markets: Array<MarketInfo>;
  sport: string;
  leagueId: bigint;
  eventType: string;
}
export interface MarketBalance {
  marketName: string;
  marketId: MarketID;
  balances: ImmutableBalances;
}
export type MarketID = bigint;
export interface MarketInfo {
  id: bigint;
  result: [] | [boolean];
  name: string;
  betType: string;
}
export interface MarketOrderBookResponse {
  orderBook: OrderBookResponse;
  state: OrderBookState;
  marketId: MarketID;
}
export interface MarketProcessingResult {
  processingResult: Result__1;
  marketId: MarketID;
}
export interface MarketTradedAmount {
  marketId: MarketID;
  amount: bigint;
}
export interface MatchedOrder {
  id: OrderID;
  buy: MatchedOrderSide;
  matchedAt: Time;
  buyPremium: bigint;
  sell: MatchedOrderSide;
  contracts: bigint;
}
export interface MatchedOrderSide {
  principal: Principal;
  orderId: OrderID;
  isFreeBet: boolean;
}
export interface OrderBookPricePoint {
  odds: bigint;
  contracts: bigint;
}
export interface OrderBookResponse {
  buy: Array<OrderBookPricePoint>;
  sell: Array<OrderBookPricePoint>;
}
export type OrderBookState =
  | { Paused: null }
  | { ShortPositionWon: null }
  | { Ongoing: null }
  | { Finishing: null }
  | { NonePositionWon: null }
  | { Cancelled: null }
  | { LongPositionWon: null };
export type OrderBooksResponse = Array<MarketOrderBookResponse>;
export type OrderID = string;
export type OrderResult = { Err: null } | { win: null } | { loss: null };
export type OrderSide = { buy: null } | { sell: null };
export type OrderStatus =
  | { cancelled: null }
  | { open: null }
  | { filled: null };
export interface PlaceOrder {
  odds: bigint;
  side: OrderSide;
  contracts: bigint;
}
export type PlaceOrderResult =
  | { Ok: ImmutableOrder }
  | { Err: TransferFromError };
export type Premium = bigint;
export type Result = { Ok: bigint } | { Err: TransferError };
export type Result__1 = { Ok: string } | { Err: string };
export interface SuccessfulTransfer {
  user: Principal;
  amount: bigint;
}
export type Time = bigint;
export type TransferError =
  | {
      GenericError: { message: string; error_code: bigint };
    }
  | { TemporarilyUnavailable: null }
  | { BadBurn: { min_burn_amount: bigint } }
  | { Duplicate: { duplicate_of: bigint } }
  | { BadFee: { expected_fee: bigint } }
  | { CreatedInFuture: { ledger_time: bigint } }
  | { TooOld: null }
  | { InsufficientFunds: { balance: bigint } };
export type TransferFromError =
  | {
      GenericError: { message: string; error_code: bigint };
    }
  | { TemporarilyUnavailable: null }
  | { InsufficientAllowance: { allowance: bigint } }
  | { BadBurn: { min_burn_amount: bigint } }
  | { Duplicate: { duplicate_of: bigint } }
  | { BadFee: { expected_fee: bigint } }
  | { CreatedInFuture: { ledger_time: bigint } }
  | { TooOld: null }
  | { InsufficientFunds: { balance: bigint } };
export type TransferResult =
  | { Ok: SuccessfulTransfer }
  | { Err: FailedTransfer };
export type UpdateOrderReceipt = { Ok: ImmutableOrder } | { Err: string };
export type ValidateBetResult = { Ok: bigint } | { Err: string };
export interface _SERVICE extends Event {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
