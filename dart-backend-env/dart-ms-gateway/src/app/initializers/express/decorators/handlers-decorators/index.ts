import MetadataKeys from '../../utils/metadata-keys';

export enum Methods {
	GET = 'get',
	POST = 'post',
	PUT = 'put',
	DELETE = 'delete',
	USEBEFORE = 'userBefore',
}

export interface IRouter {
	method: Methods;
	middlewares?: any[];
	handlerPath: string;
	handlerName: string | symbol;
}

const decoratorsFactory =
	(method: Methods) =>
	(path: string, middlewares?: any[]): MethodDecorator =>
	(target, propertyKey) => {
		const controllerClass = target.constructor;
		const routers: IRouter[] = Reflect.hasMetadata(
			MetadataKeys.ROUTERS,
			controllerClass
		)
			? Reflect.getMetadata(MetadataKeys.ROUTERS, controllerClass)
			: [];
		routers.push({
			method,
			middlewares,
			handlerPath: path,
			handlerName: propertyKey,
		});

		Reflect.defineMetadata(MetadataKeys.ROUTERS, routers, controllerClass);
	};

export const Get = decoratorsFactory(Methods.GET);
export const Post = decoratorsFactory(Methods.POST);
export const Put = decoratorsFactory(Methods.PUT);
export const Delete = decoratorsFactory(Methods.DELETE);
export const UseBefore = decoratorsFactory(Methods.USEBEFORE);
