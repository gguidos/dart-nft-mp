export default function makeAcceptOfferDataObject() {
  return Object.freeze({ acceptOfferDataObject })
  function acceptOfferDataObject({ data }){
    const {
      TransactionType = 'NFTokenAcceptOffer',
      account,
      NFTokenSellOffer,
      NFTokenBuyOffer,
      NFTokenBrokerFee
    } = data;
    
    return Object.freeze({
      TransactionType: () => TransactionType,
      Account: () => account,
      NFTokenSellOffer: () => NFTokenSellOffer,
      NFTokenBuyOffer: () => NFTokenBuyOffer,
      NFTokenBrokerFee: () => NFTokenBrokerFee
    })
  }
}