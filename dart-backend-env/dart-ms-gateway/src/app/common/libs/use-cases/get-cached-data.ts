export default function makeCachedData({
  findKeyInCache,
  findDocumentInCache
}) {
  return Object.freeze({ cacheData });

  function cacheData({ token }) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!token) {
          reject('unauthorized')
          return;
        }
        let cacheKey = `darttrader:accessToken:${token}`;
        let existingCacheKey = await findKeyInCache({ cacheKey });
        if (existingCacheKey.length < 1) {
          reject('unauthorized')
          return;
        }
        const cacheData = await findDocumentInCache({ cacheKey })
        resolve(cacheData[0])
      } catch (err) {
        reject(err)
      }
    })
  }
} 