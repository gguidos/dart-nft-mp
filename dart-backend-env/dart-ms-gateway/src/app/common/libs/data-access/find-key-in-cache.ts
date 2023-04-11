export default function makeFindKeyInCache({ cacheManager }) {
  return Object.freeze({ findKeyInCache });

function findKeyInCache({ cacheKey }) {
    return new Promise((resolve, reject) => {
      try {
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