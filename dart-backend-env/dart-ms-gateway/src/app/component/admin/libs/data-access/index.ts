import * as db from '../../../../libs/mongodb';
import { codeJWT } from '../../../../helpers/jwt-token';

import makeInsertOneDoc from './insert-one';
import makeFindDocuments from './find-documents';
import makeCoder from './coder';

const logger = require('../../../../libs/logger');
const coll = process.env.MONGODB_DB_CONSUMERS_COLLECTION;

const coder = ({ options }) => {
  const secret = process.env.NODE_ACCESS_TOKEN_SECRET;
  return makeCoder({ codeJWT }).coder({ options, secret });
};

const insertOneDocument = async (newConsumer) => {
	try {
		logger.info('[COMPONENT][DATA-ACCESS] inserting document');
		const { insertOne } = makeInsertOneDoc({ insertOneDocument: db.insertOneDocument });
		const inserted = await insertOne(newConsumer, coll);
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
		const results = await findDocuments(query, coll);
		logger.info(`[COMPONENT][DATA-ACCESS] found ${results.length} document by query in DB`);
		return Promise.resolve(results);
	} catch(err) {
		return Promise.reject(err)
	}
};

export { coder, insertOneDocument, findDocumentsByQuery }