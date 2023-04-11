export default function makeSellOfferBlobObj({ xrpl }) {
  return Object.freeze({ sellOfferObj })
  function sellOfferObj({ params, config }){
    const {
      destination,
      account,
      flags,
      amount,
      NFTokenID
    } = params;

    const {
      TransactionType
    } = config;

    let expiration = params.expiration;

    if (expiration !== undefined) {
      expiration = xrpl.isoTimeToRippleTime(expiration);
    }

    return Object.freeze({
      Expiration: () => expiration,
      Account: () => account,
      Amount: () => amount,
      Destination: () => destination,
      Flags: () => flags,
      NFTokenID: () => NFTokenID,
      TransactionType: () => TransactionType
    })
  }
}