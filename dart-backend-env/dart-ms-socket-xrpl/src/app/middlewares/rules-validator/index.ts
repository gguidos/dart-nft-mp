import { validate } from '../../libs/rules-validator';

export function validateRules({ rules = {} as object } = {}) {
		return async (req, res, next) => {
			let params = req.body;
			params = { ...params, ...req.query, ...req.params };
			const validation = validate({ params, rules });

			if (Object.keys(validation).length < 1) {
				next();
			} else {
				res.status(403).send({ status: 403, data: validation  });
			}
		}
	}
