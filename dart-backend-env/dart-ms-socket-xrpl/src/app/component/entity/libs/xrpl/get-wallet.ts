export default function makeGetWallet({ xrpl }) {
  return Object.freeze({ getWallet });

  function getWallet({ seed }) {
    try {
      const account = xrpl.Wallet.fromSeed(seed)
      return Promise.resolve(Object.freeze({
        account: () => account
      }))
    } catch (error) {
      return Promise.reject({ message: 'Invalid account' })
    }
  }
}