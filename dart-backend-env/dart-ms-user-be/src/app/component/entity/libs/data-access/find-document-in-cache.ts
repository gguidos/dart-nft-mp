export default function makeFindDocumentInCache({ cacheManager }) {
  return Object.freeze({ findDocumentInCache })
  async function findDocumentInCache({ token }) {
    try {
      const cacheKey = process.env.REDIS_REG_CACHE_KEY + token;
      const document = await cacheManager.getCache(cacheKey)

      return Promise.resolve(document.data)
    } catch(err) {
      return Promise.reject(err)
    }
  }
}