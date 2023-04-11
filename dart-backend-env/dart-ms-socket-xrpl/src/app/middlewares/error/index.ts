import { AppError } from '../../common/error';

const logger = require('../../libs/logger');

export default function ErrorHandelingMiddleware
{
	return (err, req, res, next: (err) => any) => {
		let inDevelopment = process.env.NODE_ENV === 'development';
		let currentError = new Error();

		logger.error({ message: `${err} ${currentError.stack}` });

		if (err instanceof AppError) {
			res.status(err.statusCode || 403);
			res.json({
				error: err.statusCode,
				data: { message: err.message },
			});
		} else {
			res.status((err && err.status) || 403);

			if (inDevelopment) {
				res.json({
					error: err.statusCode,
					data: { message: err },
				});
			} else {
				res.json({
					error: err.statusCode,
					data: { message: "Something went wrong! That's all we know." },
				});
			}
		}

		next(err);
	}
}
