import * as db from '../../../../libs/mongodb';
import * as cacheManager from '../../../../libs/redis-cache';

import makeInsertOneDoc from './insert-one';
import makeFindDocuments from './find-documents';
import makeFindKeyInCache from './find-key-in-cache';
import makeFindDocumentInCache from './find-document-in-cache';
import makeAddDocumentToCache from './add-doc-to-cache';
import makeUpdateDocument from './update-document';

const logger = require('../../../../libs/logger');

logger.info('[COMPONENT][DATA-ACCESS] Bootstrapping data-access');

export { 
	insertOneDocument, 
	findDocumentsByQuery,
	findKeyInCache,
	findDocumentInCache,
	addDocumentToCache,
	updateDocument
};

const insertOneDocument = async (newUser) => {
	try {
		logger.info('[COMPONENT][DATA-ACCESS] inserting document');
		const { insertOne } = makeInsertOneDoc({ insertOneDocument: db.insertOneDocument });
		const inserted = await insertOne(newUser);
		logger.info('[COMPONENT][DATA-ACCESS] document inserted successfully.');

		return Promise.resolve(inserted);
	} catch (err) {
		return Promise.reject(err);
	}
};

const findDocumentsByQuery = async (query) => {
	try {
		logger.info('[COMPONENT][DATA-ACCESS] finding document by query in DB');
		const { findDocuments } = makeFindDocuments({ findDocumentsByQuery: db.findDocumentsByQuery });
		const results = await findDocuments(query);
		logger.info(`[COMPONENT][DATA-ACCESS] found ${results.length} document by query in DB`);
		return Promise.resolve(results);
	} catch(err) {
		return Promise.reject(err)
	}
};

const updateDocument = async (query, values) => {
	try {
		logger.info('[COMPONENT][DATA-ACCESS] finding document by query in DB');
		const results = await makeUpdateDocument({ updateDocument: db.updateDocument })
		.updateOne(query, values);
		logger.info(`[COMPONENT][DATA-ACCESS] found ${results.length} document by query in DB`);
		return Promise.resolve(results);
	} catch(err) {
		return Promise.reject(err)
	}
};

const findKeyInCache = async ({ cacheKey }) => {
	try {
		logger.info('[COMPONENT][DATA-ACCESS] finding key in cache');
		const { findKeyInCache } = makeFindKeyInCache({ cacheManager });
		const results = await findKeyInCache({ cacheKey });
		logger.info(`[COMPONENT][DATA-ACCESS] found  ${results.length} key in cache`);

		return Promise.resolve(results);
	} catch (err) {
		throw new Error(err);
	}
}

const findDocumentInCache = async ({ token }) => {
	try {
		logger.info('[COMPONENT][DATA-ACCESS] finding document by key in cache');
		const { findDocumentInCache } = makeFindDocumentInCache({ cacheManager });
		const results = await findDocumentInCache({ token });
		logger.info(`[COMPONENT][DATA-ACCESS] found document ${results.length} by key in cache`);

		return Promise.resolve(results);
	} catch (err) {
		throw new Error(err);
	}
}

const addDocumentToCache = async ({ newUser }) => {
	try {
		logger.info('[COMPONENT][DATA-ACCESS] adding document in cache');
		const { addDocumentToCache } = makeAddDocumentToCache({ cacheManager });
		const inserted = await addDocumentToCache({ newUser })
		return Promise.resolve(inserted)
	} catch (err) {
		return Promise.resolve(err)
	}
}


