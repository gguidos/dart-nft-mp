export default function makeCacheData({ tokens, cacheDataObj, addToCache }) {
  return Object.freeze({ cacheData })
  function cacheData({ data }) {
      try {
        const cacheTokens = tokens({ data });
        const dataToCacheObj = {
          data,
          accessToken: cacheTokens.accessToken(),
          refreshToken: cacheTokens.refreshToken()
        }

        const cDataObj = cacheDataObj({ dataToCache: dataToCacheObj });
        const dataToCache = {
          data: cDataObj.data(),
          accessTokenCacheKey: cDataObj.accessTokenCacheKey(),
          refreshTokenCacheKey: cDataObj.refreshTokenCacheKey()
        }

        addToCache({ 
          document: dataToCache.data, 
          cacheKey:  dataToCache.accessTokenCacheKey,
          ttl: 3600000
        })

        addToCache({ 
          document: dataToCache.data,
          cacheKey:  dataToCache.refreshTokenCacheKey,
          ttl: 180000
        })

        return dataToCacheObj;
      } catch(err) {
        throw new err
      }
  }
}