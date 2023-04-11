const logger = require('../../../../libs/logger');

export default function printReq(req, res, next) {
	logger.info(`[EXPRESS][REQUEST] ${req.ip} ${req.method} ${req.path}`);
	next();
}
