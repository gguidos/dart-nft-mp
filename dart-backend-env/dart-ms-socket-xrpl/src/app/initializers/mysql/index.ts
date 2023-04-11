import * as mysql from 'mysql';

const logger = require('../libs/winston-transports');

class Connection {
	private pool: mysql.IPool;

	constructor() {
		this.createPool();
	}

	createPool() {
		this.pool = mysql.createPool({
			connectionLimit: 100,
			host: process.env.MYSQL_DB_HOST,
			user: process.env.MYSQL_DB_USER,
			password: process.env.MYSQL_DB_PASSWORD,
			database: process.env.MYSQL_DB_DATABASE,
			debug: false,
		});

		if (this.pool) {
			this.pool.getConnection((err) => {
				if (err) {
					logger.yell.info(
						'[DATABASE] Connection to MYSQL failed. Possibly due to bad configuration of database computer.',
						err
					);
				} else {
					logger.yell.info('[DATABASE] successfully connected to Mysql');
				}
			});
		} else {
			logger.yell.info('[DATABASE] failed to connect to Mysql');
		}
	}

	async getConnection() {
		return new Promise<mysql.IConnection>((resolve, reject) => {
			this.pool.getConnection((err, connection) => {
				if (err) {
					reject({ status: '[DATABASE] error in connecting to the database' });
				}
				resolve(connection);
			});
		});
	}

	private closeConnection() {
		this.pool.end();
	}

	async query<T = any>(
		query: string,
		params?: [string | number | boolean | Buffer] | Object
	) {
		const connection = await this.getConnection();

		return this._query(connection, query, params).then((value) => {
			connection.release();
			return value;
		});
	}

	async _query<T = any>(
		connection: mysql.IConnection,
		query: string,
		params?: [string | number | boolean | Buffer] | Object
	) {
		return new Promise<T[]>((resolve, reject) => {
			// escaping for ids and values (avoid SQL Injection)
			query = mysql.format(query, params);

			// execute the query
			connection.query(query, (err, result) => {
				if (err) {
					reject(err);
				}
				resolve(result);
			});
		});
	}

	async beginTransaction(): Promise<any> {
		const connection = await this.getConnection();

		return new Promise((resolve, reject) => {
			connection.beginTransaction((err) => {
				if (err) {
					reject(err);
				} else {
					resolve({
						query: this._query.bind(this, connection),
						format: (query, params) => mysql.format(query, params),
						commit: async () => {
							return new Promise((commitResolve, commitReject) => {
								connection.commit((err) => {
									if (err) {
										commitReject(err);
										return connection.rollback(() => {});
									} else {
										commitResolve({});
									}
									connection.release();
								});
							});
						},
					});
				}
			});
		});
	}
}

export default new Connection();
export { Connection };
