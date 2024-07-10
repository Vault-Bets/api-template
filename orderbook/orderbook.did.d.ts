import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type BetType = { 'fr' : null } |
  { 'ftr' : null } |
  { 'outright' : null };
export type CancelOrderReceipt = { 'Ok' : bigint } |
  { 'Err' : string };
export type EnvVariant = { 'IC' : string } |
  { 'Development' : string } |
  { 'Staging' : string };
export interface Event {
  'cancelOrder' : ActorMethod<[MarketID, OrderID], CancelOrderReceipt>,
  'commitOrder' : ActorMethod<[bigint], Uint8Array | number[]>,
  'endEvent' : ActorMethod<[InitEventDetails], EventEndData>,
  'getAdmins' : ActorMethod<[], Array<Principal>>,
  'getBetTypeTradedAmount' : ActorMethod<[BetType], bigint>,
  'getCaller' : ActorMethod<[], Principal>,
  'getCommission' : ActorMethod<[], bigint>,
  'getEventDetails' : ActorMethod<[], InitEventDetails>,
  'getGraphData' : ActorMethod<[], Array<GraphData>>,
  'getMarketNames' : ActorMethod<[], Array<string>>,
  'getMarketTradedAmount' : ActorMethod<[MarketID], bigint>,
  'getMatchedOrder' : ActorMethod<[string], [] | [MatchedOrder]>,
  'getMemoMap' : ActorMethod<[], Array<[string, bigint]>>,
  'getOrder' : ActorMethod<[string], [] | [ImmutableOrder]>,
  'getOrderBook' : ActorMethod<[MarketID], [] | [OrderBookResponse]>,
  'getOrderBooks' : ActorMethod<[], OrderBooksResponse>,
  'getOrdersForUser' : ActorMethod<[Principal], Array<ImmutableOrder>>,
  'getTotalTradedAmount' : ActorMethod<[], bigint>,
  'getTransactionFee' : ActorMethod<[], bigint>,
  'getUserOrders' : ActorMethod<[], Array<ImmutableOrder>>,
  'getUserOrdersByMarket' : ActorMethod<[MarketID], Array<ImmutableOrder>>,
  'init' : ActorMethod<[InitArgs], InitEventDetails>,
  'panicEvent' : ActorMethod<[], EventEndData>,
  'panicMarket' : ActorMethod<[bigint], Array<TransferResult>>,
  'placeOrder' : ActorMethod<
    [MarketID, PlaceOrder, bigint],
    [] | [ImmutableOrder]
  >,
  'setAdmin' : ActorMethod<[Principal], undefined>,
  'validateOrder' : ActorMethod<[MarketID, PlaceOrder], [] | [bigint]>,
  'withdrawCommissions' : ActorMethod<[], Result>,
}
export interface EventEndData {
  'eventId' : EventID,
  'totalCommissions' : bigint,
  'endTime' : Time,
  'totalMatched' : bigint,
  'transferResults' : Array<MarketTransferResult>,
  'createdBets' : Array<FinalisedCreatedBet>,
  'totalOpen' : bigint,
  'marketAccounting' : Array<MarketBalance>,
  'matchedBets' : Array<FinalisedMatchedBet>,
  'canisterId' : Principal,
}
export type EventID = bigint;
export interface FailedTransfer {
  'user' : Principal,
  'intendedAmount' : bigint,
  'error' : TransferError,
  'marketId' : MarketID,
}
export interface FinalisedCreatedBet {
  'status' : OrderStatus,
  'eventId' : EventID,
  'marketName' : string,
  'initialContracts' : bigint,
  'nftHolder' : boolean,
  'odds' : bigint,
  'createdAt' : Time,
  'side' : OrderSide,
  'user' : Principal,
  'commission' : bigint,
  'orderId' : OrderID,
  'stake' : bigint,
  'marketId' : MarketID,
  'outcome' : OrderResult,
  'unmatchedContracts' : bigint,
  'canisterId' : Principal,
}
export interface FinalisedMatchedBet {
  'eventId' : EventID,
  'marketName' : string,
  'matchedAt' : Time,
  'nftHolder' : boolean,
  'odds' : bigint,
  'createdAt' : Time,
  'side' : OrderSide,
  'user' : Principal,
  'commission' : bigint,
  'contracts' : bigint,
  'stake' : bigint,
  'marketId' : MarketID,
  'outcome' : OrderResult,
  'canisterId' : Principal,
}
export interface GraphData {
  'marketName' : string,
  'data' : Array<GraphDataPoint>,
  'marketId' : MarketID,
}
export interface GraphDataPoint {
  'odds' : bigint,
  'time' : Time,
  'contracts' : bigint,
}
export interface ImmutableBalances {
  'open' : bigint,
  'matched' : bigint,
  'commissions' : bigint,
}
export interface ImmutableOrder {
  'id' : OrderID,
  'status' : OrderStatus,
  'eventId' : EventID,
  'premium' : Premium,
  'initialContracts' : bigint,
  'createdAt' : Time,
  'side' : OrderSide,
  'user' : Principal,
  'currentContracts' : bigint,
  'marketId' : MarketID,
}
export interface InitArgs {
  'initControllers' : Array<Principal>,
  'eventArgs' : InitEventDetails,
}
export interface InitEventDetails {
  'id' : EventID,
  'markets' : Array<MarketInfo>,
  'sport' : string,
  'leagueId' : bigint,
  'eventType' : string,
}
export interface MarketBalance {
  'marketName' : string,
  'marketId' : MarketID,
  'balances' : ImmutableBalances,
}
export type MarketID = bigint;
export interface MarketInfo {
  'id' : bigint,
  'result' : [] | [boolean],
  'name' : string,
  'betType' : string,
}
export interface MarketOrderBookResponse {
  'orderBook' : OrderBookResponse,
  'marketId' : MarketID,
}
export interface MarketTransferResult {
  'transferResults' : TransferResults,
  'marketId' : MarketID,
}
export interface MatchedOrder {
  'id' : OrderID,
  'buy' : MatchedOrderSide,
  'matchedAt' : Time,
  'buyPremium' : bigint,
  'sell' : MatchedOrderSide,
  'contracts' : bigint,
}
export interface MatchedOrderSide {
  'principal' : Principal,
  'orderId' : OrderID,
}
export interface OrderBookPricePoint { 'odds' : bigint, 'contracts' : bigint }
export interface OrderBookResponse {
  'buy' : Array<OrderBookPricePoint>,
  'sell' : Array<OrderBookPricePoint>,
}
export type OrderBooksResponse = Array<MarketOrderBookResponse>;
export type OrderID = string;
export type OrderResult = { 'Err' : null } |
  { 'win' : null } |
  { 'loss' : null };
