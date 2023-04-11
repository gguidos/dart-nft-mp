export default function makeMintResultsObject() {
  return Object.freeze({ mintResultsObject });

  function mintResultsObject({ 
    uploadID,
    NFTokenID,
    transactionType,
    audioFileURI,
    coverFileURI,
    jsonFileURI,
    createdOn = Date.now(),
    minted,
    metadata
  }) {
    const {
      Account,
      Issuer,
      Fee,
      URI,
      hash
    } = minted.result;
    const mintedBy = process.env.ORG_NAME;
    
    return Object.freeze({
      uploadID: () => uploadID,
      minter: () => Account,
      issuer: () => Issuer,
      metadata: () => metadata,
      NFTokenID: () => NFTokenID,
      transactionType: () => transactionType,
      audioFileURI: () => audioFileURI,
      coverFileURI: () => coverFileURI,
      jsonFileURI: () => jsonFileURI,
      fee: () => Fee,
      URI: () => URI,
      hash: () => hash,
      mintedBy: () => mintedBy,
      createdOn: () => createdOn
    })
  }
}