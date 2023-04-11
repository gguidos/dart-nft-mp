export default function makeBuyOfferProcess({
  findMintedNFTs,
  getWallet,
  offers,
  createOffer,
  updateDocument
}) {
  return Object.freeze({ buyOfferProcess })
  function buyOfferProcess({ data }){
    return new Promise(async (resolve, reject) => {
      try {
        const buyerWalletObj = await getWallet({ seed: data.params.seed })
        const buyerWallet = buyerWalletObj.account()
        const query = { NFTokenID: data.params.NFTokenID }

        const mintedNFTs = await findMintedNFTs({ query })

        if (!mintedNFTs.length
          || !mintedNFTs[0].brokedSellOffer
          || expired({ endDate: mintedNFTs[0].brokedSellOffer.endDate })
          || buyerWallet.classicAddress === mintedNFTs[0].issuer)
          return reject('Unauthorized operation');

        if (mintedNFTs[0].brokedSellOffer) {
          if (data.params.amount < mintedNFTs[0].brokedSellOffer.startPrice)
            return reject('The amount to bid must be higher than the auctions initial price.');
        }

        const buyOffers = await offers({
          nft_id: data.params.NFTokenID,
          type: 'NFTBuyOffers'
        });
        
        const bids = buyOffers.offers.map(offer => parseInt(offer.amount))
        const highestBid =  Math.max(...bids)

        if (data.params.amount <= highestBid) return reject('The amount to bid must be higher than the auctions highest bid.')

        data.params.flags = null
        data.params.account = data.userInfo.xrpWallet
        data.params.owner = mintedNFTs[0].issuer

        const offerTx = await createOffer({ data: data.params, wallet: buyerWallet })

        const updateQuery = {
          NFTokenID: data.params.NFTokenID
        }

        const updateParams = {
          $addToSet: { buyOffers: offerTx }
        }

        updateDocument(updateQuery, updateParams)

        resolve(mintedNFTs)
      } catch(error) {
        reject(error);
      }
    });
  }

  function expired ({ endDate }) {
    const firstDate = new Date(endDate)
    const secondDate = new Date()

    if (firstDate.setHours(0, 0, 0, 0) < secondDate.setHours(0, 0, 0, 0)) {
      return true;
    }

    return false;
  };
}