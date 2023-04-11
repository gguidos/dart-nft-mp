export default function makeBrokerSale({
  findMintedNFTs,
  makeSeedObj,
  offers,
  getWallet,
  acceptOffer,
  updateDocument,
}) {
  return Object.freeze({ brokerSale })
  function brokerSale({ data }) {
    return new Promise(async (resolve, reject) => {
      try {
        const query = {
          NFTokenID: data.params.NFTokenID,
          owner: data.userInfo.xrpWallet
        }
        
        const xrpWallet = data.userInfo.xrpWallet

        // If
        // NFToken doesn't exists
        // or NFToken doesn't contains a brokedSellOffer
        // or NFTokens expiring date has not passed
        // or NFToken doesn't contain buyoffers
   
        const NFTokens = await findMintedNFTs({ query, xrpWallet });

        if (!NFTokens.length
        || !NFTokens[0].brokedSellOffer
        // || !expired({ endDate: NFTokens[0].brokedSellOffer.endDate })
        || !NFTokens[0].highestBuyOffer)
          return reject('Unauthorized operation');
        
        //TODO: Check buyers balance
        
        const seed = process.env.RIPPLE_XLS20_SECRET
        const orgSeedObj = makeSeedObj({ seed });
        const orgSeed = orgSeedObj.getSeed();
        const orgWalletObj = await getWallet({ seed: orgSeed });
        const orgWallet = orgWalletObj.account();

        const NFTokenBrokerFee = NFTokens[0].highestBuyOffer.amount * 0.02;

        const txBlob = {
          TransactionType: 'NFTokenAcceptOffer',
          account: orgWallet.classicAddress,
          NFTokenSellOffer: NFTokens[0].sellOffer.NFTOfferIndex,
          NFTokenBuyOffer: NFTokens[0].highestBuyOffer.NFTOfferIndex,
          // NFTokenBrokerFee: NFTokenBrokerFee
        }

        // Broker sale
        const brokerSaleTx = await acceptOffer({ data: txBlob, wallet: orgWallet })

        // Remove brokedSellOffer from NFTokenID
        // Remove buyOffers from NFTokenID
        const updateParams = {
          $unset: { 
            brokedSellOffer: '',
            highestBuyOffer: '',
            buyOffers: ''
          },
          $set: { owner: NFTokens[0].highestBuyOffer.bidOwner }
        }

        updateDocument(query, updateParams)
        // Change NFTokenID owner
        resolve(brokerSaleTx)
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