export default function makeCodeToken({ 
  tokenOpts,
  coder,
  consumers,
  insertOneDocument,
  findDocuments }) {
  return Object.freeze({ registerConsumer })
  function codeToken({ hostname, ip }) {
    const options = tokenOpts( { options: { hostname, ip }});
    return {
      ip: options.ip(),
      hostname: options.hostname(),
      hostnameHash: options.hostnameHash(),
      apiKey: coder({ options })
    }
  }

  function registerConsumer({
    hostname, 
    ip, 
    createdBy, 
    createdByHost }) {
      return new Promise(async (resolve, reject) => { 
        try {
          const documents = await findDocuments({ hostname })
          if (documents.length > 0) return reject('Duplicated consumer')
          
          const options = {
            ...codeToken({ hostname, ip}),
            createdBy,
            createdByHost
          };

          const consumerObj = consumers({options});
     
          const consumer = buildConsumer({ options })
        
          insertOneDocument(consumer)
            .then(res => resolve(res))
            .catch(err => reject(err))
          
        } catch (err) {
         reject(err)
        }
      })

  }

  function buildConsumer({ options }) {
    const consumerObj = consumers({ options });
    return {
      hostname: consumerObj.hostname(),
      ip: consumerObj.ip(),
      apiKey: consumerObj.apiKey(),
      hostnameHash: consumerObj.hostnameHash(),
      createdBy: consumerObj.createdBy(),
      modifiedBy: consumerObj.modifiedBy(),
      createdOn: consumerObj.createdOn(),
      modifiedOn: consumerObj.modifiedOn(),
      createdByHost: consumerObj.createdByHost(),
      modifiedByHost: consumerObj.modifiedByHost()
    };
  }
}