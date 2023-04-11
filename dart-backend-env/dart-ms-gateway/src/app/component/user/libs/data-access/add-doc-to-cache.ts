
export default function makeAddToCache({ cacheManager }) {
    return Object.freeze({ addDocumentToCache });
    
    function addDocumentToCache({ document, cacheKey, ttl }) {
      return new Promise((resolve, reject) => {
        try { 
          cacheManager
          .setCache(cacheKey, document, ttl)
          .then(res => resolve(res))
          .catch(err => reject(err));
        } catch(err) {
          reject(err);
        }
      });
    }
  }