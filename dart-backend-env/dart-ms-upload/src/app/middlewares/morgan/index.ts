const morgan = require('morgan');
const logger = require('../../libs/logger');

const stream = {
	write: (message: string) =>
		logger.http(message.substring(0, message.lastIndexOf('\n'))),
};

const skip = () => {
	const env = process.env.NODE_ENV || 'development';
	return env !== 'development';
};

const morganMiddleware = morgan(
	'[EXPRESS] :remote-addr :method :url :status :res[content-length] - :response-time ms',
	{ stream }
);

module.exports = morganMiddleware;
