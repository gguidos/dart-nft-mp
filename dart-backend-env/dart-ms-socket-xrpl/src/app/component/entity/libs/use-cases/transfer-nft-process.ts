export default function makeTransferProcess({
  createOffer,
  sellOffers,
  acceptOffer
}) {
  return Object.freeze({ transferProcess })
  function transferProcess({ destination, NFTokenID, orgWallet, issuerWallet }) {
    return new Promise(async (resolve, reject) => {
      try {
        const sellOfferData = {
          destination,
          NFTokenID,
          account: orgWallet.classicAddress
        };
        const sellOfferTxResults = await makeSellOffer({ data: sellOfferData, wallet: orgWallet });
        const sellOfferReqResults = await getSellOffers({ nft_id: NFTokenID })
        const SellOfferToTransfer = sellOfferReqResults['offers'].filter(offer =>
          offer.destination === destination &&
          offer.amount === '0')[0];

        const NFTokenSellOffer = SellOfferToTransfer.NFTOfferIndex;
        
        const acceptOfferTxResults = await acceptOffer({ 
          data: {
            account: destination,
            NFTokenSellOffer
          },
          wallet: issuerWallet
        })
        
        resolve({ sellOfferTxResults, acceptOfferTxResults })
      } catch(error) {
        reject(error);
      }
    });
  }

  function getSellOffers({ nft_id }) {
    return new Promise((resolve, reject) => {
      try {
        sellOffers({ nft_id })
        .then(res => resolve(res))
        .catch(err => reject(err))
      } catch(error) {
        reject(error);
      }
    });
  }

  function makeSellOffer({ data, wallet }) {
    return new Promise((resolve, reject) => {
      try {
        const sellOfferData = {
          amount: "0",
          destination: data.destination,
          NFTokenID: data.NFTokenID,
          account: data.account,
          flags: 1
        };
        createOffer({ data: sellOfferData, wallet })
        .then(res => resolve(res))
        .catch(err => reject(err));
      } catch(error) {
        reject(error);
      }
    });
  }
}