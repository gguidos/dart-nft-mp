export default function makeUpdate({
  userBasicResponseObj,
  findDocuments,
  userUpdateObj,
  updateDocument }) {
  return Object.freeze({ update })
  
  function update({ params }) {
    return new Promise(async (resolve, reject) => {
      try {
        
        const existingDoc = await findDocuments({ query: { usernameHash: params.usernameHash }});
        if (existingDoc.length < 1) {
          reject({message: 'unexisting user'})
          return;
        };

        const makeUpdateObj = userUpdateObj({params});

        const query = {
          usernameHash: makeUpdateObj.usernameHash()
        };

        let values = {
          name: makeUpdateObj.getName(),
          pictureUrl: makeUpdateObj.getPictureUrl(),
          role: makeUpdateObj.getRole(),
          contactPhone: makeUpdateObj.getContactPhone(),
          xrpWallet: makeUpdateObj.getXRPWallet(),
          xrpTag: makeUpdateObj.getXRPTag(),
          NFTTokenMinter: makeUpdateObj.getNFTTokenMinter()
        };

        Object.keys(values).forEach(key => values[key] === undefined && delete values[key]);

        await updateDocument(query, values);

        const foundUpdatedDocument = await findDocuments({ query: { usernameHash: params.usernameHash }});
        const userBasicResponse = userBasicResponseObj({ data: foundUpdatedDocument[0] })
        const response = {
          id: userBasicResponse.id(),
          name: userBasicResponse.name(),
          username: userBasicResponse.username(),
          usernameHash: userBasicResponse.usernameHash(),
          email: userBasicResponse.email(),
          contactPhone: userBasicResponse.contactPhone(),
          createdOn: userBasicResponse.createdOn(),
          pictureUrl: userBasicResponse.pictureUrl(),
          xrpWallet: userBasicResponse.xrpWallet(),
          xrpTag: userBasicResponse.xrpTag(),
          NFTTokenMinter: userBasicResponse.NFTTokenMinter(),
          role: userBasicResponse.role()
        }

        resolve(response);

      } catch(err) {
        reject(err)
      }
    })
  }
}