import Controller from '../../../initializers/express/decorators/controller-decorators';
import { Get, Post } from '../../../initializers/express/decorators/handlers-decorators';
import { validateRules } from '../../../middlewares/rules-validator';
import { rules, registerConsumer } from '../libs/use-cases/index';
import { AppError } from '../../../common/error';

const logger = require('../../../libs/logger');

@Controller('/api/v1/admin')
export class AdminController {

	@Get('/rules')
	async getRules(req, res) {
		logger.info('[COMPONENT][CONTROLLER] initiating GET RULES operation');
		let results = 'getRules';
		logger.info('[COMPONENT][CONTROLLER] GET RULES operation concluded');

		res.status(200).send({ data: results });
	}

	@Post('/consumer/registration', [validateRules({ rules: rules({ useCase:'registration' }) })])
	async post(req, res, next) {
		try {
			logger.info('[COMPONENT][CONTROLLER] initiating POST operation');
			const options = {
				hostname: req.body.hostname,
				ip: req.body.ip,
				createdBy: req.body.createdBy,
				createdByHost: req.hostname
			}
			registerConsumer(options).then(response => {
				res.status(200).send( { data: response })
			}).catch(err => { 
				res.status(403).send( { data: err })
			})
		} catch (err) {
			console.log(err)
		}
	}
}
