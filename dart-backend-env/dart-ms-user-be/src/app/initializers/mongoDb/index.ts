const { MongoClient } = require('mongodb');

const logger = require('../../libs/logger');

class mongoDBClient {
	dbName;
	uri;
	coll;
	db;
	test;
	counterColl;
	connection;

	constructor({ dbName }) {
		logger.info('[MONGODBCLIENT] client initialized');
		this.dbName = dbName;
		this.uri = `${process.env.MONGODB_DB_URL}/${this.dbName}`;
		this.coll = process.env.MONGODB_DB_COLLECTION;
		this.counterColl = process.env.MONGODB_DB_COUNTER_COLLECTION;
	}

	async connect() {
		try {
			this.connection = await MongoClient.connect(this.uri);
			this.db = this.connection.db();
			logger.info('[MONGODB] Connection successfull.');
			return Promise.resolve();
		} catch (ex) {
			logger.error(`[MONGODB] Caught exception: ${ex}`);
			return Promise.reject(ex);
		}
	}

	async dropDB() {
		if (!this.test) return;
		logger.info(`[MONGODB] Dropping DB ${this.dbName}...`);
		await this.db.dropDatabase();
		logger.info(`[MONGODB] Dropped DB ${this.dbName}`);
		return Promise.resolve(1);
	}

	async close() {
		logger.info(`[MONGODB] Closing connection...`);
		await this.connection.close();
		logger.info(`[MONGODB] Connection closed...`);
		return;
	}

	async findDocumentsByQuery(query) {
		try {
			if (!query) {
				logger.error(
					'[MONGODB] findDocFieldsByFilter: Error query is not an object'
				);
				return Promise.reject();
			}
			return Promise.resolve(
				await this.db.collection(this.coll).find(query).toArray()
			);
		} catch (e) {
			logger.error(e.toString());
			throw Error(e);
		}
	}

	async findDocFieldsByFilter(query, projection, lmt?, skip?, sort?) {
		try {
			logger.info(
				`[MONGODB] Finding documents by filter ${JSON.stringify(
					query
				)} projection ${JSON.stringify(projection)} limit ${lmt}`
			);
			if (!query) {
				logger.error(
					'[MONGODB] findDocFieldsByFilter: Error query is not an object'
				);
				return Promise.reject();
			}
			logger.info(
				`[MONGODB] ${JSON.stringify(query)} w/ projection ${JSON.stringify(
					projection
				)} found successfully limit ${lmt}`
			);
			return Promise.resolve(
				await this.db
					.collection(this.coll)
					.find(query, {
						projection: projection || {},
						limit: lmt || 0,
						skip: skip || 0,
						sort: sort,
					})
					.toArray()
			);
		} catch (e) {
			logger.error(e.toString());
			throw Error(e);
		}
	}

	async insertDocumentWithIndex(doc) {
		try {
			if (!isObject(doc)) {
				throw Error(
					'[MONGODB] insertDocumentWithIndex: document is not an object'
				);
			}
			doc.idx = await this.getNextSequence();
			logger.info(`[MONGODB] ${doc.createdBy} is trying to insert a document`);
			const results = await this.db.collection(this.coll).insertOne(doc);
			logger.info(
				`[MONGODB] document ${results.insertedId.toString()} inserted successfully by ${
					doc.createdBy
				}`
			);
			return Promise.resolve(results);
		} catch (e) {
			logger.error('[MONGODB] insertDocumentWithIndex: Error caught,', e);
			return Promise.reject(e);
		}
	}

	async insertManyDocuments(query) {
		try {
			logger.info(`[MONGODB] Bulk insert of documents.`);
			const data = [];
			let bulk = this.db.collection(this.coll).initializeOrderedBulkOp();
			for (let i in query) {
				query[i]['idx'] = await this.getNextSequence();
				bulk.insert(query[i]);
				data.push(query[i]);
			}
			const rest = await bulk.execute();
			logger.info(`[MONGODB] Bulk insert of documents succeeded.`);
			return Promise.resolve(rest.result.insertedIds);
		} catch (ex) {
			logger.error(`[MONGODB] Caught exception: ${ex}`);
		}
	}

