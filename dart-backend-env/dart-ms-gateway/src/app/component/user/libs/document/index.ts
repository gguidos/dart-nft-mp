import rules from './business-rules';
import makeTokenize from './token-obj';
import makeCacheDataObj from './cache-data-obj'
import { codeJWT } from '../../../../helpers/jwt-token';
const logger = require('../../../../libs/logger');

logger.info('[COMPONENT][ENTITY] Bootstrapping entity');

const token = ({ data }) => makeTokenize({ codeJWT }).tokenize({ data });
const cacheDataObj = ({ dataToCache }) => makeCacheDataObj().cacheDataObj({ dataToCache })
const makeRules = (endpoint) => rules[endpoint];

export { cacheDataObj, makeRules, token };