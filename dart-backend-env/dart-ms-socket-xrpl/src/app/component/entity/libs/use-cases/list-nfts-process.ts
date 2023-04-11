export default function makeListNFTProcess({
  findDocumentsByQuery,
  eventEmitter,
  offers
}) {
  return Object.freeze({ listNFTProcess })
  function listNFTProcess({ query, xrpWallet }){
    return new Promise((resolve, reject) => {
      try {
        findDocumentsByQuery(query)
        .then(async res => {
          const NFTs = await buildNFTList({ NFTs: res, xrpWallet });
          resolve(NFTs);
        })
        .catch(err => {
          reject(err);
        })
      } catch(error) {
        reject(error);
      }
    });
  }

  function buildNFTList({ NFTs, xrpWallet }) {
    return new Promise(async (resolve, reject) => {
      try {
        const nNFTs = []
        for(let nft of NFTs){

          let nNFT = {
            NFTokenID: nft['NFTokenID'],
            issuer: nft['issuer'],
            owned: false,
            salable: false,
            audioFileURI: nft['audioFileURI'],
            coverFileURI: nft['coverFileURI'],
            jsonFileURI: nft['jsonFileURI'],
            title: nft['metadata'].metadata.title,
            description: nft['metadata'].metadata.description,
            author: nft['metadata'].author.name,
            mintedBy: nft['mintedBy']
          }

          if (nft['owner'] === xrpWallet) nNFT.owned = true;

          const sellOffers = await offers({
            nft_id: nft['NFTokenID'],
            type: 'NFTSellOffers'
          });

          if (sellOffers.offers.length) {
            nNFT['sellOffer'] = sellOffers.offers.map(offer => ({
              bidOwner: offer.owner,
              NFTOfferIndex: offer.NFTOfferIndex
            }))[0];
          }

          if (!sellOffers.offers.length) nNFT.salable = true;

          if (nft['brokedSellOffer']){ 
            nNFT['brokedSellOffer'] = nft['brokedSellOffer']
            nNFT['brokedSellOffer']['startPrice'] = nNFT['brokedSellOffer']['startPrice'];
            const oneDay = 24 * 60 * 60 * 1000;
            const today = new Date()
            const endDate = new Date(nft['brokedSellOffer'].endDate)
            nNFT['brokedSellOffer'].daysLeft = endDate.getDate() - today.getDate()
          }

          const buyOffers = await offers({
            nft_id: nft['NFTokenID'],
            type: 'NFTBuyOffers'
          });

          if (buyOffers.offers.length) {
            nNFT['buyOffers'] = buyOffers.offers.map(offer => ({
              amount: parseInt(offer.amount),
              bidOwner: offer.owner,
              NFTOfferIndex: offer.NFTOfferIndex
            }));

            const bids = nNFT['buyOffers'].map(offer => parseInt(offer.amount))
            const highestBid =  Math.max(...bids)

            nNFT['highestBuyOffer'] = nNFT['buyOffers']
              .filter(offer => offer.amount === highestBid)[0]
          }

          nNFTs.push(nNFT);
        }

        resolve(nNFTs)
      } catch(error) {
        reject(error);
      }
    });
  }
}