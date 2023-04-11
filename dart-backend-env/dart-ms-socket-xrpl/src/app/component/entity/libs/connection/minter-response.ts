export default function makeNFTokenMinterObj() {
  return Object.freeze({ NFTokenMinterObj })
  function NFTokenMinterObj({ account }) {
    const { NFTokenMinter } = account.result;
    return Object.freeze({
      getNFTokenMinter: () => NFTokenMinter
    })
  }
}