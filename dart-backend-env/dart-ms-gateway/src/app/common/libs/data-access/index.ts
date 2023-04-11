import * as cacheManager from '../../../libs/redis-cache';
import makeFindKeyInCache from './find-key-in-cache';
import makeFindDocumentInCache from './find-document-in-cache';


const logger = require('../../../libs/logger');
const coll = process.env.MONGODB_DB_CONSUMERS_COLLECTION;
const secret = process.env.NODE_ACCESS_TOKEN_SECRET;

const findKeyInCache = ({ cacheKey }) => {
  return new Promise((resolve,reject) => {
    try {
      makeFindKeyInCache({ cacheManager })
      .findKeyInCache({ cacheKey })
      .then(res => resolve(res))
      .catch(err => reject(err))
    } catch(err) {
      resolve(err)
    }
  })
}

const findDocumentInCache = async ({ cacheKey }) => {
	try {
		logger.info('[COMPONENT][DATA-ACCESS] finding document by key in cache');
		const { findDocumentInCache } = makeFindDocumentInCache({ cacheManager });
		const results = await findDocumentInCache({ cacheKey });
		logger.info(`[COMPONENT][DATA-ACCESS] found document ${results.length} by key in cache`);

		return Promise.resolve(results);
	} catch (err) {
		throw new Error(err);
	}
}

export { findKeyInCache, findDocumentInCache }