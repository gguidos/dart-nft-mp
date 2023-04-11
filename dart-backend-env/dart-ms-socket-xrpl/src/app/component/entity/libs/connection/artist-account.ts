export default function makeArtistAccountObj() {
  return Object.freeze({ artistAccountObj })
  function artistAccountObj({ artistAccount }) {
    const {
      publicKey,
      privateKey,
      classicAddress,
      seed
    } = artistAccount;
    return Object.freeze({
      getPublicKey: () => publicKey,
      getPrivateKey: () => privateKey,
      getClassicAddress: () => classicAddress,
      getSeed: () => seed

    })
  }
}