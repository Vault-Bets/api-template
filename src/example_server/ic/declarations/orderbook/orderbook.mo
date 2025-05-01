// This is a generated Motoko binding.
// Please use `import service "ic:canister_id"` instead to call canisters on the IC if possible.

module {
  public type BetType = Text;
  public type BetTypeTradedAmount = { betType : BetType; amount : Nat };
  public type CancelOrderReceipt = { #Ok : Nat; #Err : Text };
  public type DetailsForOrderPlacedEvent = {
    order : ImmutableOrder;
    topSellOrder : ?OrderBookPricePoint;
    topBuyOrder : ?OrderBookPricePoint;
  };
  public type EnvVariant = {
    #IC : Text;
    #Local : Text;
    #Development : Text;
    #Staging : Text;
  };
  public type Event = actor {
    cancelOrder : shared OrderID -> async CancelOrderReceipt;
    endEvent : shared InitEventDetails -> async EventEndData;
    getAdmins : shared () -> async [Principal];
    getAllCreatedOrders : shared query () -> async [ImmutableOrder];
    getAllFullyUpdatedOrders : shared query () -> async [ImmutableOrder];
    getAllMatchedOrders : shared () -> async [MatchedOrder];
    getBetTypeTradedAmount : shared query BetType -> async Nat;
    getCaller : shared () -> async Principal;
    getCommission : shared query () -> async Nat;
    getDetailsForOrderPlacedEvent : shared query Text -> async ?DetailsForOrderPlacedEvent;
    getEventDetails : shared query () -> async InitEventDetails;
    getEventStatsData : shared query ?Nat64 -> async ?EventStatsData;
    getFullyUpdatedOrders : shared (Nat, Nat) -> async [FinalisedCreatedBet];
    getGraphData : shared query () -> async [GraphData];
    getMarketMakerPrincipals : shared () -> async [Principal];
    getMarketNames : shared query () -> async [Text];
    getMarketTradedAmount : shared query MarketID -> async Nat;
    getMatchedOrder : shared query Text -> async ?MatchedOrder;
    getOrder : shared query Text -> async ?ImmutableOrder;
    getOrderBook : shared query MarketID -> async ?OrderBookResponse;
    getOrderBooks : shared query () -> async OrderBooksResponse;
    getOrderBooksStates : shared query () -> async [OrderBookState];
    getOrdersForUser : shared Principal -> async [ImmutableOrder];
    getTotalTradedAmount : shared query () -> async Nat;
    getTransactionFee : shared query () -> async Nat;
    getUserOrders : shared query () -> async [ImmutableOrder];
    getUserOrdersByMarket : shared query MarketID -> async [ImmutableOrder];
    init : shared InitArgs -> async InitEventDetails;
    isMarketMakerPrincipal : shared Principal -> async Bool;
    panicEvent : shared () -> async EventEndData;
    panicMarket : shared Nat -> async [TransferResult];
    placeFreeBetOrder : shared (
        MarketID,
        PlaceOrder,
        Principal,
      ) -> async PlaceOrderResult;
    placeOrder : shared (MarketID, PlaceOrder) -> async PlaceOrderResult;
    removeAdmin : shared Principal -> async ();
    removeDetailsForOrderPlacedEvent : shared Text -> async ();
    setAdmin : shared Principal -> async ();
    updateOrder : shared (OrderID, Nat) -> async UpdateOrderReceipt;
    updateOrderBookState : shared (MarketID, OrderBookState) -> async Bool;
    updateState : shared OrderBookState -> async ();
    validateFreeBetOrder : shared query (
        MarketID,
        PlaceOrder,
        Principal,
      ) -> async ValidateBetResult;
    validateOrder : shared query (
        MarketID,
        PlaceOrder,
      ) -> async ValidateBetResult;
    withdrawCommissions : shared () -> async Result;
  };
  public type EventEndData = {
    eventId : EventID;
    totalCommissions : Nat;
    endTime : Time;
    totalMatched : Nat;
    transferResults : [TransferResult];
    createdBets : [FinalisedCreatedBet];
    totalOpen : Nat;
    marketAccounting : [MarketBalance];
    matchedBets : [FinalisedMatchedBet];
    marketProcessingResults : [MarketProcessingResult];
    canisterId : Principal;
  };
  public type EventID = Nat;
  public type EventStatsData = {
    lastUpdateErrorMessage : ?Text;
    totalTradedAmount : Nat;
    lastUpdatedAt : Time;
    betTypeTradedAmounts : [BetTypeTradedAmount];
    marketTradedAmounts : [MarketTradedAmount];
    orderBooks : OrderBooksResponse;
    graphData : [GraphData];
  };
  public type FailedTransfer = {
    user : Principal;
    intendedAmount : Nat;
    error : TransferError;
  };
  public type FinalisedCreatedBet = {
    status : OrderStatus;
    eventId : EventID;
    marketName : Text;
    initialContracts : Nat;
    nftHolder : Bool;
    processedByUserbook : Bool;
    odds : Nat;
    createdAt : Time;
    side : OrderSide;
    user : Principal;
    commission : Nat;
    orderId : OrderID;
    updatedAt : Time;
    stake : Nat;
    marketId : MarketID;
    isFreeBet : Bool;
    outcome : OrderResult;
    unmatchedContracts : Nat;
    canisterId : Principal;
  };
  public type FinalisedMatchedBet = {
    eventId : EventID;
    marketName : Text;
    matchedAt : Time;
    nftHolder : Bool;
    processedByUserbook : Bool;
    odds : Nat;
    createdAt : Time;
    side : OrderSide;
    user : Principal;
    commission : Nat;
    contracts : Nat;
    stake : Nat;
    marketId : MarketID;
    isFreeBet : Bool;
    outcome : OrderResult;
    canisterId : Principal;
  };
  public type GraphData = {
    marketName : Text;
    data : [GraphDataPoint];
    betType : BetType;
    marketId : MarketID;
  };
  public type GraphDataPoint = { odds : Nat; time : Time; contracts : Nat };
  public type ImmutableBalances = {
    open : Nat;
    matched : Nat;
    commissions : Nat;
  };
  public type ImmutableOrder = {
    id : OrderID;
    status : OrderStatus;
    eventId : EventID;
    premium : Premium;
    initialContracts : Nat;
    processedByUserbook : Bool;
    createdAt : Time;
    side : OrderSide;
    user : Principal;
    currentContracts : Nat;
    updatedAt : Time;
    stake : Nat;
    marketId : MarketID;
    isFreeBet : Bool;
  };
  public type InitArgs = {
    initControllers : [Principal];
    eventArgs : InitEventDetails;
  };
  public type InitEventDetails = {
    id : EventID;
    markets : [MarketInfo];
    sport : Text;
    leagueId : Nat;
    eventType : Text;
  };
  public type MarketBalance = {
    marketName : Text;
    marketId : MarketID;
    balances : ImmutableBalances;
  };
  public type MarketID = Nat;
  public type MarketInfo = {
    id : Nat;
    result : ?Bool;
    name : Text;
    betType : Text;
  };
  public type MarketOrderBookResponse = {
    orderBook : OrderBookResponse;
    state : OrderBookState;
    marketId : MarketID;
  };
  public type MarketProcessingResult = {
    processingResult : Result__1;
    marketId : MarketID;
  };
  public type MarketTradedAmount = { marketId : MarketID; amount : Nat };
  public type MatchedOrder = {
    id : OrderID;
    buy : MatchedOrderSide;
    matchedAt : Time;
    buyPremium : Nat;
    sell : MatchedOrderSide;
    contracts : Nat;
  };
  public type MatchedOrderSide = {
    principal : Principal;
    orderId : OrderID;
    isFreeBet : Bool;
  };
  public type OrderBookPricePoint = { odds : Nat; contracts : Nat };
  public type OrderBookResponse = {
    buy : [OrderBookPricePoint];
    sell : [OrderBookPricePoint];
  };
  public type OrderBookState = {
    #Paused;
    #ShortPositionWon;
    #Ongoing;
    #Finishing;
    #NonePositionWon;
    #Cancelled;
    #LongPositionWon;
  };
  public type OrderBooksResponse = [MarketOrderBookResponse];
  public type OrderID = Text;
  public type OrderResult = { #Err; #win; #loss };
  public type OrderSide = { #buy; #sell };
  public type OrderStatus = { #cancelled; #open; #filled };
  public type PlaceOrder = { odds : Nat; side : OrderSide; contracts : Nat };
  public type PlaceOrderResult = {
    #Ok : ImmutableOrder;
    #Err : TransferFromError;
  };
  public type Premium = Nat;
  public type Result = { #Ok : Nat; #Err : TransferError };
  public type Result__1 = { #Ok : Text; #Err : Text };
  public type SuccessfulTransfer = { user : Principal; amount : Nat };
  public type Time = Int;
  public type TransferError = {
    #GenericError : { message : Text; error_code : Nat };
    #TemporarilyUnavailable;
    #BadBurn : { min_burn_amount : Nat };
    #Duplicate : { duplicate_of : Nat };
    #BadFee : { expected_fee : Nat };
    #CreatedInFuture : { ledger_time : Nat64 };
    #TooOld;
    #InsufficientFunds : { balance : Nat };
  };
  public type TransferFromError = {
    #GenericError : { message : Text; error_code : Nat };
    #TemporarilyUnavailable;
    #InsufficientAllowance : { allowance : Nat };
    #BadBurn : { min_burn_amount : Nat };
    #Duplicate : { duplicate_of : Nat };
    #BadFee : { expected_fee : Nat };
    #CreatedInFuture : { ledger_time : Nat64 };
    #TooOld;
    #InsufficientFunds : { balance : Nat };
  };
  public type TransferResult = {
    #Ok : SuccessfulTransfer;
    #Err : FailedTransfer;
  };
  public type UpdateOrderReceipt = { #Ok : ImmutableOrder; #Err : Text };
  public type ValidateBetResult = { #Ok : Nat; #Err : Text };
  public type Self = EnvVariant -> async Event
}
