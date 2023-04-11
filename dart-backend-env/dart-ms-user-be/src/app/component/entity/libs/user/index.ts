import * as sanitize from 'sanitize-html';
import buildMakeDocument from './user';
import buildMakeRegisterDocument from './register-document';
import * as crypto from 'crypto';
import getRules from './business-rules';
import makeUserAuthObj from './user-auth';
import makeUserBasicResponseObj from './user-basic-response-obj';
import makeUserUpdateObj from './user-to-update';

const logger = require('../../../../libs/logger');

logger.info('[COMPONENT][ENTITY] Bootstrapping entity');

const documentToRegister = ({ info }) => buildMakeRegisterDocument({
			md5,
			sanitize,
		}).makeDocument({ info });
const documentToInsert = ({ cachedDocument }) => buildMakeDocument().makeDocument({ cachedDocument });
const userAuthObj = ({ params }) => makeUserAuthObj({ md5 }).userAuthObj({ params });
const userBasicResponseObj = ({ data }) =>  makeUserBasicResponseObj().userBasicResponseObj({ data });
const userUpdateObj = ({ params }) => makeUserUpdateObj().makeDocument({ params })

const md5 = (text) => crypto.createHash('md5').update(text, 'utf8').digest('hex');

export { 
	documentToRegister, 
	documentToInsert, 
	userAuthObj, 
	userBasicResponseObj,
	userUpdateObj,
	getRules 
};