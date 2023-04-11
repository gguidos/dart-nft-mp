export default function makeSellOfferDataObject() {
  return Object.freeze({ sellOfferDataObject })
  function sellOfferDataObject({ data }){
    const {
      seed,
      amount,
      flags,
      duration,
      destination,
      expiration = undefined,
      NFTokenID
    } = data;

    if (duration) {
      let d = new Date();
      d.setDate(d.getDate() + parseInt(duration))
    }

    return Object.freeze({
      seed: () => seed,
      amount: () => amount,
      flags: () => flags,
      expiration: () => duration,
      destination: () => destination,
      NFTokenID: () => NFTokenID
    })
  }
}