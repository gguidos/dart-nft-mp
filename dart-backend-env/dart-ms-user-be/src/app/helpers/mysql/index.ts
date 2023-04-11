import DB from '../../initializers/mysql';

// Contains all purpose query functions
// as: insert, select, update and delete
// Uses the mysql initializer which
// connects the application to database
// and executes the query against the mysql library

// Takes the table name to query and the params to insert
// Uses the prepareInsert function that builds the parameters
// according to the syntax the mysql library requires
// to execute the query
export async function insert(table, params) {
	let { qryStr, qryVls, qryPrms } = prepareInsert(params);
	let query = `INSERT INTO ${table} `;
	query += `(${qryStr}) VALUES (${qryVls})`;
	let res = await DB.query(query, qryPrms);
	return res;
}

// Takes the table name to query and if the query params
// exists in the request
// Uses the prepareSelect function that builds the parameters
// according to the syntax the mysql library requires
// to execute the query
export async function select(table, qryParams?, operator?, type?) {
	let searchParams = [];
	let query = `SELECT * FROM ${table}`;
	let countQuery = `SELECT count(*) FROM ${table}`;
	if (qryParams) {
		let { searchQuery, params } = prepareSelect(qryParams, operator, type);
		if (searchQuery && params) {
			searchParams = params;
			query += ' WHERE ' + searchQuery;
			countQuery += ' WHERE ' + searchQuery;
		}
	}
	let countRes = await DB.query(countQuery, searchParams);
	let count = countRes[0]['count(*)'];
	let results = await DB.query(query, searchParams);

	return { results, count };
}

export async function update(table, uParams) {
	let query = `UPDATE ${table} SET `;
	let { updateQuery, qryParams } = prepareUpdate(uParams.updateParams);
	let { searchQuery, params } = prepareSelect(uParams.whereParams);
	query += updateQuery;
	query += ' WHERE ' + searchQuery;
	qryParams = qryParams.concat(params);
	let results = await DB.query(query, qryParams);
	return results;
}

export async function deletePost(table, dParams) {
	let query = `DELETE FROM ${table} WHERE `;
	let { searchQuery, params } = prepareSelect(dParams);
	query += searchQuery;
	let results = await DB.query(query, params);
	return results;
}

function prepareInsert(params) {
	let qryStr = [];
	let qryPrms = [];
	let qryVls = [];
	Object.keys(params).forEach((el) => {
		qryStr.push(el);
		qryPrms.push(params[el]);
		qryVls.push('?');
	});
	return { qryStr: qryStr.join(', '), qryVls: qryVls.join(', '), qryPrms };
}

function prepareSelect(search, operator?, type?) {
	let qry: any = [];
	let qryNull: string;
	let prms: any = [];
	let searchQuery: string;
	operator = operator || 'AND';
	Object.keys(search).forEach((s) => {
		if (typeof search[s] === 'string') {
			if (search[s] === 'NULL') {
				qryNull = s + ' IS ' + search[s];
			} else {
				if (type && type === 'exact') {
					qry.push(s + ' = ?');
					prms.push(search[s]);
				} else {
					qry.push(s + ' LIKE ?');
					prms.push('%' + search[s] + '%');
				}
			}
		} else if (typeof search[s] === 'number') {
			qry.push(s + ' = ?');
			prms.push(search[s]);
		} else if (Array.isArray(search[s])) {
			qry.push(`${s} IN (?)`);
			prms.push(search[s]);
		}
	});
	if (qry.length > 0) {
		searchQuery = qry.join(` ${operator} `);
	}
	if (qryNull) {
		if (qry.length > 1) searchQuery += ` ${operator}`;
		searchQuery += ' ' + qryNull;
	}
	if (qry.length > 0) {
		return { searchQuery, params: prms };
	}
	return { searchQuery: '', params: [] };
}

function prepareUpdate(params) {
	let qry: any = [];
	let prms: any = [];
	Object.keys(params).forEach((key) => {
		qry.push(key + ' = ?');
		prms.push(params[key]);
	});
	return { updateQuery: qry.join(', '), qryParams: prms };
}
