import MongoDBClient from '../../initializers/mongoDb';
import dataDb from './data.db';

const dbName = process.env.MONGODB_DB_NAME;


export {
	insertOneDocument,
	findDocumentsByQuery,
	insertManyDocuments,
	findDocByAggregation,
	deleteDocumentByQuery,
	deleteDocumentsByQuery
};

async function connect({ coll }) {
	try {
		const mongoDBClient = new MongoDBClient({ dbName, coll });
		await mongoDBClient.connect();
		const makeDb = dataDb({ db: mongoDBClient });
		return Promise.resolve(makeDb);
	} catch (err) {
		return Promise.reject(err);
	}
}

async function insertOneDocument(document, coll) {
	try {
		const db = await connect({ coll });
		const results = await db.insertOneDocument(document);
		return Promise.resolve(results);
	} catch (err) {
		return Promise.reject(err);
	}
}

async function findDocumentsByQuery(query, coll) {
	try {
		const db = await connect({ coll });
		const results = await db.findDocumentsByQuery(query);
		return Promise.resolve(results);
	} catch (err) {
		return Promise.reject(err);
	}
}

async function insertManyDocuments(query, coll) {
	try {
		const db = await connect({ coll });
		const results = await db.insertManyDocuments(query);
		return Promise.resolve(results);
	} catch (err) {
		return Promise.reject(err);
	}
}

async function findDocByAggregation(query, coll) {
	try {
		const db = await connect({ coll });
		const results = await db.findDocByAggregation(query);
		return Promise.resolve(results);
	} catch (err) {
		return Promise.reject(err);
	}
}

async function deleteDocumentByQuery(query, coll) {
	try {
		const db = await connect({ coll });
		const results = await db.deleteDocumentByQuery(query);
		return Promise.resolve(results);
	} catch (err) {
		return Promise.reject(err);
	}
}

async function deleteDocumentsByQuery(query, coll) {
	try {
		const db = await connect({ coll });
		const results = await db.deleteDocumentsByQuery(query);
		return Promise.resolve(results);
	} catch(err) {
		return Promise.reject(err)
	}
}

