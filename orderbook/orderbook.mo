// This is a generated Motoko binding.
// Please use `import service "ic:canister_id"` instead to call canisters on the IC if possible.

module {
  public type BetType = { #fr; #ftr; #outright };
  public type CancelOrderReceipt = { #Ok : Nat; #Err : Text };
  public type EnvVariant = { #IC : Text; #Development : Text; #Staging : Text };
  public type Event = actor {
    cancelOrder : shared (MarketID, OrderID) -> async CancelOrderReceipt;
    commitOrder : shared Nat -> async Blob;
    endEvent : shared InitEventDetails -> async EventEndData;
    getAdmins : shared () -> async [Principal];
    getBetTypeTradedAmount : shared query BetType -> async Nat;
    getCaller : shared () -> async Principal;
    getCommission : shared query () -> async Nat;
    getEventDetails : shared query () -> async InitEventDetails;
    getGraphData : shared query () -> async [GraphData];
    getMarketNames : shared query () -> async [Text];
    getMarketTradedAmount : shared query MarketID -> async Nat;
    getMatchedOrder : shared query Text -> async ?MatchedOrder;
    getMemoMap : shared () -> async [(Text, Nat)];
    getOrder : shared query Text -> async ?ImmutableOrder;
    getOrderBook : shared query MarketID -> async ?OrderBookResponse;
    getOrderBooks : shared query () -> async OrderBooksResponse;
    getOrdersForUser : shared Principal -> async [ImmutableOrder];
    getTotalTradedAmount : shared query () -> async Nat;
    getTransactionFee : shared query () -> async Nat;
    getUserOrders : shared query () -> async [ImmutableOrder];
    getUserOrdersByMarket : shared query MarketID -> async [ImmutableOrder];
    init : shared InitArgs -> async InitEventDetails;
    panicEvent : shared () -> async EventEndData;
    panicMarket : shared Nat -> async [TransferResult];
    placeOrder : shared (MarketID, PlaceOrder, Nat) -> async ?ImmutableOrder;
    setAdmin : shared Principal -> async ();
    validateOrder : shared query (MarketID, PlaceOrder) -> async ?Nat;
    withdrawCommissions : shared () -> async Result;
  };
  public type EventEndData = {
    eventId : EventID;
    totalCommissions : Nat;
    endTime : Time;
    totalMatched : Nat;
    transferResults : [MarketTransferResult];
    createdBets : [FinalisedCreatedBet];
    totalOpen : Nat;
    marketAccounting : [MarketBalance];
    matchedBets : [FinalisedMatchedBet];
    canisterId : Principal;
  };
  public type EventID = Nat;
  public type FailedTransfer = {
    user : Principal;
    intendedAmount : Nat;
    error : TransferError;
    marketId : MarketID;
  };
  public type FinalisedCreatedBet = {
    status : OrderStatus;
    eventId : EventID;
    marketName : Text;
    initialContracts : Nat;
    nftHolder : Bool;
    odds : Nat;
    createdAt : Time;
    side : OrderSide;
    user : Principal;
    commission : Nat;
    orderId : OrderID;
    stake : Nat;
    marketId : MarketID;
    outcome : OrderResult;
    unmatchedContracts : Nat;
    canisterId : Principal;
  };
  public type FinalisedMatchedBet = {
    eventId : EventID;
    marketName : Text;
    matchedAt : Time;
    nftHolder : Bool;
    odds : Nat;
    createdAt : Time;
    side : OrderSide;
    user : Principal;
    commission : Nat;
    contracts : Nat;
    stake : Nat;
    marketId : MarketID;
    outcome : OrderResult;
    canisterId : Principal;
  };
  public type GraphData = {
    marketName : Text;
    data : [GraphDataPoint];
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
    createdAt : Time;
    side : OrderSide;
    user : Principal;
    currentContracts : Nat;
    marketId : MarketID;
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
    marketId : MarketID;
  };
  public type MarketTransferResult = {
    transferResults : TransferResults;
    marketId : MarketID;
  };
  public type MatchedOrder = {
    id : OrderID;
    buy : MatchedOrderSide;
    matchedAt : Time;
    buyPremium : Nat;
    sell : MatchedOrderSide;
    contracts : Nat;
  };
  public type MatchedOrderSide = { principal : Principal; orderId : OrderID };
  public type OrderBookPricePoint = { odds : Nat; contracts : Nat };
  public type OrderBookResponse = {
    buy : [OrderBookPricePoint];
    sell : [OrderBookPricePoint];
  };
  public type OrderBooksResponse = [MarketOrderBookResponse];
  public type OrderID = Text;
  public type OrderResult = { #Err; #win; #loss };
  public type OrderSide = { #buy; #sell };
  public type OrderStatus = { #cancelled; #open; #filled };
  public type PlaceOrder = { odds : Nat; side : OrderSide; contracts : Nat };
  public type Premium = Nat;
  public type Result = { #Ok : Nat; #Err : TransferError };
  public type SuccessfulTransfer = {
    user : Principal;
    marketId : MarketID;
    amount : Nat;
  };
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
  public type TransferResult = {
    #Ok : SuccessfulTransfer;
    #Err : FailedTransfer;
  };
  public type TransferResults = { #Ok : [TransferResult]; #Err : Text };
  public type Self = EnvVariant -> async Event
}
