export default function makeInsertOne({ insertOneDocument }) {
	return Object.freeze({ insertOne });

	async function insertOne(document, coll) {
		const inserted = await insertOneDocument(document, coll);
		return Promise.resolve(inserted);
	}
}