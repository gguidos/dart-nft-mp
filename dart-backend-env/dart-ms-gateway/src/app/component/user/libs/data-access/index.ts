import { codeJWT, decodeJWT } from '../../../../helpers/jwt-token';
import * as cacheManager from '../../../../libs/redis-cache';
import makeCoder from './coder';
import makeAddDocumentToCache from './add-doc-to-cache';
import makeFindKeyInCache from './find-key-in-cache';

const logger = require('../../../../libs/logger');
const coll = process.env.MONGODB_DB_CONSUMERS_COLLECTION;
const secret = process.env.NODE_ACCESS_TOKEN_SECRET;

const coder = ({ data }) => makeCoder({ codeJWT }).coder({ data, secret });

const addToCache = ({ document, cacheKey, ttl }) => {
  return new Promise((resolve,reject) => {
    try {
      makeAddDocumentToCache({ cacheManager })
      .addDocumentToCache({ document, cacheKey, ttl })
      .then(res => resolve(res))
      .catch(err => reject(err))
    } catch(err) {
      resolve(err)
    }
  })
}

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

export { coder, addToCache, findKeyInCache }