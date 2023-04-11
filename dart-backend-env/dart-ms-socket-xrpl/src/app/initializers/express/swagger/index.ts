let swaggerRoot = require('./root.swagger.json');

export default function swaggerDoc() {
	let swaggerPaths = getSwaggerPaths();
	let swaggerDoc = swaggerRoot;
	swaggerDoc.paths = swaggerPaths;
	return swaggerDoc;
}

function getSwaggerPaths() {
	let componentDirs = require('require-dir')('../../../component', { recurse: true });
	let swaggerFiles = Object.keys(componentDirs).reduce((pr, cr, i) => {
		let sf = Object.keys(componentDirs[cr]).reduce((p, c, i) => {
			if (c.includes('swagger')) {
				p = componentDirs[cr][c];
			}
			return p;
		}, {});
		pr = { ...pr, ...sf };
		return pr;
	}, {});
	return swaggerFiles;
}
