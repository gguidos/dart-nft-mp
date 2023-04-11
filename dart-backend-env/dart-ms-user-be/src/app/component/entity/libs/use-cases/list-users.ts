export default function makeFindDocuments({ findDocumentsByQuery }) {
	return Object.freeze({ findDocuments });

	function findDocuments(query) {
		return new Promise(async (resolve, reject) => {
			try {
				findDocumentsByQuery(query)
				.then(res => resolve(res))
				.catch(err => reject(err))
			} catch(err) {
				reject(err)
			}
		})
	};
}

