export default function makeFindDocuments({ findDocumentsByQuery }) {
	return Object.freeze({ findDocuments });

	async function findDocuments(query, coll) {
		return new Promise<any[]> (async (resolve,reject) => {
			try {
				const documents = await findDocumentsByQuery(query, coll);
				return resolve(documents);
			} catch(err) {
				return reject(err)
			}
		})
	}
}
