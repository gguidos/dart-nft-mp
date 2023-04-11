import makeTokens from './make-tokens';
import makeCacheData from './cache-data';
import { cacheDataObj, token } from '../document';
import { addToCache } from '../data-access';

const tokens = ({ data }) => makeTokens({ token }).tokens({ data })
const cacheData = ({ data }) => makeCacheData({
  tokens,
  cacheDataObj,
  addToCache
}).cacheData({ data });

export { tokens, cacheData }