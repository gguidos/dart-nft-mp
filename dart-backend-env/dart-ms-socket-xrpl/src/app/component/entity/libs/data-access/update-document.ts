export default function makeUpdateOne({ updateDocument }) {
	return Object.freeze({ updateOne });

	async function updateOne(query, valueInfo) {
		const updated = await updateDocument(query, valueInfo);
		return Promise.resolve(valueInfo);
	}
}