import makeRegisterDocument from './user-register';
import makeMail from '../mail';
import makeFindDocuments from './list-users';
import makeVerifyDocument from './user-verification';
import makeUserAuth from './user-auth';
import makeUserUpdateObj from './user-update';

import {
	insertOneDocument,
	findDocumentsByQuery,
	findKeyInCache,
	findDocumentInCache,
	addDocumentToCache,
	updateDocument
} from '../data-access';

import { 
	documentToRegister,
	documentToInsert,
	userBasicResponseObj,
	userUpdateObj,
	userAuthObj 
} from '../user';

const logger = require('../../../../libs/logger');

logger.info('[COMPONENT][USE-CASE] Bootstrapping use-cases');

const findDocuments = ({ query }) => {
	return new Promise((resolve, reject) => {
		try {	
			makeFindDocuments({ findDocumentsByQuery })
			.findDocuments(query)
			.then(res => resolve(res))
			.catch(err => reject(err)) 
		} catch (err) {
			reject(err)
		}
	})
}

const userUpdate = ({ params }) => {
	return new Promise((resolve, reject) => {
		try {
			makeUserUpdateObj({
				userBasicResponseObj,
				findDocuments,
				userUpdateObj,
				updateDocument
			})
			.update({ params })
			.then(res => resolve(res))
			.catch(err => reject(err))
		} catch(err) {
			reject(err)
		}
	})
}

const userAuth = ({ params }) => {
	return new Promise((resolve, reject) => {
		try {
			makeUserAuth({ findDocuments, userAuthObj, userBasicResponseObj })
			.userAuth({ params })
			.then(res => resolve(res))
			.catch(err => reject(err))
		} catch(err) {
			reject(err)
		}
	})
}

const register = ({ info }) => {
	return new Promise(async (resolve, reject) => {
		try {
			logger.info('[COMPONENT][USE-CASE] register document reached');
			makeRegisterDocument({
				documentToRegister,
				findDocuments,
				findKeyInCache,
				addDocumentToCache,
				makeMail
			})
			.registerDocument({ info })
			.then(res => resolve(res))
			.catch(err => reject(err))
		} catch(err) {
			reject(err);
		}
	});
}

async function verify({ info }) {
	return new Promise(async (resolve, reject) => {
		try {
			logger.info('[COMPONENT][USE-CASE] verify document reached');
			
			makeVerifyDocument({ 
				documentToInsert,
				findDocuments,
				findKeyInCache,
				findDocumentInCache,
				insertOneDocument
			})
			.verifyDocument({ token: info.token })
				.then(res => resolve(res))
				.catch(err => reject(err))
		} catch(err) {
			reject(err);
		}
	})
}

const documentService = Object.freeze({
	register,
	verify,
	userAuth,
	userUpdate
});

export default documentService;
