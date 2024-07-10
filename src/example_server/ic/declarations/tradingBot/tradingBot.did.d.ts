import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type EventID = bigint;
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
export type MarketID = bigint;
export type OrderID = string;
export type OrderSide = { 'buy' : null } |
  { 'sell' : null };
export type OrderStatus = { 'cancelled' : null } |
  { 'open' : null } |
  { 'filled' : null };
export type PlaceBetResult = { 'Ok' : ImmutableOrder } |
  { 'Err' : string };
export interface PlaceOrder {
  'odds' : bigint,
  'side' : OrderSide,
  'contracts' : bigint,
}
export type Premium = bigint;
export type Time = bigint;
export interface TradingBot {
  'cancelBet' : ActorMethod<[Principal, MarketID, string], bigint>,
  'getBotsOrders' : ActorMethod<[Principal, MarketID], Array<ImmutableOrder>>,
  'placeBet' : ActorMethod<[Principal, MarketID, PlaceOrder], PlaceBetResult>,
}
export interface _SERVICE extends TradingBot {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