	async getNextSequence() {
		try {
			logger.info(`[MONGODB] Creating next idx.`);
			const collections = await this.db.listCollections().toArray();

			const counterCollExists = collections.filter(
				(coll) => coll.name === this.counterColl
			).length;

			if (!counterCollExists) {
				await this.db.createCollection(this.counterColl);
				await this.db.collection(this.counterColl).createIndex({ _id: 1 });
				await this.db
					.collection(this.counterColl)
					.insertOne({ _id: this.coll, seq: 0 });
			}

			const ret = await this.db
				.collection(this.counterColl)
				.findOneAndUpdate(
					{ _id: this.coll },
					{ $inc: { seq: 1 } },
					{ returnDocument: 'after' }
				);
			logger.info(`[MONGODB] next id created successfully.`);
			return Promise.resolve(ret.value.seq);
		} catch (e) {
			logger.error('[MONGODB] getNextSequence: Error caught,', e);
			return Promise.reject(e);
		}
	}

	async getDocumentCountByQuery(query?) {
		try {
			logger.info(
				`[MONGODB] Counting documents by query ${JSON.stringify(query)}.`
			);
			const results = await this.db
				.collection(this.coll)
				.estimatedDocumentCount(query || {});
			logger.info(`[MONGODB] ${JSON.stringify(query)} counted successfully.`);
			return Promise.resolve(results);
		} catch (e) {
			logger.error('[MONGODB] getDocumentCountByQuery: Error caught,', e);
			return Promise.reject(e);
		}
	}

	async findDocByAggregation(query) {
		try {
			logger.info(
				`[MONGODB] Finding documents by aggregation ${JSON.stringify(query)}.`
			);
			if (!query.length) {
				throw Error('[MONGODB] findDocByAggregation: query is not an object.');
			}
			logger.info(`[MONGODB] ${JSON.stringify(query)} found successfully.`);
			return this.db.collection(this.coll).aggregate(query).toArray();
		} catch (e) {
			logger.error('[MONGODB] findDocByAggregation: Error caught,', e);
			return Promise.reject(e);
		}
	}

	async findOneAndUpdate(query, values, option) {
		try {
			logger.info(`[MONGODB] Updating ${query}.`);
			if (!(isObject(values) && isObject(query))) {
				throw Error(
					'[MONGODB] UpdateDocument: values and query should be an object.'
				);
			}
			logger.info(`[MONGODB] ${query} updated successfully.`);
			return this.db
				.collection(this.coll)
				.findOneAndUpdate(query, { $set: values }, option || {});
		} catch (e) {
			logger.error('[MONGODB] findOneAndUpdate: Error caught,', e);
			return Promise.reject(e);
		}
	}

	async modifyOneDocument(query, values, option?) {
		try {
			logger.info(`[MONGODB] Modifing ${query}.`);
			if (!(isObject(values) && isObject(query))) {
				throw Error(
					'mongoClient.ModifyOneDocument: values, query and option should be an object.'
				);
			}
			logger.info(`[MONGODB] ${query} modified successfully.`);
			return await this.db
				.collection(this.coll)
				.updateOne(query, values, option || {});
		} catch (e) {
			logger.error('[MONGODB] modifyOneDocument: Error caught,', e);
			return Promise.reject(e);
		}
	}

	async deleteOneDocument(query) {
		try {
			logger.info(
				`[MONGODB] Deleting documents by query ${JSON.stringify(query)}`
			);
			// if (!isObject(query)) {
			// 	throw Error(
			// 		'[MONGODB] ModifyOneDocument: values, query and option should be an object.'
			// 	);
			// }
			logger.info(`[MONGODB] ${JSON.stringify(query)} deleted successfully`);
			return await this.db.collection(this.coll).deleteOne(query);
		} catch (e) {
			logger.error('[MONGODB] deleteOneDocument: Error caught,', e);
			return Promise.reject(e);
		}
	}

	async deleteManyDocuments(query = {}) {
		logger.info(`[MONGODB] Deleting many documents.`);
		return await this.db.collection(this.coll).deleteMany(query);
	}
}

function isObject(obj) {
	return Object.keys(obj).length > 0 && obj.constructor === Object;
}

export default mongoDBClient;
