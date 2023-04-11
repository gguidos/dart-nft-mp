import {
	insertOneDocument,
	findDocumentsByQuery,
	deleteDocumentByQuery,
	deleteDocumentsByQuery,
	dropDB
} from './fixtures/data-access';
import makeInsertOne from '../app/component/entity/libs/s3/insert-one';
import makeFindDocuments from '../app/component/entity/libs/s3/find-documents';
import makeDeleteDocument from '../app/component/entity/libs/s3/delete-document';
import makeDeleteDocuments from '../app/component/entity/libs/s3/delete-documents';
import makeFakePost from './fixtures/fakeSource';

const expect = require('chai').expect;

describe('Testing data-access', () => {
	let fakeDocument;
	let insertedDocument;

	it('should insert a new document', async () => {
		fakeDocument = makeFakePost();
		const { insertOne } = makeInsertOne({ insertOneDocument });
		const results = await insertOne(fakeDocument);
		expect(results).to.have.own.property('insertedId');
	});

	it('should find a document by name', async () => {
		const { findDocuments } = makeFindDocuments({ findDocumentsByQuery });
		const results = await findDocuments({ name: fakeDocument.name });
		insertedDocument = results[0]
		expect(results).to.have.length(1);
		expect(insertedDocument).to.have.own.property('idx')
	});

	it('should find a document by idx', async () => {
		const { findDocuments } = makeFindDocuments({ findDocumentsByQuery });
		const results = await findDocuments({ idx: insertedDocument.idx });
		expect(results[0].name).to.equal(fakeDocument.name)
	})

	it('should find all documents', async () => {
		const { findDocuments } = makeFindDocuments({ findDocumentsByQuery });
		const nfakeDocument = makeFakePost();
		const { insertOne } = makeInsertOne({ insertOneDocument });
		await insertOne(nfakeDocument);
		const results = await findDocuments({});
		expect(results).to.have.length(2);
	});

	it('should delete all documents', async () => {
		const { deleteDocuments } = makeDeleteDocuments({ deleteDocumentsByQuery });
		
		const { deletedCount } = await deleteDocuments({})

		expect(deletedCount).to.equal(2)

		dropDB()
	});
});
