export default function makeOfferDataObject() {
  return Object.freeze({ offerDataObject })
  function offerDataObject({ data }){
    const {
      seed,
      account,
      owner,
      amount,
      duration,
      destination,
      expiration,
      flags,
      NFTokenSellOffer,
      NFTokenBuyOffer,
      NFTokenID
    } = data;

    if (duration) {
      let d = new Date();
      d.setDate(d.getDate() + parseInt(duration))
    }

    return Object.freeze({
      seed: () => seed,
      account:() => account,
      amount: () => amount,
      owner: () => owner,
      flags: () => flags,
      expiration: () => duration,
      destination: () => destination,
      NFTokenBuyOffer: () => NFTokenBuyOffer,
      NFTokenSellOffer: () => NFTokenSellOffer,
      NFTokenID: () => NFTokenID
    })
  }
}