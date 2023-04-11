const logger = require('../../libs/logger');

export default function makeDataDB({ db }) {
	return Object.freeze({
		insertOneDocument,
		insertManyDocuments,
		findDocumentsByQuery,
		findDocByAggregation,
		findDocFieldsByFilter,
		deleteDocumentByQuery,
		deleteDocumentsByQuery
	});

	async function insertOneDocument(document) {
		try {
			const data = await db.insertDocumentWithIndex(document);
			return Promise.resolve(data);
		} catch (err) {
			return Promise.reject(err);
		} finally {
			db.close();
		}
	}

	async function insertManyDocuments(infoToInsert) {
		try {
			const data = await db.insertManyDocuments(infoToInsert);
			return Promise.resolve(data);
		} catch (err) {
			Promise.reject(err);
		} finally {
			db.close();
		}
	}

	async function findDocumentsByQuery(query) {
		try {
			const data = await db.findDocumentsByQuery(query);
			return Promise.resolve(data);
		} catch (err) {
			return Promise.reject(err);
		} finally {
			db.close();
		}
	}

	async function findDocByAggregation(query) {
		try {
			const item = await db.findDocByAggregation(query);
			return Promise.resolve(item);
		} catch (err) {
			Promise.reject(err);
		} finally {
			db.close();
		}
	}

	async function findDocFieldsByFilter(query, projection, lmt?, skip?, sort?) {
		try {
			const item = await db.findDocFieldsByFilter(
				query,
				projection,
				lmt,
				skip,
				sort
			);
			return Promise.resolve(item);
		} catch (err) {
			return Promise.reject(err);
		} finally {
			db.close();
		}
	}

	async function deleteDocumentByQuery(query) {
		try {
			const item = await db.deleteOneDocument(query);
			return Promise.resolve(item);
		} catch (err) {
			return Promise.reject(err);
		} finally {
			db.close();
		}
	}

	async function deleteDocumentsByQuery(query) {
		try {
			const results = await db.deleteManyDocuments(query);

			return Promise.resolve(results)
		} catch(err) {
			return Promise.reject(err)
		} finally {
			db.close();
		}
	}
}
