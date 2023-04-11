export default function makeDataDB({ db }) {
	return Object.freeze({
		insertOneDocument,
		getDocuments,
		deleteDocumentByQuery,
		deleteDocumentsByQuery
	});

	async function insertOneDocument(infoToInsert) {
		try {
			const data = await db.insertDocumentWithIndex(infoToInsert);
			return Promise.resolve(data);
		} catch (err) {
			return Promise.reject(err);
		}
	}

	async function getDocuments(query) {
		try {
			const data = await db.findDocumentsByQuery(query);
			return Promise.resolve(data);
		} catch (err) {
			return Promise.reject(err);
		}
	}

	async function deleteDocumentByQuery(query) {
		try {
			const data = await db.deleteOneDocument(query)
			return Promise.resolve(data)
		} catch (err) {
			return Promise.reject(err)
		}
	}

	async function deleteDocumentsByQuery(query) {
		try {
			const data = await db.deleteManyDocuments(query)
			return Promise.resolve(data)
		} catch (err) {
			return Promise.reject(err)
		}
	}
}
