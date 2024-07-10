export const idlFactory = ({ IDL }) => {
  const MarketID = IDL.Nat;
  const OrderID = IDL.Text;
  const OrderStatus = IDL.Variant({
    'cancelled' : IDL.Null,
    'open' : IDL.Null,
    'filled' : IDL.Null,
  });
  const EventID = IDL.Nat;
  const Premium = IDL.Nat;
  const Time = IDL.Int;
  const OrderSide = IDL.Variant({ 'buy' : IDL.Null, 'sell' : IDL.Null });
  const ImmutableOrder = IDL.Record({
    'id' : OrderID,
    'status' : OrderStatus,
    'eventId' : EventID,
    'premium' : Premium,
    'initialContracts' : IDL.Nat,
    'createdAt' : Time,
    'side' : OrderSide,
    'user' : IDL.Principal,
    'currentContracts' : IDL.Nat,
    'marketId' : MarketID,
  });
  const PlaceOrder = IDL.Record({
    'odds' : IDL.Nat,
    'side' : OrderSide,
    'contracts' : IDL.Nat,
  });
  const PlaceBetResult = IDL.Variant({
    'Ok' : ImmutableOrder,
    'Err' : IDL.Text,
  });
  const TradingBot = IDL.Service({
    'cancelBet' : IDL.Func([IDL.Principal, MarketID, IDL.Text], [IDL.Nat], []),
    'getBotsOrders' : IDL.Func(
        [IDL.Principal, MarketID],
        [IDL.Vec(ImmutableOrder)],
        [],
      ),
    'placeBet' : IDL.Func(
        [IDL.Principal, MarketID, PlaceOrder],
        [PlaceBetResult],
        [],
      ),
  });
  return TradingBot;
};
export const init = ({ IDL }) => { return [IDL.Principal]; };
