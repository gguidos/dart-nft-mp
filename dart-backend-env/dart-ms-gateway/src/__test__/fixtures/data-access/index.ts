import * as dotenv from 'dotenv';
import * as config from 'nconf';

dotenv.config(); //important to load as soon as possible

config.use('memory');
config.env();

import MongoDBClient from '../../../app/initializers/mongoDb';
import dataDb from './data.db';

const dbName = process.env.MONGODB_DB_TEST_DB_NAME;
const mongoDBClient = new MongoDBClient({ dbName });

export { 
	insertOneDocument, 
	findDocumentsByQuery, 
	deleteDocumentByQuery, 
	deleteDocumentsByQuery, 
	dropDB 
};

async function connect() {
	try {
		await mongoDBClient.connect();
		const makeDb = dataDb({ db: mongoDBClient });
		return Promise.resolve(makeDb);
	} catch (err) {
		throw err;
	}
}

async function insertOneDocument(document) {
	const db = await connect();
	const results = await db.insertOneDocument(document);
	return Promise.resolve(results);
}

async function findDocumentsByQuery(query) {
	const db = await connect();
	const results = await db.getDocuments(query);

	return Promise.resolve(results);
}

async function deleteDocumentByQuery(query) {
	const db = await connect();

	const results = await db.deleteDocumentByQuery(query)

	return Promise.resolve(results)
}

async function deleteDocumentsByQuery(query) {
	const db = await connect();

	const results = await db.deleteDocumentsByQuery(query)

	return Promise.resolve(results)
}

async function dropDB() {
	await mongoDBClient.dropDB();
}


