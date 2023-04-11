export default function makeAddToCache({ cacheManager }) {
  return Object.freeze({ addDocumentToCache });
  
  function addDocumentToCache({ newUser }) {
    const hashCacheKey = process.env.REDIS_REG_CACHE_KEY + newUser.longHash;
    const ttl = process.env.REDIS_REG_CACHE_TTL;
    return new Promise((resolve, reject) => {
      try { 
        cacheManager
        .setCache(hashCacheKey, newUser, ttl)
        .then(res => resolve(res.longHash))
        .catch(err => reject(err));
      } catch(err) {
        reject(err);
      }
    });
  }
}