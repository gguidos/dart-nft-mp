export default function makeTokens({ token }) {
  return Object.freeze({ tokens })
  function tokens({ data }) {
    const {
      username,
      xrpWallet
    } = data;
    
    const tokenData = { username }

    const accessTokenObj = token({
      data: {
        ...tokenData,
        expiresIn: '1h'
      }
    });
    
    const refreshTokenObj = token({ 
      data: {
        ...tokenData,
        expiresIn: 1800000
      }
    })

    return Object.freeze({
      accessToken: () => accessTokenObj.token,
      refreshToken: () => refreshTokenObj.token
    })
  }
}

