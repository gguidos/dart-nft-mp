export default function makeBuyOffer({
  offerDataObject,
  makeOfferBlob,
  createXRPLTransaction
}) {
  return Object.freeze({ offer })
  function offer({ data, wallet }) {
    return new Promise(async(resolve, reject) => {
      try {
        const dataObj = offerDataObject({ data })

        const params = {
          destination: dataObj.destination(),
          amount: dataObj.amount(),
          owner: dataObj.owner(),
          account: dataObj.account(),
          NFTokenID: dataObj.NFTokenID(),
          flags: dataObj.flags()
        }

        const blobObj = makeOfferBlob({ params })

        const offerTxBlob = {
          Amount: blobObj.Amount(),
          Owner: blobObj.Owner(),
          NFTokenID: blobObj.NFTokenID(),
          Destination: blobObj.Destination(),
          Account: blobObj.Account(),
          Flags: blobObj.Flags(),
          TransactionType: blobObj.TransactionType()
        }

        Object.keys(offerTxBlob).forEach(key => offerTxBlob[key] === undefined && delete offerTxBlob[key])

        const offerTx = await createXRPLTransaction({
          transactionBlob: offerTxBlob,
          wallet 
        })

        resolve(offerTx.result)
      } catch (error) {
        reject(error)
      }
    })
  }
}