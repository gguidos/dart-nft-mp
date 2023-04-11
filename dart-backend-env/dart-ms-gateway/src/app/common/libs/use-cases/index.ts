import makeCachedData from './get-cached-data';
import { findKeyInCache, findDocumentInCache } from '../data-access';

const cachedData = ({ token }) => {
  return new Promise((resolve,reject) => {
    try {
      makeCachedData({
        findKeyInCache,
        findDocumentInCache
      })
      .cacheData({ token })
      .then(res => resolve(res))
      .catch(err => reject(err))
    } catch (error) {
      reject(error)
    }
  })
}

export { cachedData }