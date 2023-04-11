export default function makeOfferBlobObj({ xrpl }) {
  return Object.freeze({ offerObj })
  function offerObj({ params, config }){
    const {
      destination,
      account,
      owner,
      amount,
      flags,
      NFTokenID
    } = params;

    const { TransactionType } = config;

    let expiration = params.expiration;

    if (expiration !== undefined) {
      expiration = xrpl.isoTimeToRippleTime(expiration);
    }

    return Object.freeze({
      Expiration: () => expiration,
      Account: () => account,
      Amount: () => amount,
      Owner: () => owner,
      Destination: () => destination,
      Flags: () => flags,
      NFTokenID: () => NFTokenID,
      TransactionType: () => TransactionType
    })
  }
}