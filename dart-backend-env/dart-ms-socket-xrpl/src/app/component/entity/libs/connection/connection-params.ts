import { artistAccountConnection } from '../use-cases';

export default function makeconnectionParams() {
  return Object.freeze({ connectionParams })

  function connectionParams({ classicAddress }) {
    const transactionType = 'AccountSet';
    const setFlag = 10
    const minter = process.env.RIPPLE_XLS20_ACCOUNT

    return Object.freeze({
      getAccount: () => classicAddress,
      getTransactionType: () => transactionType,
      getSetFlag: () => setFlag,
      getMinter: () => minter
    })
  }
}