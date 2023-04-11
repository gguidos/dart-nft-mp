export default function makeMint({
  mintDataObject,
  makeMintTransactionBlob,
  mintResponseObject,
  createXRPLTransaction
}) {
  return Object.freeze({ mint });

  function mint({ requestData, wallet }) {
    return new Promise (async (resolve, reject) => {
      try {
        const mintTransactionBlob = getTransactionBlob({ requestData, wallet });
        const mintedResults = await createXRPLTransaction({ transactionBlob: mintTransactionBlob.params, wallet });
        const mintResponse = makeResponse({
          minted: mintedResults,
          transactionType: mintTransactionBlob.params.TransactionType,
          uploadID: mintTransactionBlob.uploadID,
          audioFileURI: mintTransactionBlob.audioFileURI,
          coverFileURI: mintTransactionBlob.coverFileURI,
          jsonFileURI: mintTransactionBlob.jsonFileURI,
          metadata: requestData.metadata
        });

        const response = {
          mintResponse,
          mintTransactionBlob,
          mintedResults
        };
        
        resolve(response);
      } catch(err) {
        reject(err);
      }
    });
  }
  
  function makeResponse({ 
    minted,
    uploadID,
    audioFileURI,
    coverFileURI,
    jsonFileURI,
    transactionType,
    metadata
  }) {

    const mintedModifiedNodeTokens = minted.result.meta.AffectedNodes.map(node => {
      return node.ModifiedNode.FinalFields.NFTokens
    })[0];

    const NFToken = mintedModifiedNodeTokens
    .map(token => token.NFToken)
    .filter(token => token.URI === minted.result.URI)[0];
    const responseObj = mintResponseObject({
      uploadID,
      NFTokenID: NFToken.NFTokenID,
      audioFileURI,
      coverFileURI,
      jsonFileURI,
      transactionType,
      minted,
      metadata
    })
    return {
      transactionType: responseObj.transactionType(),
      uploadID: responseObj.uploadID(),
      audioFileURI: responseObj.audioFileURI(),
      coverFileURI: responseObj.coverFileURI(),
      jsonFileURI: responseObj.jsonFileURI(),
      minter: responseObj.minter(),
      fee: responseObj.fee(),
      issuer: responseObj.issuer(),
      URI: responseObj.URI(),
      hash: responseObj.hash(),
      NFTokenID: responseObj.NFTokenID(),
      mintedBy: responseObj.mintedBy(),
      createdOn: responseObj.createdOn(),
      metadata: responseObj.metadata()
    };
  }

  function getTransactionBlob({ requestData, wallet }) {
      try {
        const mintDataObj = mintDataObject({ requestData });
        const issuer = mintDataObj.params.issuer();
        const ipfsAddress = mintDataObj.params.ipfsAddress();
        const account = wallet.classicAddress;
        const mintTransactionBlobObj = makeMintTransactionBlob({ params: { Issuer: issuer, ipfsAddress, account } })

        return {
          uploadID: mintDataObj.uploadID(),
          audioFileURI: mintDataObj.audioFileURI(),
          coverFileURI: mintDataObj.coverFileURI(),
          jsonFileURI: mintDataObj.jsonFileURI(),
          params: {
            Account: mintTransactionBlobObj.Account(),
            Flags: mintTransactionBlobObj.Flags(),
            Issuer: mintTransactionBlobObj.Issuer(),
            NFTokenTaxon: mintTransactionBlobObj.NFTokenTaxon(),
            TransactionType: mintTransactionBlobObj.TransactionType(),
            URI: mintTransactionBlobObj.URI()
          }
        }
      } catch(err) {
        throw new Error(err)
      }
  }
}