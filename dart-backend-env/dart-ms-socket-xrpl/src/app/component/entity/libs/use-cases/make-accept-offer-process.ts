export default function makeAcceptOffer({ 
  acceptOfferDataObject,
  createXRPLTransaction
}) {
  return Object.freeze({ acceptOffer });
  function acceptOffer({ data, wallet }){
    return new Promise(async (resolve, reject) => {
      try {
        const acceptOfferDataObj = acceptOfferDataObject({ data, wallet });
        const acceptOfferData = {
          TransactionType: acceptOfferDataObj.TransactionType(),
          Account: acceptOfferDataObj.Account(),
          NFTokenSellOffer: acceptOfferDataObj.NFTokenSellOffer(),
          NFTokenBuyOffer: acceptOfferDataObj.NFTokenBuyOffer(),
          NFTTokenBrokerFee: acceptOfferDataObj.NFTokenBrokerFee()
        };

        Object.keys(acceptOfferData)
        .forEach(key => acceptOfferData[key] === undefined
          && delete acceptOfferData[key])

        createXRPLTransaction({ transactionBlob: acceptOfferData, wallet })
        .then(res => resolve(res))
        .catch(err => reject(err));
      } catch(error) {
        throw new Error(error);
      }
    });
  }
}