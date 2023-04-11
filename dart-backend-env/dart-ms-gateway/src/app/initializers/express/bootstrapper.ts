import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as swagger from 'swagger-ui-express';
import * as multer from 'multer';

import MetadataKeys from './utils/metadata-keys';
import { IRouter } from './decorators/handlers-decorators';
import swaggerDoc from './swagger';
const appRoot = require('app-root-path');

const morgan = require('./libs/morgan');
const logger = require('../../libs/logger');

export default class ExpressApplication {
	private app;
	private port: number;

	constructor(private middlewares: any[], private controllers: any[]) {
		this.port = process.env.NODE_PORT;
		this.app = express();
		
		this.setupHelmet();
		this.setupCompression();
		// this.setupMulter();
		this.setupBodyParser();
		
		this.setupCors();
		this.setupSwagger();

		//init
		this.setupLogger();
		this.setupMiddleware(this.middlewares);
		this.setUpControllers(this.controllers);
		this.configureAssets();
		
	}

	private setupMiddleware(middlewareArr: any[]) {
		middlewareArr.forEach((middleware) => {
			this.app.use(middleware);
		});
	}

	private setUpControllers(controllers: any[]) {
		const info: Array<{ api: string; handler: string }> = [];

		controllers.forEach((Controller) => {
			const controllerInstance: { handlename: string } = new Controller();
			const basePath: string = Reflect.getMetadata(
				MetadataKeys.BASE_PATH,
				Controller
			);
			const routers: IRouter[] = Reflect.getMetadata(
				MetadataKeys.ROUTERS,
				Controller
			);

			const expressRouter = express.Router();

			routers.forEach(({ method, handlerPath, middlewares, handlerName }) => {
				if (middlewares) {
					expressRouter[method](
						handlerPath,
						...middlewares,
						controllerInstance[String(handlerName)].bind(controllerInstance)
					);
				} else {
					expressRouter[method](
						handlerPath,
						controllerInstance[String(handlerName)].bind(controllerInstance)
					);
				}

				info.push({
					api: `${method.toLocaleLowerCase} ${basePath + handlerPath}`,
					handler: `${Controller.name}.${String(handlerName)}`,
				});

				this.app.use(basePath, expressRouter);
			});
		});
	}

	private configureAssets() {
		this.app.use(express.static(path.join(__dirname + '../public')));
		this.app.use(
			'/coverage',
			express.static(appRoot + '/coverage/lcov-report')
		);
	}

	private setupSwagger() {
		this.app.use('/api-docs', swagger.serve, swagger.setup(swaggerDoc()));
	}

	private setupBodyParser() {
		this.app.use(bodyParser.json({ type: 'text/*' }));
		this.app.use(bodyParser.urlencoded({ extended: true }));
	}

	private setupCompression() {
		this.app.use(compression());
	}

	private setupHelmet() {
		this.app.use(helmet());
	}

	private setupLogger() {
		this.app.use(morgan);
	}

	// private setupMulter() {
	// 	const storage = multer.diskStorage({
	// 		destination: (req, file, cb) => { cb(null, `${path.resolve("./")}${path.sep}files`) },
	// 		filename: (req, file, cb) => {
	// 			const ext = file.mimetype.split('/')[1]
	// 			cb(null, `${file.originalname.split('.')[0]}.${Date.now()}.${ext}`)
	// 		}
	// 	})
	// 	const upload = multer({ storage })
	// 	this.app.use(upload.single('file'))

	// }

	private setupCors() {
		this.app.options('*', cors({credentials: true, origin: true}));
		this.app.use(cors())
	}

	public start() {
		return this.app.listen(this.port, () => {
			logger.info(`[EXPRESS] Server listening on port ${this.port}`);
		});
	}
}
