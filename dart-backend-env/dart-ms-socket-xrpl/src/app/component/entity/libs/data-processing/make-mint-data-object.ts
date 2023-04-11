export default function makeMintDataObject() {
  return Object.freeze({ mintDataObject });

  function mintDataObject({ requestData }) {
    const {
      xrpWallet,
      ipfsAddress,
      uploadID,
      audioFileURI,
      coverFileURI,
      jsonFileURI
    } = requestData;

    return Object.freeze({
      params: {
        issuer: () => xrpWallet,
        ipfsAddress: () => ipfsAddress
      },
      uploadID: () => uploadID,
      audioFileURI: () => audioFileURI,
      coverFileURI: () => coverFileURI,
      jsonFileURI: () => jsonFileURI
    })
  }
}