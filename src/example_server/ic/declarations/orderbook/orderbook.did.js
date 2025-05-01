export const idlFactory = ({ IDL }) => {
  const EnvVariant = IDL.Variant({
    IC: IDL.Text,
    Local: IDL.Text,
    Development: IDL.Text,
    Staging: IDL.Text,
  });
  const OrderID = IDL.Text;
  const CancelOrderReceipt = IDL.Variant({ Ok: IDL.Nat, Err: IDL.Text });
  const EventID = IDL.Nat;
  const MarketInfo = IDL.Record({
    id: IDL.Nat,
    result: IDL.Opt(IDL.Bool),
    name: IDL.Text,
    betType: IDL.Text,
  });
  const InitEventDetails = IDL.Record({
    id: EventID,
    markets: IDL.Vec(MarketInfo),
    sport: IDL.Text,
    leagueId: IDL.Nat,
    eventType: IDL.Text,
  });
  const Time = IDL.Int;
  const SuccessfulTransfer = IDL.Record({
    user: IDL.Principal,
    amount: IDL.Nat,
  });
  const TransferError = IDL.Variant({
    GenericError: IDL.Record({
      message: IDL.Text,
      error_code: IDL.Nat,
    }),
    TemporarilyUnavailable: IDL.Null,
    BadBurn: IDL.Record({ min_burn_amount: IDL.Nat }),
    Duplicate: IDL.Record({ duplicate_of: IDL.Nat }),
    BadFee: IDL.Record({ expected_fee: IDL.Nat }),
    CreatedInFuture: IDL.Record({ ledger_time: IDL.Nat64 }),
    TooOld: IDL.Null,
    InsufficientFunds: IDL.Record({ balance: IDL.Nat }),
  });
  const FailedTransfer = IDL.Record({
    user: IDL.Principal,
    intendedAmount: IDL.Nat,
    error: TransferError,
  });
  const TransferResult = IDL.Variant({
    Ok: SuccessfulTransfer,
    Err: FailedTransfer,
  });
  const OrderStatus = IDL.Variant({
    cancelled: IDL.Null,
    open: IDL.Null,
    filled: IDL.Null,
  });
  const OrderSide = IDL.Variant({ buy: IDL.Null, sell: IDL.Null });
  const MarketID = IDL.Nat;
  const OrderResult = IDL.Variant({
    Err: IDL.Null,
    win: IDL.Null,
    loss: IDL.Null,
  });
  const FinalisedCreatedBet = IDL.Record({
    status: OrderStatus,
    eventId: EventID,
    marketName: IDL.Text,
    initialContracts: IDL.Nat,
    nftHolder: IDL.Bool,
    processedByUserbook: IDL.Bool,
    odds: IDL.Nat,
    createdAt: Time,
    side: OrderSide,
    user: IDL.Principal,
    commission: IDL.Nat,
    orderId: OrderID,
    updatedAt: Time,
    stake: IDL.Nat,
    marketId: MarketID,
    isFreeBet: IDL.Bool,
    outcome: OrderResult,
    unmatchedContracts: IDL.Nat,
    canisterId: IDL.Principal,
  });
  const ImmutableBalances = IDL.Record({
    open: IDL.Nat,
    matched: IDL.Nat,
    commissions: IDL.Nat,
  });
  const MarketBalance = IDL.Record({
    marketName: IDL.Text,
    marketId: MarketID,
    balances: ImmutableBalances,
  });
  const FinalisedMatchedBet = IDL.Record({
    eventId: EventID,
    marketName: IDL.Text,
    matchedAt: Time,
    nftHolder: IDL.Bool,
    processedByUserbook: IDL.Bool,
    odds: IDL.Nat,
    createdAt: Time,
    side: OrderSide,
    user: IDL.Principal,
    commission: IDL.Nat,
    contracts: IDL.Nat,
    stake: IDL.Nat,
    marketId: MarketID,
    isFreeBet: IDL.Bool,
    outcome: OrderResult,
    canisterId: IDL.Principal,
  });
  const Result__1 = IDL.Variant({ Ok: IDL.Text, Err: IDL.Text });
  const MarketProcessingResult = IDL.Record({
    processingResult: Result__1,
    marketId: MarketID,
  });
  const EventEndData = IDL.Record({
    eventId: EventID,
    totalCommissions: IDL.Nat,
    endTime: Time,
    totalMatched: IDL.Nat,
    transferResults: IDL.Vec(TransferResult),
    createdBets: IDL.Vec(FinalisedCreatedBet),
    totalOpen: IDL.Nat,
    marketAccounting: IDL.Vec(MarketBalance),
    matchedBets: IDL.Vec(FinalisedMatchedBet),
    marketProcessingResults: IDL.Vec(MarketProcessingResult),
    canisterId: IDL.Principal,
  });
  const Premium = IDL.Nat;
  const ImmutableOrder = IDL.Record({
    id: OrderID,
    status: OrderStatus,
    eventId: EventID,
    premium: Premium,
    initialContracts: IDL.Nat,
    processedByUserbook: IDL.Bool,
    createdAt: Time,
    side: OrderSide,
    user: IDL.Principal,
    currentContracts: IDL.Nat,
    updatedAt: Time,
    stake: IDL.Nat,
    marketId: MarketID,
    isFreeBet: IDL.Bool,
  });
  const MatchedOrderSide = IDL.Record({
    principal: IDL.Principal,
    orderId: OrderID,
    isFreeBet: IDL.Bool,
  });
  const MatchedOrder = IDL.Record({
    id: OrderID,
    buy: MatchedOrderSide,
    matchedAt: Time,
    buyPremium: IDL.Nat,
    sell: MatchedOrderSide,
    contracts: IDL.Nat,
  });
  const BetType = IDL.Text;
  const OrderBookPricePoint = IDL.Record({
    odds: IDL.Nat,
    contracts: IDL.Nat,
  });
  const DetailsForOrderPlacedEvent = IDL.Record({
    order: ImmutableOrder,
    topSellOrder: IDL.Opt(OrderBookPricePoint),
    topBuyOrder: IDL.Opt(OrderBookPricePoint),
  });
  const BetTypeTradedAmount = IDL.Record({
    betType: BetType,
    amount: IDL.Nat,
  });
  const MarketTradedAmount = IDL.Record({
    marketId: MarketID,
    amount: IDL.Nat,
  });
  const OrderBookResponse = IDL.Record({
    buy: IDL.Vec(OrderBookPricePoint),
    sell: IDL.Vec(OrderBookPricePoint),
  });
  const OrderBookState = IDL.Variant({
    Paused: IDL.Null,
    ShortPositionWon: IDL.Null,
    Ongoing: IDL.Null,
    Finishing: IDL.Null,
    NonePositionWon: IDL.Null,
    Cancelled: IDL.Null,
    LongPositionWon: IDL.Null,
  });
  const MarketOrderBookResponse = IDL.Record({
    orderBook: OrderBookResponse,
    state: OrderBookState,
    marketId: MarketID,
  });
  const OrderBooksResponse = IDL.Vec(MarketOrderBookResponse);
  const GraphDataPoint = IDL.Record({
    odds: IDL.Nat,
    time: Time,
    contracts: IDL.Nat,
  });
  const GraphData = IDL.Record({
    marketName: IDL.Text,
    data: IDL.Vec(GraphDataPoint),
    betType: BetType,
    marketId: MarketID,
  });
  const EventStatsData = IDL.Record({
    lastUpdateErrorMessage: IDL.Opt(IDL.Text),
    totalTradedAmount: IDL.Nat,
    lastUpdatedAt: Time,
    betTypeTradedAmounts: IDL.Vec(BetTypeTradedAmount),
    marketTradedAmounts: IDL.Vec(MarketTradedAmount),
    orderBooks: OrderBooksResponse,
    graphData: IDL.Vec(GraphData),
  });
  const InitArgs = IDL.Record({
    initControllers: IDL.Vec(IDL.Principal),
    eventArgs: InitEventDetails,
  });
  const PlaceOrder = IDL.Record({
    odds: IDL.Nat,
    side: OrderSide,
    contracts: IDL.Nat,
  });
  const TransferFromError = IDL.Variant({
    GenericError: IDL.Record({
      message: IDL.Text,
      error_code: IDL.Nat,
    }),
    TemporarilyUnavailable: IDL.Null,
    InsufficientAllowance: IDL.Record({ allowance: IDL.Nat }),
    BadBurn: IDL.Record({ min_burn_amount: IDL.Nat }),
    Duplicate: IDL.Record({ duplicate_of: IDL.Nat }),
    BadFee: IDL.Record({ expected_fee: IDL.Nat }),
    CreatedInFuture: IDL.Record({ ledger_time: IDL.Nat64 }),
    TooOld: IDL.Null,
    InsufficientFunds: IDL.Record({ balance: IDL.Nat }),
  });
  const PlaceOrderResult = IDL.Variant({
    Ok: ImmutableOrder,
    Err: TransferFromError,
  });
  const UpdateOrderReceipt = IDL.Variant({
    Ok: ImmutableOrder,
    Err: IDL.Text,
  });
  const ValidateBetResult = IDL.Variant({ Ok: IDL.Nat, Err: IDL.Text });
  const Result = IDL.Variant({ Ok: IDL.Nat, Err: TransferError });
  const Event = IDL.Service({
    cancelOrder: IDL.Func([OrderID], [CancelOrderReceipt], []),
    endEvent: IDL.Func([InitEventDetails], [EventEndData], []),
    getAdmins: IDL.Func([], [IDL.Vec(IDL.Principal)], []),
    getAllCreatedOrders: IDL.Func([], [IDL.Vec(ImmutableOrder)], ['query']),
    getAllFullyUpdatedOrders: IDL.Func(
      [],
      [IDL.Vec(ImmutableOrder)],
      ['query'],
    ),
    getAllMatchedOrders: IDL.Func([], [IDL.Vec(MatchedOrder)], []),
    getBetTypeTradedAmount: IDL.Func([BetType], [IDL.Nat], ['query']),
    getCaller: IDL.Func([], [IDL.Principal], []),
    getCommission: IDL.Func([], [IDL.Nat], ['query']),
    getDetailsForOrderPlacedEvent: IDL.Func(
      [IDL.Text],
      [IDL.Opt(DetailsForOrderPlacedEvent)],
      ['query'],
    ),
    getEventDetails: IDL.Func([], [InitEventDetails], ['query']),
    getEventStatsData: IDL.Func(
      [IDL.Opt(IDL.Nat64)],
      [IDL.Opt(EventStatsData)],
      ['query'],
    ),
    getFullyUpdatedOrders: IDL.Func(
      [IDL.Nat, IDL.Nat],
      [IDL.Vec(FinalisedCreatedBet)],
      [],
    ),
    getGraphData: IDL.Func([], [IDL.Vec(GraphData)], ['query']),
    getMarketMakerPrincipals: IDL.Func([], [IDL.Vec(IDL.Principal)], []),
    getMarketNames: IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    getMarketTradedAmount: IDL.Func([MarketID], [IDL.Nat], ['query']),
    getMatchedOrder: IDL.Func([IDL.Text], [IDL.Opt(MatchedOrder)], ['query']),
    getOrder: IDL.Func([IDL.Text], [IDL.Opt(ImmutableOrder)], ['query']),
    getOrderBook: IDL.Func([MarketID], [IDL.Opt(OrderBookResponse)], ['query']),
    getOrderBooks: IDL.Func([], [OrderBooksResponse], ['query']),
    getOrderBooksStates: IDL.Func([], [IDL.Vec(OrderBookState)], ['query']),
    getOrdersForUser: IDL.Func([IDL.Principal], [IDL.Vec(ImmutableOrder)], []),
    getTotalTradedAmount: IDL.Func([], [IDL.Nat], ['query']),
    getTransactionFee: IDL.Func([], [IDL.Nat], ['query']),
    getUserOrders: IDL.Func([], [IDL.Vec(ImmutableOrder)], ['query']),
    getUserOrdersByMarket: IDL.Func(
      [MarketID],
      [IDL.Vec(ImmutableOrder)],
      ['query'],
    ),
    init: IDL.Func([InitArgs], [InitEventDetails], []),
    isMarketMakerPrincipal: IDL.Func([IDL.Principal], [IDL.Bool], []),
    panicEvent: IDL.Func([], [EventEndData], []),
    panicMarket: IDL.Func([IDL.Nat], [IDL.Vec(TransferResult)], []),
    placeFreeBetOrder: IDL.Func(
      [MarketID, PlaceOrder, IDL.Principal],
      [PlaceOrderResult],
      [],
    ),
    placeOrder: IDL.Func([MarketID, PlaceOrder], [PlaceOrderResult], []),
    removeAdmin: IDL.Func([IDL.Principal], [], []),
    removeDetailsForOrderPlacedEvent: IDL.Func([IDL.Text], [], []),
    setAdmin: IDL.Func([IDL.Principal], [], []),
    updateOrder: IDL.Func([OrderID, IDL.Nat], [UpdateOrderReceipt], []),
    updateOrderBookState: IDL.Func([MarketID, OrderBookState], [IDL.Bool], []),
    updateState: IDL.Func([OrderBookState], [], []),
    validateFreeBetOrder: IDL.Func(
      [MarketID, PlaceOrder, IDL.Principal],
      [ValidateBetResult],
      ['query'],
    ),
    validateOrder: IDL.Func(
      [MarketID, PlaceOrder],
      [ValidateBetResult],
      ['query'],
    ),
    withdrawCommissions: IDL.Func([], [Result], []),
  });
  return Event;
};
export const init = ({ IDL }) => {
  const EnvVariant = IDL.Variant({
    IC: IDL.Text,
    Local: IDL.Text,
    Development: IDL.Text,
    Staging: IDL.Text,
  });
  return [EnvVariant];
};
