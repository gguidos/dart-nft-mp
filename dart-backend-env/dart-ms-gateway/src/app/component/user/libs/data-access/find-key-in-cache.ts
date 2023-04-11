export default function makeFindKeyInCache({ cacheManager }) {
  return Object.freeze({ findKeyInCache });
  
function findKeyInCache({ cacheKey }) {
    return new Promise((resolve, reject) => {
      try {
        cacheKey = process.env.REDIS_REG_CACHE_KEY + cacheKey;
        cacheManager
        .getKeys(cacheKey)
        .then(res => resolve(res))
        .catch(err => reject(err))
      } catch (err) {
        reject(err)
      }
    })
  }
} 