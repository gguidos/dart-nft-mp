export default function makeArtistAccountConnection({
  makeSeedObj,
  makeConnectionParamsObj,
  createXRPLTransaction,
  getWallet,
  makeNFTokenMinterObj
}) {
  return Object.freeze({ artistAccountConnection })
  function artistAccountConnection ({ account }) {
    return new Promise (async (resolve, reject) => {
      try {
        const seedObj = makeSeedObj({ seed: account.seed });
        const seed = seedObj.getSeed();
        const wallet = await getWalletObj({ seed });
        const connectionParamsObj = makeConnectionParamsObj({ classicAddress: wallet['classicAddress'] })
        const params = {
          Account: connectionParamsObj.getAccount(),
          TransactionType: connectionParamsObj.getTransactionType(),
          SetFlag: connectionParamsObj.getSetFlag(),
          NFTokenMinter: connectionParamsObj.getMinter()
        }
        createXRPLTransaction({ transactionBlob: params, wallet })
        .then(res => {
          const NFTokenMinterObj = makeNFTokenMinterObj({ account: res })
          const NFTokenMinter = {
            NFTokenMinter: NFTokenMinterObj.getNFTokenMinter()
          }
          resolve(NFTokenMinter)
        })
        .catch(err => reject(err))
      } catch(error) {
        resolve(error.message)
      }
    });
  }

  function getWalletObj({ seed }) {
    return new Promise((resolve, reject) => {
      try {
        getWallet({ seed })
        .then(res => resolve(res.account()))
        .catch(err => reject(err))
      } catch(error) {
        reject(error)
      }
    })
  }
}
