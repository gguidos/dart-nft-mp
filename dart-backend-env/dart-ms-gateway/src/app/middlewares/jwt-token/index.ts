import { decodeJWT } from '../../helpers/jwt-token';
import { cachedData  } from '../../common/libs/use-cases/';
const logger = require('../../libs/logger');

export default function JWTValidator() {
	return (req, res, next) => {
		
		try {
			if (!req.headers.authorization) res.status(403).send({error: 1, data: 'unauthorized'});
			const token = req.headers.authorization
			req.body.token = decodeJWT({ token })
			next();
		} catch (error) {
			res.status(403).send({error: 1, data: 'unauthorized'})
		}

	}
}
