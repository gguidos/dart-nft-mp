export default function makeMintProcess({
  makeSeedObj,
  getWallet,
  mintNFT,
  transferNFTProcess,
  insertOneDocument,
}) {
  return Object.freeze({ mintProcess });

  function mintProcess({ requestData }) {
    return new Promise (async (resolve, reject) => {
      try {
        const wallets = await getWallets({ seed: requestData.seed })
        const {
          mintResponse,
          mintTransactionBlob,
          mintedResults
        } = await mintNFT({ requestData, wallet: wallets['orgWallet'].account() });

        const {
          sellOfferTxResults,
          acceptOfferTxResults
        } = await transferNFTProcess({
          destination: wallets['userWallet'].account().classicAddress,
          NFTokenID: mintResponse.NFTokenID,
          orgWallet: wallets['orgWallet'].account(),
          issuerWallet: wallets['userWallet'].account()
        })

        insertOneDocument({
          ...mintResponse,
          owner: wallets['userWallet'].account().classicAddress,
          mintTransactionBlob,
          mintedResults,
          sellOfferTxResults,
          acceptOfferTxResults
        })
        
        resolve(mintResponse);
      } catch(err) {
        reject(err.message);
      }
    });
  }

  function getWallets({ seed }) {
    return new Promise(async (resolve, reject) => {
      try {
        const userSeedObj = makeSeedObj({ seed });
        const userSeed = userSeedObj.getSeed();
        const userWallet = await getWallet({ seed: userSeed });
        const orgSeedObj = makeSeedObj({ seed: process.env.RIPPLE_XLS20_SECRET });
        const orgSeed = orgSeedObj.getSeed();
        const orgWallet = await getWallet({ seed: orgSeed });
        resolve({ userWallet, orgWallet });
      } catch(error) {
        reject(error);
      }
    });
  }
}