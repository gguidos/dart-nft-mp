import * as express from 'express';
import printReq from './middlewares/print-req';
import ExpressApplication from './bootstrapper';
import getControllers from './utils/find-controllers';

export default async function startExpress() {
	try {
		const controllers = await getControllers()
		const app = new ExpressApplication([printReq], controllers);
		const server = app.start();
		const io = require('socket.io')(server, {
			cors: {
				origin: '*',
				methods: ['GET', 'POST']
			}
		})
	
		
	
		return Promise.resolve()
	} catch (err) {
		return Promise.reject(err)
	}

}
