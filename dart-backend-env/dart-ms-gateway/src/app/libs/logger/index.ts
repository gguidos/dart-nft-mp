import { format, createLogger } from 'winston';

const { combine, timestamp, errors } = format;

const logger = createLogger({        
    format: combine(
        errors({ stack: true }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    ),
    defaultMeta: { service: process.env.NAME },
    transports: require('./libs/transports')
})


module.exports = logger