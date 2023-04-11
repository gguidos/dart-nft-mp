import * as db from '../../../../libs/mongodb';
import eventEmitter from '../../event-handler';

import makeInsertOneDoc from './insert-one';
import makeFindDocuments from './find-documents';
// import makeFindKeyInCache from './find-key-in-cache';
// import makeFindDocumentInCache from './find-document-in-cache';
// import makeAddDocumentToCache from './add-doc-to-cache';
import makeUpdateDocument from './update-document';

const logger = require('../../../../libs/logger');

logger.info('[COMPONENT][DATA-ACCESS] Bootstrapping data-access');

export { 
	insertOneDocument,
	findDocumentsByQuery,
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
		const { findDocuments } = makeFindDocuments({ findDocumentsByQuery: db.findDocumentsByQuery, eventEmitter });
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
