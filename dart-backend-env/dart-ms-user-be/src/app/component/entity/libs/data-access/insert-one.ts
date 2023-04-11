export default function makeInsertOne({ insertOneDocument }) {
	return Object.freeze({ insertOne });

	async function insertOne(document) {
		const inserted = await insertOneDocument(document);
		return Promise.resolve(inserted);
	}
}
