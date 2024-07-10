import Event "services/Event";
import ICRC "services/ICRC";
import Principal "mo:base/Principal";
import Set "mo:map/Set";
import Constants "common/Constants";
import Nat "mo:base/Nat";
import Nat64 "mo:base/Nat64";
import Error "mo:base/Error";
import Time "mo:base/Time";
import Blob "mo:base/Blob";

actor class TradingBot(tradingBotServer : Principal) = this {
    let { phash } = Set;
    private stable var admins = Set.new<Principal>();
    let admin = Principal.fromText("<insert_your_principal>");
    Set.add(admins, phash, admin);
    Set.add(admins, phash, tradingBotServer);

    public type PlaceBetResult = {
        #Ok : Event.ImmutableOrder;
        #Err : Text;
    };

    // place bet function
    public shared ({ caller }) func placeBet(eventCanisterId : Principal, marketId : Event.MarketID, order : Event.PlaceOrder) : async PlaceBetResult {
        // assert that this is the trading bot server or an Admin
        await* _isAdmin(caller);

        // Validate order
        let orderCost = await Event.service(Principal.toText(eventCanisterId)).validateOrder(marketId, order);

        // Send money
        switch (orderCost) {
            case (?orderCost) {
                let cost = orderCost + 100;
                let memo = await Event.service(Principal.toText(eventCanisterId)).commitOrder(cost);
                let transferResponse = await transfer(cost, eventCanisterId, memo);
                switch (transferResponse) {
                    case (#Ok(blockheight)) {
                        // placeOrder on the Event
                        let immutableOrder : ?Event.ImmutableOrder = await Event.service(
                            Principal.toText(eventCanisterId)
                        ).placeOrder(marketId, order, blockheight);
                        switch (immutableOrder) {
                            case (null) {
                                throw Error.reject("placeOrder on event canister failed");

                            };
                            case (?value) {
                                #Ok(value);
                            };
                        };

                    };
                    case (#Err(msg)) { throw Error.reject(debug_show (msg)) };
                };
            };
            case (null) {
                throw Error.reject("Market doesnt exist");
            };
        };
    };

    // cancel bet function
    public shared ({ caller }) func cancelBet(eventCanisterId : Principal, marketId : Event.MarketID, orderId : Text) : async Nat {
        // assert that this is the trading bot server or an Admin
        await* _isAdmin(caller);
        let cancelOrderReceipt = await Event.service(Principal.toText(eventCanisterId)).cancelOrder(marketId, orderId);
        switch (cancelOrderReceipt) {
            case (#Ok(refundAmount)) {
                return refundAmount
            };
            case (#Err(msg)) {
                throw Error.reject(msg);
            };
        };
    };

    // get the bots orders function
    public shared ({ caller }) func getBotsOrders(eventCanisterId : Principal, marketId : Event.MarketID) : async [Event.ImmutableOrder] {
        // assert that this is the trading bot server or an Admin
        await* _isAdmin(caller);

        await Event.service(Principal.toText(eventCanisterId)).getUserOrdersByMarket(marketId);
    };

    // =================================== PRIVATE FUNCTIONS ======================================

    private func transfer(amount : Nat, user : Principal, memo : Blob) : async ICRC.Result {
        let fee = await ICRC.service(Constants.ICP_Canister).icrc1_fee();
        await ICRC.service(Constants.ICP_Canister).icrc1_transfer(_transferArgsFactory(amount, fee, user, memo));
    };

    private func _accountFactory(principal : Principal) : ICRC.Account {
        { owner = principal; subaccount = null };
    };
    private func _transferArgsFactory(amount : Nat, fee : Nat, to : Principal, memo : Blob) : ICRC.TransferArg {
        {
            to = _accountFactory(to);
            fee = ?fee;
            memo = ?memo;
            from_subaccount = null;
            created_at_time = ?Nat64.fromIntWrap(Time.now());
            amount = amount;
        };
    };

    private func _isAdmin(caller : Principal) : async* () {
        let contains = Set.contains(
            admins,
            phash,
            caller,
        );
        switch (contains) {
            case (?true) { /* do nothing, authorized */ };
            case (_) {
                throw Error.reject("Not Authorized");
            };
        };
    };

    private func complement(n : Nat) : Nat {
        return Constants.E8S - n;
    };

    private func oddsPremiumConversion(n : Nat) : Nat {
        return (Constants.E8S * Constants.E8S) / n;
    };

    private func oddsToPremium(odds : Nat, side : Event.OrderSide) : Nat {
        let buyPremium = oddsPremiumConversion(odds);
        if (side == #buy) {
            buyPremium;
        } else {
            complement(buyPremium);
        };
    };

    private func getBaseOrderCost(pod : Event.PlaceOrder) : Nat {
        let buySideCost = (oddsToPremium(pod.odds, #buy) * pod.contracts) / Constants.E8S;
        if (pod.side == #buy) {
            buySideCost;
        } else {
            pod.contracts - buySideCost;
        };
    };
};
