export default function makeCacheDataObj() {
  return Object.freeze({ cacheDataObj })
  
  function cacheDataObj({ dataToCache }) {
    const {
      accessToken,
      refreshToken,
      data
    } = dataToCache;

    const accessTokenCacheKey = `darttrader:accessToken:${accessToken}`;
    const refreshTokenCacheKey = `darttrader:refreshToken:${refreshToken}`;

    return Object.freeze({
      accessTokenCacheKey: () => accessTokenCacheKey,
      refreshTokenCacheKey: () => refreshTokenCacheKey,
      data: () => data
    })
  }
}