export type OrderSide = { 'buy' : null } |
  { 'sell' : null };
export type OrderStatus = { 'cancelled' : null } |
  { 'open' : null } |
  { 'filled' : null };
export interface PlaceOrder {
  'odds' : bigint,
  'side' : OrderSide,
  'contracts' : bigint,
}
export type Premium = bigint;
export type Result = { 'Ok' : bigint } |
  { 'Err' : TransferError };
export interface SuccessfulTransfer {
  'user' : Principal,
  'marketId' : MarketID,
  'amount' : bigint,
}
export type Time = bigint;
export type TransferError = {
    'GenericError' : { 'message' : string, 'error_code' : bigint }
  } |
  { 'TemporarilyUnavailable' : null } |
  { 'BadBurn' : { 'min_burn_amount' : bigint } } |
  { 'Duplicate' : { 'duplicate_of' : bigint } } |
  { 'BadFee' : { 'expected_fee' : bigint } } |
  { 'CreatedInFuture' : { 'ledger_time' : bigint } } |
  { 'TooOld' : null } |
  { 'InsufficientFunds' : { 'balance' : bigint } };
export type TransferResult = { 'Ok' : SuccessfulTransfer } |
  { 'Err' : FailedTransfer };
export type TransferResults = { 'Ok' : Array<TransferResult> } |
  { 'Err' : string };
export interface _SERVICE extends Event {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
