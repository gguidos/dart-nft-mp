export default function makeUpdateOne({ updateDocument }) {
	return Object.freeze({ updateOne });

	async function updateOne(query, values) {
		const updated = await updateDocument(query, {$set: values});
		return Promise.resolve(values);
	}
}