export default function makeUserAuth({ findDocuments, userAuthObj, userBasicResponseObj }) {
  return Object.freeze({ userAuth })
  function userAuth({ params }) {
    return new Promise((resolve, reject) => {
      try {
        const userAuth = userAuthObj({ params });
        const query = { usernameHash: userAuth.usernameHash() }
        findDocuments({ query })
          .then(res => {
            if (res.length < 1 || userAuth.passwordHash() !== res[0].password) {
              reject('user does not exists');
              return;
            }
            const userBasicResponse = userBasicResponseObj({ data: res[0] });
            const response = {
              id: userBasicResponse.id(),
              name: userBasicResponse.name(),
              username: userBasicResponse.username(),
              usernameHash: userBasicResponse.usernameHash(),
              contactPhone: userBasicResponse.contactPhone(),
              email: userBasicResponse.email(),
              createdOn: userBasicResponse.createdOn(),
              pictureUrl: userBasicResponse.pictureUrl(),
              xrpWallet: userBasicResponse.xrpWallet(),
              xrpTag: userBasicResponse.xrpTag(),
              NFTTokenMinter: userBasicResponse.NFTTokenMinter(),
              role: userBasicResponse.role()
            }
            resolve(response);
          })
          .catch(err => {
            reject(err)
          })
      } catch(err) {
        reject(err)
      }
    })
  }
}