const faker = require('faker');
faker.locale = 'ja';
const { address, name, internet, fake, datatype } = faker;

export default (overrides?) => ({
	name: address.city(),
	createdBy: name.findName(),
	modifiedBy: name.findName(),
	ingredients: [fake('{{name.lastName}}, {{name.firstName}}')],
	price: datatype.number(),
	source: {
		ip: internet.ip(),
		browser: internet.userAgent(),
	},
	...overrides,
});
