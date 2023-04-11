export default function makeFindDocuments({
	findDocumentsByQuery, 
	eventEmitter
}) {
	return Object.freeze({ findDocuments });

	async function findDocuments(query) {
		return new Promise<any[]> (async (resolve,reject) => {
			try {
				console.log(query)
				const documents = await findDocumentsByQuery(query);
				eventEmitter.emit('nfts', documents)
				resolve(documents);
			} catch(err) {
				reject(err)
			}
		})
	}
}
