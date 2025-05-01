# Trading Bot Template Guide

This is a template repository to guide Market Makers (MMs) on how to use bookie.win API to create a trading bot.

One of the most important components to this template is the identity created at `src/example_server/ic/index`. The idea of this identity will hold the ckBTC fund and the identity will be able to place/update/get and cancel any bets. It works by making signed calls on behalf of the MM so that the MM can place/cancel/get bets without having to approve each call manually.

Another important component in this template repo is the example_usage / example_server/index file this demonstrates how a MM could interact with the canister via an on/off-chain server and more importantly how the MM can call to the "Game Controller" to get details regarding games that are currently live on bookie.win.

NB: This is by no means the only way someone can integrate with bookie.win's API it is simply a template based off of trading bots that have been built previously. Developing new innovative ways of integrating with bookie.win's API is encouraged.

## Prerequisites

1. `dfx` version 0.19.0 or greater [https://internetcomputer.org/docs/current/developer-docs/getting-started/hello-world]
2. `node` we use version 18 or greater
3. `icblast` - we use version ^2.0.46

## Setup

### Choose a hash identity for your icblast principal

e.g. like the one below uses `"template-trading-bot"` perferably something a bit more complex so no one is able to guess it.
You could also encrypt this elsewhere and decrypt from within the server so if someone gains access to your environment variables they won't be able to use it directly. (Although that is up to you)

### Set up .env file

```bash
GAME_CONTROLLER_HOST="https://game-controller-staging-f4122b96027d.herokuapp.com"
HASH_IDENTITY="template-trading-bot"
API_KEY="06d4f839-7b18-46bb-a91a-218f9e4d0000"
```

### Run Node script to get principal

Run the following script to get the principal for your trading bot server. E.g.:

`> node src/get-principal.mjs template-trading-bot`

Output: `esy6y-t7wce-iq3eo-y7dzt-snwj2-nwxmi-mini2-cragm-tq2cc-s4nsf-sae`

### Deposit Funds to the identity

1. Once you have got your principalId (as shown in the step above)
2. Copy the principal
3. Go to plug or any other wallet provider and send the princpal of the tradingBot however much money you wish to begin with in ckBTC.
4. Here are some instructions on how to get ckBTC if you are unsure [https://forum.dfinity.org/t/question-how-to-buy-ckbtc/18450]

### Create your server

This is up to the Market Maker to decide on the logic for this. bookie.win can suggest api's that may faciliate integration.

## Endpoints

### fetchOrderBooks

This function fetches the order books for all markets on an event.

#### Params

- canisterID : string - The canister ID of the event

#### Returns

OrderBooksResponse - The order books for all the markets on the event

### fetchOrderBook

This function fetches the order book for a specific market on an event.

#### Params

- marketId : bigint - The id of the market
- canisterID : string - The canister ID of the event

#### Returns

OrderBookResponse - The order book for the specified market

### placeBet

This function places a bet on a given market.

#### Params

- canisterID : string - The canister ID of the event
- marketId : bigint - The id of the market
- order : PlaceOrder - Object containing the bet details

#### Returns

ImmutableOrder - The created order with details

### cancelBet

This function cancels a specific bet by orderId.

#### Params

- canisterID : string - The canister ID of the event
- orderId : string - The ID of the order to cancel

#### Returns

number - The refund amount of the order

### updateOrder

This function updates the odds of an existing order.

#### Params

- canisterID : string - The canister ID of the event
- orderId : string - The ID of the order to update
- newOdds : number - The new odds to set

#### Returns

ImmutableOrder - The updated order with new details

### getBotsOrdersByMarket

This function retrieves all orders for a specific market.

#### Params

- canisterID : string - The canister ID of the event
- marketId : bigint - The id of the market

#### Returns

Array<ImmutableOrder> - List of all orders for the specified market

### getBotsOrders

This function retrieves all orders across all markets.

#### Params

- canisterID : string - The canister ID of the event

#### Returns

Array<ImmutableOrder> - List of all orders

### getOrder

This function retrieves a specific order by ID.

#### Params

- canisterID : string - The canister ID of the event
- orderId : string - The ID of the order to retrieve

#### Returns

ImmutableOrder - The requested order details

### validateBetMatch

This function validates if a bet can be matched.

#### Params

- canisterID : string - The canister ID of the event
- marketId : bigint - The id of the market
- order : PlaceOrder - The order to validate
- principal : Principal - The principal making the bet

#### Returns

boolean - Whether the bet can be matched

# Useful command examples

```bash
dfx canister --network ic call ryjl3-tyaaa-aaaaa-aaaba-cai icrc1_balance_of '(record {owner=principal "3o2d5-mqaaa-aaaag-ak6gq-cai"; subaccount=null})'

dfx canister call or2ch-3iaaa-aaaag-qjulq-cai --network ic getOrderBook '(1:nat)'

dfx canister call or2ch-3iaaa-aaaag-qjulq-cai --network ic getMatchedOrder '("c638f82c-8887-4d48-86c6-50437a26ca8b")'


dfx canister call or2ch-3iaaa-aaaag-qjulq-cai --network ic getOrder '("df8022ba-b30d-4ba3-9d43-fb1461c28aa8")'


dfx canister call or2ch-3iaaa-aaaag-qjulq-cai --network ic getGraphData '()'

dfx canister call or2ch-3iaaa-aaaag-qjulq-cai --network ic getOrdersMap '()'

dfx canister call or2ch-3iaaa-aaaag-qjulq-cai --network ic getMatchedOrdersMap '()'

dfx canister call or2ch-3iaaa-aaaag-qjulq-cai --network ic getOrderBookSideMap '()'

dfx canister call or2ch-3iaaa-aaaag-qjulq-cai --network ic getTransferMap '(1:nat, opt true)'

dfx canister call or2ch-3iaaa-aaaag-qjulq-cai --network ic getTransferMap '(1:nat, null)'
```