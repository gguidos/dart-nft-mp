export default function makeSellOfferResultsObject() {
  return Object.freeze({ sellOfferResultsObject })
  function sellOfferResultsObject({ data }) {
    const {
      nft_id,
      offers
    } = data;

    const nOffers = offers.map(offer => {
      return Object.freeze({
        amount: offer.amount,
        destination: offer.destination,
        flags: offer.flags,
        NFTOfferIndex: offer.nft_offer_index,
        owner: offer.owner
      })
    })

    return Object.freeze({
      nft_id: () => nft_id,
      offers: () => nOffers
    })
  }
}