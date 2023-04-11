export default function makeFindKeyInCache({ cacheManager }) {
  return Object.freeze({ findKeyInCache });
  
  async function findKeyInCache({ cacheKey }) {
    try {
      cacheKey = process.env.REDIS_REG_CACHE_KEY + cacheKey;
      const data = await cacheManager.getKeys(cacheKey);
      return Promise.resolve(data);
    } catch (err) {
      return Promise.reject(err)
    }
  }
} 