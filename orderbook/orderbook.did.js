export const idlFactory = ({ IDL }) => {
  const EnvVariant = IDL.Variant({
    'IC' : IDL.Text,
    'Development' : IDL.Text,
    'Staging' : IDL.Text,
  });
  const MarketID = IDL.Nat;
  const OrderID = IDL.Text;
  const CancelOrderReceipt = IDL.Variant({ 'Ok' : IDL.Nat, 'Err' : IDL.Text });
  const EventID = IDL.Nat;
  const MarketInfo = IDL.Record({
    'id' : IDL.Nat,
    'result' : IDL.Opt(IDL.Bool),
    'name' : IDL.Text,
    'betType' : IDL.Text,
  });
  const InitEventDetails = IDL.Record({
    'id' : EventID,
    'markets' : IDL.Vec(MarketInfo),
    'sport' : IDL.Text,
    'leagueId' : IDL.Nat,
    'eventType' : IDL.Text,
  });
  const Time = IDL.Int;
  const SuccessfulTransfer = IDL.Record({
    'user' : IDL.Principal,
    'marketId' : MarketID,
    'amount' : IDL.Nat,
  });
  const TransferError = IDL.Variant({
    'GenericError' : IDL.Record({
      'message' : IDL.Text,
      'error_code' : IDL.Nat,
    }),
    'TemporarilyUnavailable' : IDL.Null,
    'BadBurn' : IDL.Record({ 'min_burn_amount' : IDL.Nat }),
    'Duplicate' : IDL.Record({ 'duplicate_of' : IDL.Nat }),
    'BadFee' : IDL.Record({ 'expected_fee' : IDL.Nat }),
    'CreatedInFuture' : IDL.Record({ 'ledger_time' : IDL.Nat64 }),
    'TooOld' : IDL.Null,
    'InsufficientFunds' : IDL.Record({ 'balance' : IDL.Nat }),
  });
  const FailedTransfer = IDL.Record({
    'user' : IDL.Principal,
    'intendedAmount' : IDL.Nat,
    'error' : TransferError,
    'marketId' : MarketID,
  });
  const TransferResult = IDL.Variant({
    'Ok' : SuccessfulTransfer,
    'Err' : FailedTransfer,
  });
  const TransferResults = IDL.Variant({
    'Ok' : IDL.Vec(TransferResult),
    'Err' : IDL.Text,
  });
  const MarketTransferResult = IDL.Record({
    'transferResults' : TransferResults,
    'marketId' : MarketID,
  });
  const OrderStatus = IDL.Variant({
    'cancelled' : IDL.Null,
    'open' : IDL.Null,
    'filled' : IDL.Null,
  });
  const OrderSide = IDL.Variant({ 'buy' : IDL.Null, 'sell' : IDL.Null });
  const OrderResult = IDL.Variant({
    'Err' : IDL.Null,
    'win' : IDL.Null,
    'loss' : IDL.Null,
  });
  const FinalisedCreatedBet = IDL.Record({
    'status' : OrderStatus,
    'eventId' : EventID,
    'marketName' : IDL.Text,
    'initialContracts' : IDL.Nat,
    'nftHolder' : IDL.Bool,
    'odds' : IDL.Nat,
    'createdAt' : Time,
    'side' : OrderSide,
    'user' : IDL.Principal,
    'commission' : IDL.Nat,
    'orderId' : OrderID,
    'stake' : IDL.Nat,
    'marketId' : MarketID,
    'outcome' : OrderResult,
    'unmatchedContracts' : IDL.Nat,
    'canisterId' : IDL.Principal,
  });
  const ImmutableBalances = IDL.Record({
    'open' : IDL.Nat,
    'matched' : IDL.Nat,
    'commissions' : IDL.Nat,
  });
  const MarketBalance = IDL.Record({
    'marketName' : IDL.Text,
    'marketId' : MarketID,
    'balances' : ImmutableBalances,
  });
  const FinalisedMatchedBet = IDL.Record({
    'eventId' : EventID,
    'marketName' : IDL.Text,
    'matchedAt' : Time,
    'nftHolder' : IDL.Bool,
    'odds' : IDL.Nat,
    'createdAt' : Time,
    'side' : OrderSide,
    'user' : IDL.Principal,
    'commission' : IDL.Nat,
    'contracts' : IDL.Nat,
    'stake' : IDL.Nat,
    'marketId' : MarketID,
    'outcome' : OrderResult,
    'canisterId' : IDL.Principal,
  });
  const EventEndData = IDL.Record({
    'eventId' : EventID,
    'totalCommissions' : IDL.Nat,
    'endTime' : Time,
    'totalMatched' : IDL.Nat,
    'transferResults' : IDL.Vec(MarketTransferResult),
    'createdBets' : IDL.Vec(FinalisedCreatedBet),
    'totalOpen' : IDL.Nat,
    'marketAccounting' : IDL.Vec(MarketBalance),
    'matchedBets' : IDL.Vec(FinalisedMatchedBet),
    'canisterId' : IDL.Principal,
  });
  const BetType = IDL.Variant({
    'fr' : IDL.Null,
    'ftr' : IDL.Null,
    'outright' : IDL.Null,
  });
  const GraphDataPoint = IDL.Record({
    'odds' : IDL.Nat,
    'time' : Time,
    'contracts' : IDL.Nat,
  });
  const GraphData = IDL.Record({
    'marketName' : IDL.Text,
    'data' : IDL.Vec(GraphDataPoint),
    'marketId' : MarketID,
  });
  const MatchedOrderSide = IDL.Record({
    'principal' : IDL.Principal,
    'orderId' : OrderID,
  });
  const MatchedOrder = IDL.Record({
    'id' : OrderID,
    'buy' : MatchedOrderSide,
    'matchedAt' : Time,
    'buyPremium' : IDL.Nat,
    'sell' : MatchedOrderSide,
    'contracts' : IDL.Nat,
  });
  const Premium = IDL.Nat;
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
  const OrderBookPricePoint = IDL.Record({
    'odds' : IDL.Nat,
    'contracts' : IDL.Nat,
  });
  const OrderBookResponse = IDL.Record({
    'buy' : IDL.Vec(OrderBookPricePoint),
    'sell' : IDL.Vec(OrderBookPricePoint),
  });
  const MarketOrderBookResponse = IDL.Record({
    'orderBook' : OrderBookResponse,
    'marketId' : MarketID,
  });
  const OrderBooksResponse = IDL.Vec(MarketOrderBookResponse);
  const InitArgs = IDL.Record({
    'initControllers' : IDL.Vec(IDL.Principal),
    'eventArgs' : InitEventDetails,
  });
  const PlaceOrder = IDL.Record({
    'odds' : IDL.Nat,
    'side' : OrderSide,
    'contracts' : IDL.Nat,
  });
  const Result = IDL.Variant({ 'Ok' : IDL.Nat, 'Err' : TransferError });
  const Event = IDL.Service({
    'cancelOrder' : IDL.Func([MarketID, OrderID], [CancelOrderReceipt], []),
    'commitOrder' : IDL.Func([IDL.Nat], [IDL.Vec(IDL.Nat8)], []),
    'endEvent' : IDL.Func([InitEventDetails], [EventEndData], []),
    'getAdmins' : IDL.Func([], [IDL.Vec(IDL.Principal)], []),
    'getBetTypeTradedAmount' : IDL.Func([BetType], [IDL.Nat], ['query']),
    'getCaller' : IDL.Func([], [IDL.Principal], []),
    'getCommission' : IDL.Func([], [IDL.Nat], ['query']),
    'getEventDetails' : IDL.Func([], [InitEventDetails], ['query']),
    'getGraphData' : IDL.Func([], [IDL.Vec(GraphData)], ['query']),
    'getMarketNames' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'getMarketTradedAmount' : IDL.Func([MarketID], [IDL.Nat], ['query']),
    'getMatchedOrder' : IDL.Func(
        [IDL.Text],
        [IDL.Opt(MatchedOrder)],
        ['query'],
      ),
    'getMemoMap' : IDL.Func([], [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Nat))], []),
    'getOrder' : IDL.Func([IDL.Text], [IDL.Opt(ImmutableOrder)], ['query']),
    'getOrderBook' : IDL.Func(
        [MarketID],
        [IDL.Opt(OrderBookResponse)],
        ['query'],
      ),
    'getOrderBooks' : IDL.Func([], [OrderBooksResponse], ['query']),
    'getOrdersForUser' : IDL.Func(
        [IDL.Principal],
        [IDL.Vec(ImmutableOrder)],
        [],
      ),
    'getTotalTradedAmount' : IDL.Func([], [IDL.Nat], ['query']),
    'getTransactionFee' : IDL.Func([], [IDL.Nat], ['query']),
    'getUserOrders' : IDL.Func([], [IDL.Vec(ImmutableOrder)], ['query']),
    'getUserOrdersByMarket' : IDL.Func(
        [MarketID],
        [IDL.Vec(ImmutableOrder)],
        ['query'],
      ),
    'init' : IDL.Func([InitArgs], [InitEventDetails], []),
    'panicEvent' : IDL.Func([], [EventEndData], []),
    'panicMarket' : IDL.Func([IDL.Nat], [IDL.Vec(TransferResult)], []),
    'placeOrder' : IDL.Func(
        [MarketID, PlaceOrder, IDL.Nat],
        [IDL.Opt(ImmutableOrder)],
        [],
      ),
    'setAdmin' : IDL.Func([IDL.Principal], [], []),
    'validateOrder' : IDL.Func(
        [MarketID, PlaceOrder],
        [IDL.Opt(IDL.Nat)],
        ['query'],
      ),
    'withdrawCommissions' : IDL.Func([], [Result], []),
  });
  return Event;
};
export const init = ({ IDL }) => {
  const EnvVariant = IDL.Variant({
    'IC' : IDL.Text,
    'Development' : IDL.Text,
    'Staging' : IDL.Text,
  });
  return [EnvVariant];
};
