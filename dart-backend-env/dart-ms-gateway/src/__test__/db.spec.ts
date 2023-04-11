import * as dotenv from 'dotenv';
import * as config from 'nconf';

dotenv.config(); //important to load as soon as possible

config.use('memory');
config.env();

import MongoDBClient from '../app/initializers/mongoDb';

const dbName = process.env.MONGODB_DB_TEST_DB_NAME;
const db = new MongoDBClient({ dbName });
const expect = require('chai').expect;
const fakeDB = require('./JSON/dishes.json');

describe('mongoDB class', () => {
	beforeEach(async () => {
		try {
			await db.connect();
		} catch (ex) {
			return ex;
		}
	});

	describe('Testing insertDocumentWithIndex', () => {
		it('Inserting Single Document', async () => {
			const data = await db.insertDocumentWithIndex(fakeDB[0]);
			expect(data.insertedId);
		});
	});

	describe('Testing getDocumentCountByQuery', () => {
		it('getDocumentCountByQuery - simple count', async () => {
			var item = await db.getDocumentCountByQuery({ name: 'vesuvio' });
			expect(item).to.equal(1);
		});
	});

	describe('Testing findDocByAggregation', () => {
		it('findDocByAggregation - simple find', async () => {
			var item = await db.findDocByAggregation([{ $match: { idx: 1 } }]);
			expect(item.length).to.equal(1);
			expect(item[0].idx).to.equal(1);
		});
	});

	describe('Testing deleteByQuery', () => {
		it('deleteByquery - single document', async () => {
			var item = await db.deleteOneDocument({ idx: 1 });
			expect(item.deletedCount).to.equal(1);

			db.dropDB();
		});
	});

	describe('Testing insertManyDocuments', () => {
		it('insertManyDocuments - multiple insert', async () => {
			const data = await db.insertManyDocuments(fakeDB);
			expect(data.length).to.equal(9);
		});
	});

	describe('Testing findDocFieldsByFilter', () => {
		it('findDocFieldsByFilter - search', async () => {
			var item = await db.findDocFieldsByFilter({ idx: 3 }, { idx: 1 }, 1);

			expect(item[0].idx).to.equal(3);
		});

		it('findDocFieldsByFilter - limit', async () => {
			var item = await db.findDocFieldsByFilter(
				{ name: 'vesuvio' },
				{ name: 'funghi' },
				2
			);

			expect(item.length).to.equal(1);
		});
	});

	describe('Testing deleteManyByQuery', () => {
		it('deleteManyByquery - many documents', async () => {
			var item = await db.deleteManyDocuments({});
			db.dropDB();
			expect(item.deletedCount).to.equal(9);
		});
	});
});
