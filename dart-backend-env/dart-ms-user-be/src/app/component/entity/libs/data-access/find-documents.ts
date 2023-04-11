export default function makeFindDocuments({ findDocumentsByQuery }) {
	return Object.freeze({ findDocuments });

	async function findDocuments(query) {
		return new Promise<any[]> (async (resolve,reject) => {
			try {
				const documents = await findDocumentsByQuery(query);
				return resolve(documents);
			} catch(err) {
				return reject(err)
			}
		})
	}
}
