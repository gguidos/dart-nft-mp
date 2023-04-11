import * as events from 'events';
const eventEmitter = new events.EventEmitter();
const logger = require('../../../libs/logger');

eventEmitter.on('mintprocess', data => logger.info(data))
eventEmitter.on('log', data => logger.info(data))

export default eventEmitter