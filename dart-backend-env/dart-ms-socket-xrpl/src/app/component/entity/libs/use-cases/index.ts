import eventEmitter from '../../event-handler';

import {
  mintDataObject,
  mintResponseObject,
  offerDataObject,
  sellOfferDataObject,
  sellOfferResultsObject,
  offerResultsObject,
  acceptOfferDataObject
} from '../data-processing';

import {
  insertOneDocument,
  findDocumentsByQuery,
  updateDocument
} from '../data-access';

import {
  makeNFTokenMinterObj,
  makeConnectionParamsObj, 
  makeClassicAddressObj, 
  makeArtistAccountObj,
  makeSeedObj 
} from '../connection';

import {
  getWallet,
  createXRPLTransaction,
  createXRPLRequest,
  makeOfferBlob,
  makeSellOfferBlob,
  makeMintTransactionBlob,
} from '../xrpl';

import makeArtistAccountConnection from './connect-account';
import makeMintProcess from './mint-nft-process';
import makeMintNFT from './mint-nft';
import makeAcceptOffer from './make-accept-offer-process';
import makeTransferNFTProcess from './transfer-nft-process';
import makeFindMintedNFTs from './list-nfts-process';
import makeGetAccountNFTS from './get-account-nfts';
import getSellOffers from './get-sell-offers';
import getOffers from './get-offers';
import makeSellOfferProcess from './sell-offer-process';
import makeOffer from './make-offer';
import makeBuyOfferProcess from './buy-offer-process';
import makeBrokerSaleProcess from './make-broker-sale';
const config = require('./config')

const mintNFTProcess = ({ requestData }) => {
  return new Promise((resolve, reject) => {
    eventEmitter.emit('mintprocess', `[mintNFTProcess] Starting mint process`)
    try {
      makeMintProcess({
        makeSeedObj,
        getWallet,
        mintNFT,
        transferNFTProcess,
        insertOneDocument
      })
      .mintProcess({ requestData })
      .then(res => {
        eventEmitter.emit('mintprocess', `[mintNFTProcess] Mint process finalized`)
        resolve(res)
      })
      .catch(err => {
        eventEmitter.emit('mintprocess', `[mintNFTProcess] Error: ${err}`)
        reject(err)
      })
    } catch(error) {
      eventEmitter.emit('mintprocess', `[mintNFTProcess] Error: ${error}`)
      reject(error);
    }
  })
}

const mintNFT = ({ requestData, wallet }) => {
  return new Promise((resolve, reject) => {
    try {
      eventEmitter.emit('mintprocess',`[mintNFTProcess] Minting NFT...`);
      makeMintNFT({
        mintDataObject,
        makeMintTransactionBlob,
        mintResponseObject,
        createXRPLTransaction
      })
      .mint({ requestData, wallet })
      .then(res => {
        eventEmitter.emit('mintprocess',`[mintNFTProcess][mintNFT] NFT minted`)
        resolve(res)
      })
      .catch(err => {
        eventEmitter.emit('mintprocess', `[mintNFTProcess][mintNFT] Error: ${err}`)
        reject(err)
      })
    } catch(error) {
      eventEmitter.emit('mintprocess', `[mintNFTProcess][mintNFT] Error: ${error}`)
      reject(error);
    }
  });
}

const transferNFTProcess = ({ destination, NFTokenID, orgWallet, issuerWallet }) => {
  return new Promise((resolve, reject) => {
    try {
      eventEmitter.emit('mintprocess',
      `[mintNFTProcess][transferNFTProcess] Starting transfer process`);
      makeTransferNFTProcess({
        createOffer,
        sellOffers,
        acceptOffer
      })
      .transferProcess({ destination, NFTokenID, orgWallet, issuerWallet })
      .then(res => {
        eventEmitter.emit('mintprocess',
          `[mintNFTProcess][transferNFTProcess] Transfer process finalized`)
        resolve(res)
      })
      .catch(err => {
        eventEmitter.emit('mintprocess', `[mintNFTProcess][transferNFTProcess]Error: ${err}`)
        reject(err)
      })
    } catch(error) {
      eventEmitter.emit('mintprocess', `[mintNFTProcess][transferNFTProcess]Error: ${error}`)
      reject(error);
    }
  });
}

const findMintedNFTs = ({ query, xrpWallet }) => {
  eventEmitter.emit('log', `[listNFTsProcess] Starting search process`)
  return new Promise((resolve, reject) => {
    try {
      makeFindMintedNFTs({ 
        findDocumentsByQuery,
        offers,
        eventEmitter
      })
      .listNFTProcess({ query, xrpWallet })
      .then(res => {
        eventEmitter.emit('log',
          `[listNFTsProcess] List NFT process finalized`)
        resolve(res)
      })
      .catch(err => {
        eventEmitter.emit('log', `[listNFTsProcess] Error: ${err}`)
        reject(err)
      })
    } catch(error) {
      eventEmitter.emit('log', `[listNFTsProcess] Error: ${error}`)
      reject(error);
    }
  });
}

const brokedSellOfferProcess = ({ data }) => {
  eventEmitter.emit('log', `[sellOfferProcess] Starting sell offer process`)
  return new Promise((resolve, reject) => {
    try {
      makeSellOfferProcess({
        findMintedNFTs,
        makeSeedObj,
        createOffer,
        getWallet,
        updateDocument
      }).sellOfferProcess({ data })
      .then(res => {
        eventEmitter.emit('log',
          `[sellOfferProcess] Sell offer process finalized`)
        resolve(res)
      })
      .catch(err => {
        eventEmitter.emit('log', `[sellOfferProcess] Error: ${err}`)
        reject(err)
      })
    } catch(error) {
      eventEmitter.emit('log', `[sellOfferProcess] Error: ${error}`)
      reject(error);
    }
  });
}

