export default function makeUserBasicResponseObj() {
  return Object.freeze({ userBasicResponseObj })
  
  function userBasicResponseObj({ data }) {
    const {
      idx,
      name,
      username,
      usernameHash,
      email,
      contactPhone,
      createdOn,
      pictureUrl,
      xrpWallet,
      xrpTag,
      NFTTokenMinter,
      role
    } = data;

    return Object.freeze({
      id: () => idx,
      name: () => name,
      username: () => username,
      usernameHash: () => usernameHash,
      email: () => email,
      contactPhone: () => contactPhone,
      createdOn: () => createdOn,
      pictureUrl: () => pictureUrl,
      xrpWallet: () => xrpWallet,
      xrpTag: () => xrpTag,
      NFTTokenMinter: () => NFTTokenMinter,
      role: () => role
    })
  }
}