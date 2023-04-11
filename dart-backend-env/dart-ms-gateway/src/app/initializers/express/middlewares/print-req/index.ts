const logger = require('../../../../libs/logger');

export default function printReq(req, res, next) {
	console.log('req')
	logger.info(`[EXPRESS][REQUEST] ${req.ip} ${req.method} ${req.path}`);
	
	next();
}