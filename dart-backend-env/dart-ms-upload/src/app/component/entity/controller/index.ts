import Controller from '../../../initializers/express/decorators/controller-decorators';
import { Get, Post } from '../../../initializers/express/decorators/handlers-decorators';
import { validateRules } from '../../../middlewares/rules-validator';
import useCases from '../libs/use-cases';
import upload from '../../../middlewares/multer';
import uploadMultiple from '../../../middlewares/multer-multiple';
// import { AppError } from '../../../common/error';
// import { getRules } from '../libs/file';

const logger = require('../../../libs/logger');
@Controller('/api/v1/file')
export class ExampleController {

	@Post('/single', [upload.single('file')])
	upload(req, res) {
		try {
			if (!req.file) {
				res.status(403).send({ data: 'Invalid file' })
				return;
			}
			useCases
			.uploadFile({ file: req.file, username: req.body.username })
			.then(response => res.status(200).send({ data: response }))
			
		} catch(err) {
			res.status(403).send({ data: err })
		}
	}

	@Post('/multiple', [uploadMultiple.array('file')])
	uploadFiles(req, res) {
		try {
			if (!req.files) {
				res.status(403).send({ data: 'Invalid file' })
				return;
			}
			useCases
			.uploadNFTFiles({ files: req.files, username: req.body.username, metadata: req.body.metadata })
			.then(response => res.status(200).send({ data: response }))
		} catch(err) {
			res.status(403).send({ data: err })
		}
	}

}
