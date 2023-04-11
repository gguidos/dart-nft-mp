import Controller from '../../../initializers/express/decorators/controller-decorators';
import { 
	Get,
	Post,
	Put } from '../../../initializers/express/decorators/handlers-decorators';
import { validateRules } from '../../../middlewares/rules-validator';
import validateJWToken from '../../../middlewares/jwt-token';
import { AppError } from '../../../common/error';
import { makeRules } from '../libs/document';
import { cacheData } from '../libs/use-cases';
import { cachedData } from '../../../common/libs/use-cases'

const logger = require('../../../libs/logger');

@Controller('/api/v1/user')
export class ExampleController {

	@Get('/rules/:endpoint')
	async getRules(req, res) {
		logger.info('[COMPONENT][CONTROLLER] initiating GET RULES operation');
		let results = makeRules(req.params.endpoint).rules;
		logger.info('[COMPONENT][CONTROLLER] GET RULES operation concluded');

		res.send({ data: results });
	}

	@Post('/registration', [validateRules({ rules: makeRules('registration').rules })])
	post(req, res, next) {
		try {
			logger.info('[COMPONENT][CONTROLLER] initiating POST operation');
			
			const url = 'http://localhost:3000/api/v1/user/registration'
			
			const options = {
				method: 'post',
				body: JSON.stringify(req.body)
			}
			fetch(url, options)
			.then(response => {
				if (!response.ok) return { error: response.statusText};
				return response.json();
			}).then(data => {
				if (data && data.error) {
					return res.status(403).send({ data: data.error })
				}
				res.status(200).send(data)
			}).catch(err => {
				logger.error(err)
			})
		} catch (err) {
			console.log(err)
		}
	}

	@Post('/verification')
	verify(req, res) {
		try {
			logger.info('[COMPONENT][CONTROLLER] initiating POST operation');
			
			const url = 'http://localhost:3000/api/v1/user/verification'
			
			const options = {
				method: 'post',
				body: JSON.stringify(req.body)
			}
			
			fetch(url, options)
				.then(response => {
					if (!response.ok) return { error: response.statusText};
					return response.json();
				}).then(data => {
					if (data && data.error) {
						return res.status(403).send({ data: data.error })
					}
					res.status(200).send(data)
				}).catch(err => {
					logger.error(err)
				})
		} catch (err) {
			console.log(err)
		}
	}

	@Post('/auth', [validateRules({ rules: makeRules('auth').rules })])
	auth(req, res) {
		try {
			logger.info('[COMPONENT][CONTROLLER] initiating POST operation');
			
			const url = 'http://localhost:3000/api/v1/user/auth'
			
			const options = {
				method: 'post',
				body: JSON.stringify(req.body)
			}
			
			fetch(url, options)
				.then(response => {
					if (!response.ok) return { error: response.statusText};
					return response.json();
				})
				.then(data => {
					if (data && data.error) {
						return res.status(403).send({ data: data.error })
					}
					const cachedData = cacheData({ data: data.data.message })
					res.status(200).send(cachedData)
				})
				.catch(err => {
					logger.error(err)
				})
		} catch (err) {
			console.log(err)
		}
	}

	@Put('/', [validateRules({ rules: makeRules('update').rules }), validateJWToken()])
		async put(req, res) {
			try {
				logger.info('[COMPONENT][CONTROLLER] initiating POST operation');
		
				const url = 'http://localhost:3000/api/v1/user/';
				const token = req.body.token;
				const userInfo = await cachedData({ token })

				delete req.body.token;
				
				req.body.usernameHash = userInfo['usernameHash'];
				const options = {
					method: 'put',
					body: JSON.stringify(req.body)
				};

				fetch(url, options)
					.then(response => {
						if (!response.ok) return { error: response.statusText};
						return response.json();
					})
					.then(data => {
						if (data && data.error) {
							return res.status(403).send({ data: data.error })
						}
						const nUserInfo = cacheData({ data: data.data.message })

						res.status(200).send(nUserInfo)
					})
					.catch(err => {
						logger.error(err)
					})
			} catch(err) {
				logger.error(err)
			}
		}
}
