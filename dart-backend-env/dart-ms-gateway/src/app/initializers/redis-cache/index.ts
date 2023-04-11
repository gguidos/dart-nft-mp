import * as Redis from 'redis';

const logger = require('../../libs/logger')

class CacheHandler {
	client;
	key;
	ttl;

	constructor(key, ttl?) {
		logger.info('[REDIS]Creating client');
		ttl = ttl ? ttl : 31556952;
		this.client = Redis.createClient({
			socket: {
				host: process.env.REDIS_DB_HOST,
				port: process.env.REDIS_DB_PORT,
			},
		});
		this.key = key;
		this.ttl = ttl;
	}

	async setCache(data) {
		return new Promise<boolean>((resolve, reject) => {
			this.client.setex(this.key, this.ttl, JSON.stringify([data]));
			resolve(true);
		});
	}

	async getKeys() {
		logger.info('[REDIS] finding cachekeys');
		return new Promise<Array<string>>((resolve, reject) => {
			this.client.keys(this.key, (err, data) => {
				logger.info('[REDIS] found cachekeys');
				resolve(data);
			});
		});
	}

	async delKey() {
		return new Promise<boolean>((resolve, reject) => {
			this.client.delKey(this.key);
			resolve(true);
		});
	}

	async getValues(keys) {
		return new Promise((resolve, reject) => {
			let data = {};
			keys.forEach((key) => {
				key = 'ooisFile:' + key;
				this.client.mget(key, (err, data) => {
					resolve(data);
				});
			});
		});
	}

	async getCache() {
		logger.info('[REDIS] finding cached data');
		return new Promise((resolve, reject) => {
			this.client.get(this.key, (err, data) => {
				if (err) reject(err);
				data = JSON.parse(data);
				let source = 'cache';
				logger.info('[REDIS] cached data found');
				resolve({ source, data });
			});
		});
	}

	quit() {
		logger.info('[REDIS] Quiting client');
		this.client.quit();
	}
}

export default CacheHandler;
