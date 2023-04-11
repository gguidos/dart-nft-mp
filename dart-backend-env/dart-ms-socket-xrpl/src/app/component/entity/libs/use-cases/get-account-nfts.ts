export default function makeGetAccountNFTS({
  createXRPLRequest
}) {
  return Object.freeze({ getAccountNFTS })
  function getAccountNFTS({ account, config }){
    return new Promise((resolve,reject) => {
      try {
        const ntfsOpts = {
          method: config.methods.accountNFTs,
          account
        };
        createXRPLRequest({ requestOptions: ntfsOpts })
        .then(res => resolve(res))
        .catch(err => reject(err))
      } catch (error) {
        reject(error.data)
      }
    })
  }
}