export default function makeClientXRPLRequest({ xrpl }) {
  return Object.freeze({ clientXRPLRequest })
  function clientXRPLRequest({ requestOptions }){
    return new Promise(async (resolve, reject) => {
      try {
        const url = process.env.RIPPLE_XLS20_URL;
        const client = new xrpl.Client(url);
        await client.connect();
        const results = await client.request(requestOptions);
        client.disconnect();
        resolve(results.result);
      } catch(error) {
        if (error.message === 'The requested object was not found.') {
          resolve({
            nft_id: requestOptions.nft_id,
            offers: []
          })
          return;
        }
        reject(error.message)
      }
    })
  }
}