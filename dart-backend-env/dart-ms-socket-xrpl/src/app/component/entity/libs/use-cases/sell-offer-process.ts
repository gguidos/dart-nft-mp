export default function makeSellOfferProcess({
  findMintedNFTs,
  makeSeedObj,
  getWallet,
  createOffer,
  updateDocument
}) {
  return Object.freeze({ sellOfferProcess })
  function sellOfferProcess({ data }){
    return new Promise(async (resolve, reject) => {
      try {
        const seedObj = makeSeedObj({ seed: data.params.seed })
        const seed = seedObj.getSeed()
   
        const issuerWalletObj = await getWallet({ seed })
        const issuerWallet = issuerWalletObj.account()

        const query = {
          NFTokenID: data.params.NFTokenID,
          owner: issuerWallet.classicAddress
        }

        const mintedNFT = await findMintedNFTs({
          query, xrpWallet: issuerWallet.classicAddress
        })

        if (!mintedNFT.length
          || !mintedNFT[0].salable ) return reject('Unauthorized operation')

        let params = {
          amount: data.params.amount,
          expiration: data.params.expiration,
          NFTokenID: data.params.NFTokenID,
          destination: process.env.RIPPLE_XLS20_ACCOUNT,
          account: issuerWallet.classicAddress,
          flags: 1
        }

        const sellOfferTx = await createOffer({ data: params, wallet: issuerWallet })


        const sellOfferQuery = { 
          NFTokenID: data.params.NFTokenID 
        }
        
        const sellOffers = []
        sellOffers.push(sellOfferTx)

        const brokedSellOffer = {
          expiration: params.expiration,
          startPrice: parseInt(params.amount),
          startDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
          endDate: data.params.endDate
        }

        const values = {
          brokedSellOffer,
          sellOffers
        }

        await updateDocument(sellOfferQuery, { $set: values })
       
        resolve(brokedSellOffer)
      } catch(error) {
        reject(error);
      }
    });
  }
}