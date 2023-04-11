import Controller from '../../../initializers/express/decorators/controller-decorators';
import { Get, Post, Put } from '../../../initializers/express/decorators/handlers-decorators';
import { validateRules } from '../../../middlewares/rules-validator';
import useCases from '../libs/use-cases';
import { AppError } from '../../../common/error';
import { getRules } from '../libs/user';

const logger = require('../../../libs/logger');

@Controller('/api/v1/user')
export class ExampleController {

	@Get('/rules')
	async getRules(req, res) {
		logger.info('[COMPONENT][CONTROLLER] initiating GET RULES operation');
		let results = getRules;
		logger.info('[COMPONENT][CONTROLLER] GET RULES operation concluded');

		res.send({ data: results });
	}

	@Post('/registration', [validateRules({ rules: getRules.post })])
	async register(req, res) {
		try {
			logger.info('[COMPONENT][CONTROLLER] initiating POST operation');
			let results = await useCases.register({ info: req.body });
			logger.info('[COMPONENT][CONTROLLER] POST operation concluded');
			res.send({ data: results }).status(200);
		} catch (err) {
			res.status(403).send({ data: err })
		}
	}

	@Post('/verification')
	async verify(req, res) {
		try {
			logger.info('[COMPONENT][CONTROLLER] initiating POST operation');
			let results = await useCases.verify({ info: req.body });

			logger.info('[COMPONENT][CONTROLLER] POST operation concluded');
			res.send({ data: results }).status(200);
		} catch (err) {
			res.status(403).send({ data: err })
		}
	}

	@Post('/auth', [validateRules({ rules: getRules.auth })])
	auth(req, res) {
		try {
			const params = req.body;
			useCases
			.userAuth({ params })
			.then(response => res.status(200).send({ data: response }))
			.catch(err => res.status(403).send({ data: err }))
		} catch(err) {
			res.status(403).send({ data: err })
		}
	}

	@Put('/', [validateRules({ rules: getRules.put })])
	update(req, res) {
		try {
			const params = req.body;
			useCases
			.userUpdate({ params })
			.then(response => res.status(200).send({ data: response }))
			.catch(err => res.status(403).send({ data: err }))
		} catch(err) {
			res.status(403).send({ data: err })
		}
	}
}
