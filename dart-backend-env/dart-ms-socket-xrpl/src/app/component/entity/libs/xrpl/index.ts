import * as xrpl from 'xrpl';
import makeGetWallet from './get-wallet';
import makeSellOfferBlobObj from './make-sell-offer-blob';
import makeOfferBlobObj from './make-offer-blob';
import makeMintTsBlob from './make-mint-ts-blob';
import makeCreateXRPLTransaction from './create-xrpl-transaction';
import makeCreateXRPLRequest from './client-xrpl-request';

const config = require('./config');

const getWallet = ({ seed }) =>
  makeGetWallet({ xrpl })
  .getWallet({ seed });

const makeMintTransactionBlob = ({ params }) =>
  makeMintTsBlob({ xrpl })
  .mintDataObject({ params, config: config.NFTokenMint });

const makeOfferBlob = ({ params }) =>
  makeOfferBlobObj({ xrpl })
  .offerObj({ params, config: config.NFTokenCreateOffer });

const makeSellOfferBlob = ({ params }) =>
  makeSellOfferBlobObj({ xrpl })
  .sellOfferObj({ params, config: config.NFTokenCreateOffer });
const createXRPLTransaction = ({ transactionBlob, wallet }) => {
  return new Promise((resolve, reject) => {
    try {
      makeCreateXRPLTransaction({ xrpl })
      .createXRPLTransaction({ transactionBlob, wallet })
      .then(res => resolve(res))
      .catch(err => reject(err))
    } catch (err) {
      throw new Error(err)
    }
  })
}

const createXRPLRequest = ({ requestOptions }) => {
  return new Promise((resolve, reject) => {
    try {
      makeCreateXRPLRequest({ xrpl })
      .clientXRPLRequest({ requestOptions })
      .then(res => resolve(res))
      .catch(err => {
        console.log(err)
        reject(err)
      })
    } catch(err) {
      console.log(err)
      throw new Error(err)
    }
  })
}

export {
  getWallet,
  makeMintTransactionBlob,
  makeSellOfferBlob,
  createXRPLTransaction,
  createXRPLRequest,
  makeOfferBlob
}