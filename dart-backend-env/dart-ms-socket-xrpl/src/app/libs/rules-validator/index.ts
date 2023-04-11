import * as Validator from 'validatorjs';
import makeValidate from './rules.validator';

const logger = require('../../libs/logger');

const validate = ({ params, rules }) => {
	logger.info(`[RULESVALIDATOR] validating ${JSON.stringify(params)}`);
	const validator = makeValidate({ Validator });
	logger.info(`[RULESVALIDATOR] ${JSON.stringify(params)} validated`);
	return validator.validate({ params, rules });
};

export { validate };
