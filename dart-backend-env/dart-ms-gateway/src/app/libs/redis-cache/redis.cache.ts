import CacheManager from '../../initializers/redis-cache';

export default function makeCacheManager({ redisCacheDb }) {
	return Object.freeze({
		getCache,
		setCache,
		getKeys,
		forceAddArrayToCache,
		addArrayToCache,
		addElementToDictionary,
		addObjectToCacheById,
		cleanIdFromCache,
	});

	async function getCache(cacheKey) {
		return new Promise<{}>(async (resolve, reject) => {
			let cache = new CacheManager(cacheKey);
			let keys = await cache.getKeys();
			if (keys && keys.length > 0) {
				cache
					.getCache()
					.then((data) => {
						resolve(data);
						cache.quit();
					})
					.catch((err) => {
						cache.quit();
						reject(err);
					});
			} else {
				cache.quit();
				resolve({ data: [] });
			}
		});
	}

	async function setCache(cacheKey, data, ttl?) {
		let cache = new CacheManager(cacheKey, ttl);
		await cache.setCache(data);

		cache.quit();

		return;
	}

	async function getKeys(cacheKey) {
		let cache = new CacheManager(cacheKey);
		let keys = await cache.getKeys();

		cache.quit();

		return keys;
	}

	async function forceAddArrayToCache(cacheKey, data) {
		let cache = new CacheManager(cacheKey);
		await cache.setCache(data);
		cache.quit();

		return;
	}

	async function addArrayToCache(cacheKey, data) {
		let cache = new CacheManager(cacheKey);
		let keys = await cache.getKeys();
		if (keys && keys.length > 0) {
			let cacheRes = await cache.getCache();
			let cacheData = cacheRes['data'] || [];
			let filterData = data.filter((id) => cacheData.indexOf(id) === -1);
			if (filterData && filterData.length > 0) {
				data = cacheData.concat(filterData);
			}
		}
		await cache.setCache(data);
		cache.quit();

		return;
	}

	async function addElementToDictionary(cacheKey, data) {
		let cache = new CacheManager(cacheKey);
		let keys = await cache.getKeys();
		if (keys.length > 0) {
			let cacheRes = await cache.getCache();
			let cacheData = cacheRes['data'];
			data = { ...cacheData, ...data };
		}

		cache.setCache(data);
		cache.quit();
		return;
	}

	async function addObjectToCacheById(cacheKey, object) {
		let cache = new CacheManager(cacheKey);
		let keys = await cache.getKeys();
		let cacheData = [object];
		if (keys.length > 0 && keys.indexOf(cacheKey) !== -1) {
			let cacheRes = await cache.getCache();
			cacheData = cacheRes['data'];
			let filteredCacheData = cacheData.filter((obj) => obj.id === object.id);
			if (filteredCacheData.length < 1) {
				cacheData.push(object);
			}
		}

		await cache.setCache(cacheData);
		cache.quit();

		return;
	}

	async function cleanIdFromCache(cacheKey, id, ttl?) {
		let cache = new CacheManager(cacheKey, ttl);
		let keys = await cache.getKeys();
		if (keys.length > 0) {
			let cacheRes = await cache.getCache();
			let cacheData = cacheRes['data'];
			if (cacheData.includes(id)) {
				cacheData = cacheData.filter((cdId) => cdId !== id);
				await cache.setCache(cacheData);
			}
		}
		cache.quit();

		return;
	}

	async function cleanObjectFromCache(cacheKey, id, ttl?) {
		let cache = new CacheManager(cacheKey, ttl);
		let keys = await cache.getKeys();
		if (keys.length > 0) {
			let cacheRes = await cache.getCache();
			let cacheData = cacheRes['data'].map((obj) => obj.id);
			if (cacheData.includes(id)) {
				cacheData = cacheRes['data'].filter((obj) => obj.id !== id);
				await cache.setCache(cacheData);
			}
		}
		cache.quit();

		return;
	}

	async function addElementToList(cacheKey, element, ttl?) {
		let cacheData = [];
		let cache = new CacheManager(cacheKey, ttl);
		let keys = await cache.getKeys();
		if (keys && keys.length > 0) {
			let res = await cache.getCache();
			cacheData = res['data'];
			if (cacheData.length < 1 || cacheData.indexOf(element) === -1) {
				cacheData.push(element);
			}
		} else {
			cacheData.push(element);
		}

		await cache.setCache(cacheData);
		cache.quit();

		return;
	}
}
