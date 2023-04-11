# MICRO-SERVICE XPRL implementation

The micro-service implements the XRPL funcionality.

The micro-service is build upon "Websockets architecture" using expressJS (and HTTP) as a wrapper.

## Technologies

* NodeJS: Version 18.x.x

* Redis: Version 7.0.5

* MongoDB: Version 6.0.1

## Instalation

1. git clone the project
2. npm install
3. npm start

## Requisites

* An XRP wallet
  1. Visit: <https://xrpl.org/xrp-testnet-faucet.html>
  2. Choose: NFT-Devnet
  3. Add the wallets' address and secret to the .env file

## Use-cases

* Wallet connect
  Adds the organisations XRP wallet, as NFTokenMinter, to the creators XRP wallet.

## Logs

Check the "logs" directory within the root directory.

## TODO

1. Create rules for validating the request.
2. Add the micro-service and the rules to the gateway.
3. Add the NFT-minter endpoint and use-case.