const brokeredBuyOfferProcess = ({ data }) => {
  eventEmitter.emit('log', `[buyOfferProcess] Starting sell offer process`)
  return new Promise((resolve, reject) => {
    try {
      makeBuyOfferProcess({
        findMintedNFTs,
        getWallet,
        offers,
        createOffer,
        updateDocument
      }).buyOfferProcess({ data })
      .then(res => {
        eventEmitter.emit('log',
          `[buyOfferProcess] Sell offer process finalized`)
        resolve(res)
      })
      .catch(err => {
        eventEmitter.emit('log', `[buyOfferProcess] Error: ${err}`)
        reject(err)
      })
    } catch(error) {
      eventEmitter.emit('log', `[buyOfferProcess] Error: ${error}`)
      reject(error);
    }
  });
}

const brokerSaleProcess = ({ data }) => {
  return new Promise((resolve, reject) => {
    try {
      makeBrokerSaleProcess({
        findMintedNFTs,
        makeSeedObj,
        offers,
        getWallet,
        acceptOffer,
        updateDocument,
      })
      .brokerSale({ data })
      .then(res => { 
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
    } catch(error) {
      reject(error);
    }
  });
}

const sellOffers = ({ nft_id }) => {
  eventEmitter.emit('mintprocess', `[sellOffers] Getting sell offers`)
  return new Promise((resolve, reject) => {
    try {
      getSellOffers({
        sellOfferResultsObject,
        createXRPLRequest
      })
      .sellOffers({ nft_id, config })
      .then(res => {
        eventEmitter.emit('mintprocess', `[sellOffers] Sell offers found`)
        resolve(res)
      })
      .catch(err => {
        eventEmitter.emit('mintprocess', `[sellOffers] Error: ${err}`)
        reject(err)
      })
    } catch(error) {
      eventEmitter.emit('mintprocess', `[sellOffers] Error: ${error}`)
      reject(error);
    }
  });
}

const offers = ({ nft_id, type }) => {
  eventEmitter.emit('mintprocess', `[OFFERS] Getting ${type} offers`)
  return new Promise((resolve, reject) => {
    try {
      getOffers({
        offerResultsObject,
        createXRPLRequest
      })
      .offers({ nft_id, type, config })
      .then(res => {
        eventEmitter.emit('mintprocess', `[OFFERS] ${type} offers found`)
        resolve(res)
      })
      .catch(err => {
        eventEmitter.emit('mintprocess', `[OFFERS] Error: ${err}`)
        reject(err)
      })
    } catch(error) {
      eventEmitter.emit('mintprocess', `[OFFERS] Error: ${error}`)
      reject(error);
    }
  });
}

const createOffer = ({ data, wallet }) => {
  eventEmitter.emit('mintprocess', `[sellOffer] Creating sell offer`)
  
  return new Promise((resolve, reject) => {
    try {
      makeOffer({
        offerDataObject,
        makeOfferBlob,
        createXRPLTransaction
      })
      .offer({ data, wallet })
      .then(res => {
        eventEmitter.emit('mintprocess', `[sellOffer] Sell offer created`)
        resolve(res)
      })
      .catch(err => {
        eventEmitter.emit('mintprocess', `[sellOffer] Error: ${err}`)
        reject(err)
      })
    } catch(error) {
      eventEmitter.emit('mintprocess', `[sellOffer] Error: ${error}`)
      reject(error);
    }
  })
}

const acceptOffer = ({ data, wallet }) => {
  eventEmitter.emit('mintprocess', `[mintNFTProcess][transferNFTProcess][acceptOffer] Accepting sell offer`)

  return new Promise((resolve, reject) => {
    try {
      makeAcceptOffer({
        acceptOfferDataObject,
        createXRPLTransaction
      })
      .acceptOffer({ data, wallet })
      .then(res => {
        eventEmitter
        .emit('mintprocess',
        `[mintNFTProcess][transferNFTProcess][acceptOffer] Sell order accepted`)
        resolve(res)
      })
      .catch(err => {
        eventEmitter.emit('mintprocess', `[mintNFTProcess][transferNFTProcess][acceptOffer] Error: ${err}`)
        reject(err)
      })
    } catch(error) {
      eventEmitter.emit('mintprocess', `[mintNFTProcess][transferNFTProcess][acceptOffer] Error: ${error}`)
      reject(error);
    }
  });
}

const listNFTs = ({ data, userWallet }) => {
  return new Promise((resolve, reject) => {
    try {
      
    } catch(error) {
      reject(error);
    }
  });
}

const getAccountNFTS = ({ account }) => {
  return new Promise((resolve, reject) => {
    try {
      makeGetAccountNFTS({ createXRPLRequest })
      .getAccountNFTS({ account, config })
      .then(res => resolve(res))
      .catch(err => reject(err))
    } catch(error) {
      reject(error)
    }
  })
}

const artistAccountConnection = ({ account }) => {
  return new Promise((resolve, reject) => {
    makeArtistAccountConnection({
      makeNFTokenMinterObj,
      makeSeedObj,
      createXRPLTransaction,
      makeConnectionParamsObj,
      getWallet
    })
    .artistAccountConnection({ account })
    .then(res => resolve(res))
    .catch(err => reject(err))
  })
}



export {
  artistAccountConnection,
  mintNFTProcess,
  getAccountNFTS,
  findMintedNFTs,
  brokedSellOfferProcess,
  brokeredBuyOfferProcess,
  brokerSaleProcess,
  offers
}