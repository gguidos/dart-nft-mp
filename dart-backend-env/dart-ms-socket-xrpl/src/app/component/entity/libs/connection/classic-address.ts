export default function makeClassicAddressObj() {
  return Object.freeze({ classicAddressObj })
  function classicAddressObj({ classicAddress }) {
    return Object.freeze({
      getClassicAddress: () => classicAddress
    })
  }
}