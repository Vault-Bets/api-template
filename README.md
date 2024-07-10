# Trading Bot Template Guide

This is a template repository to guide Market Makers (MMs) on how to use Vault Bets API to create a trading bot.

The most important component in this template is the canister found at `src/canister`. The idea of this trading bot canister is to allow the Market Maker (MM) to deposit funds to the canister and make signed calls on behalf of the MM so that the MM can place/cancel/get bets without having to approve each call manually.

The second component in this template repo is the example_usage / example_server this is simply a typescript module that demonstrates how a MM could interact with the canister via an on/off-chain server and more importantly how the MM can call to the "Game Controller" to get details regarding games that are currently live on Vault Bet.

NB: This is by no means the only way someone can integrate with Vault Bets API it is simply a template based off of trading bots that have been build previously and coming up with new innovative ways of integrating with Vault Bets API is encouraged.

## Prerequisites

1. `dfx` version 0.19.0 or greater [https://internetcomputer.org/docs/current/developer-docs/getting-started/hello-world]
2. `mops` CLI version 0.44.1 or greater and API 1.2 or greater installed [https://mops.one/]
3. `node`
4. `icblast`

## Setup

### Choose a hash identity for your icblast principal

e.g. like the one below uses `"template-trading-bot"`

### Set up .env file

```bash
GAME_CONTROLLER_HOST="https://game-controller-staging-f4122b96027d.herokuapp.com"
TRADING_BOT_CANISTER_ID="3o2d5-mqaaa-aaaag-ak6gq-cai"
HASH_IDENTITY="template-trading-bot"
API_KEY="06d4f839-7b18-46bb-a91a-218f9e4d3475"
```

### Run Node script to get principal

Run the following script to get the principal for your trading bot server. E.g.:

`> node src/get-principal.mjs template-trading-bot`

Output:  `esy6y-t7wce-iq3eo-y7dzt-snwj2-nwxmi-mini2-cragm-tq2cc-s4nsf-sae`

### Deploy the canister

To deploy your canister everything should already be setup. Make any changes you want to the canister before deploying (not a requirement).

Run:

`mops install`

`dfx deploy tradingBot --network ic '(principal "<principal_id_of_your_server>")'`

e.g. `dfx deploy tradingBot --network ic '(principal "esy6y-t7wce-iq3eo-y7dzt-snwj2-nwxmi-mini2-cragm-tq2cc-s4nsf-sae")'`

### Deposit Funds to the canister

1. Go to canister_ids.json
2. Copy the principal of the canister_id of your tradingBot
3. Go to plug or any other wallet provider and send the princpal of the tradingBot canister however much money you wish to test with.

### Create your server

This is up to the Market Maker to decide on the logic for this. VaultBet can suggest api's that may faciliate integration.
Vault bet also has a Open source trading bot which you can view for Ideas here: [https://github.com/Vault-Bets/trading_bot]

## Endpoints

### Place Bet

#### Params

#### Returns 

### Cancel Bet

#### Params

#### Returns 

### Fetch Order Book

#### Params

#### Returns 

## Advised usage

## Alternative Methods

### Setup a heatbeat function in the canister

### Use icblast as your canister and allow it to make signed calls directly to the orderbooks

```bash
dfx deploy tradingBot --network development --yes --argument '(principal "fharu-aazmu-p36k6-lkjc4-lvtak-q2smq-umn7o-k7bow-g4rps-mlt27-rqe")'

dfx canister call mmhmp-iaaaa-aaaag-qjuea-cai --network development placeBet '(principal "kjmxq-jaaaa-aaaag-qjusa-cai", 1:nat, record {odds=300000000:nat; side=variant { sell }; contracts=10000000:nat})'

575000000

dfx canister call 3o2d5-mqaaa-aaaag-ak6gq-cai --network development cancelBet '(principal "kjmxq-jaaaa-aaaag-qjusa-cai", 1:nat, "3ed66058-fc0b-4896-a0b1-569064df6063")'

dfx canister call 3o2d5-mqaaa-aaaag-ak6gq-cai --network ic placeBet '(principal "kjmxq-jaaaa-aaaag-qjusa-cai", 2:nat, record {odds=300000000:nat; side=variant { buy }; contracts=10000000:nat})'

dfx canister call 3o2d5-mqaaa-aaaag-ak6gq-cai --network ic placeBet '(principal "kjmxq-jaaaa-aaaag-qjusa-cai", 2:nat, record {odds=400000000:nat; side=variant { sell }; contracts=10000000:nat})'

dfx canister call mmhmp-iaaaa-aaaag-qjuea-cai --network ic placeBet '(principal "or2ch-3iaaa-aaaag-qjulq-cai", 2:nat, record {odds=200000000:nat; side=variant { buy }; contracts=30000:nat})'

placeBet(eventCanisterId : Principal, marketId : Event.MarketID, order : Event.PlaceOrder)


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

## How to top up the trading bot

Literally just send ICP to the canister ID.

```bash

```
