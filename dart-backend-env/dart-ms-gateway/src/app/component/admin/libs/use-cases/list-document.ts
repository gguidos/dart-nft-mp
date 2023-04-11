export default function makeFindDocuments({ findDocumentsByQuery }) {
	return function findDocuments(query) {
		return new Promise((resolve, reject) => {
			findDocumentsByQuery(query).then(res => resolve(res)).catch(err => reject(err))
		})
	};
}
