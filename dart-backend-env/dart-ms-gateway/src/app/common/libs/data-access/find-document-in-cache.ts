export default function makeFindDocumentInCache({ cacheManager }) {
  return Object.freeze({ findDocumentInCache })
  async function findDocumentInCache({ cacheKey }) {
    try {
      const document = await cacheManager.getCache(cacheKey)
      return Promise.resolve(document.data)
    } catch(err) {
      return Promise.reject(err)
    }
  }
}