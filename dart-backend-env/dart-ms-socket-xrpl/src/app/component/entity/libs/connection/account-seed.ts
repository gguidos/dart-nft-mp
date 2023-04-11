export default function makeSeedObj() {
  return Object.freeze({ seedObj })
  function seedObj({ seed }) {
    return Object.freeze({
      getSeed: () => seed
    })
  }
}