export default function makeMintDataObject({ xrpl }) {
  return Object.freeze({ mintDataObject });

  function mintDataObject({ params, config }) {
    const {
      account,
      ipfsAddress,
      Issuer
    } = params;

    const {
      Flags,
      NFTokenTaxon,
      TransactionType
    } = config;

    const URI = xrpl.convertStringToHex(ipfsAddress);

    return Object.freeze({
      Account: () => account,
      Flags: () => Flags,
      Issuer: () => Issuer,
      NFTokenTaxon: () => NFTokenTaxon,
      TransactionType: () => TransactionType,
      URI: () => URI
    })
  }
}