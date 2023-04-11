export default function makeCreateXRPLTransaction({ xrpl }) {
  return Object.freeze({ createXRPLTransaction })
  
  function createXRPLTransaction({ transactionBlob, wallet }) {
    return new Promise(async (resolve, reject) => {
      try {
        const url = process.env.RIPPLE_XLS20_URL;
        const client = new xrpl.Client(url)
        await client.connect();
        const tsPrepared = await client.autofill(transactionBlob)
        const tx = await client.submitAndWait(tsPrepared, { wallet } )
        client.disconnect();
        resolve(tx);
      } catch(err) {
        throw new Error(err.message)
      }
    })
  }
}