import decodeToken from '../../helpers/jwt-token';

const logger = require('../../libs/logger');

export default function JWTValidator() {
		return async (req, res, next) => {
			logger.info('[IVALIDATEJWT MW] Validating token');
			let token = req.headers.authorization;
			let reqIp = req.ip;

			if (!token || reqIp === '') {
				res.sendStatus(403);
				return;
			}

			let decoded = decodeToken(token);

			if (!decoded || decoded.ip !== reqIp || decoded.exp <= Date.now()) {
				logger.info('[IVALIDATEJWT MW] Invalid token');
				res.status(403).send('Forbidden access');
				return;
			}
			logger.info('[IVALIDATEJWT MW] Token validated');
			next();
		}
	}
