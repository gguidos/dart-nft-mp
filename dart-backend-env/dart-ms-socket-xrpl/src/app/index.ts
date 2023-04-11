require('dotenv').config();

import * as config from 'nconf';
import 'reflect-metadata';
import startExpress from './initializers/express-socket';
const logger = require('./libs/logger');

config.use('memory');
config.env();

async function start() {
	logger.info(`[SERVICE] Starting ${process.env.NAME}`);
	try {
		await startExpress();
		logger.info(`[SERVICE] Running ${process.env.NAME}`);
		process.on('uncaughtException', (err) => {
			logger.error('[SERVICE] Caught exception: ' + err);
		});
	} catch (ex) {
		logger.error('[SERVICE] Caught exception: ' + ex);
	}
}

start();