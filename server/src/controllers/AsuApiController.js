const _ = require('lodash');
const curl = new (require('curl-request'))();

const Subdivision = require('../models/Subdivision');
const Departments = require('../models/Departments');

const parseData = response => {
	let sudivisionsData = _.filter(JSON.parse(response).result, item => {
		return item.KOD_TYPE == 7 || item.KOD_TYPE == 8 || item.KOD_TYPE == 9;
	});

	let departmentsData = _.filter(JSON.parse(response).result, item => {
		return item.KOD_TYPE == 2;
	});

	let subdivisions = _.map(sudivisionsData, item => {
		return {
			api_id: item.ID_DIV,
			name: item.NAME_DIV,
		};
	});

	let departments = _.map(departmentsData, item => {
		return {
			api_id: item.ID_DIV,
			parent_id: item.ID_PAR,
			name: item.NAME_DIV,
		};
	});

	return {
		subdivisions: subdivisions,
		departments: departments,
	};
};

const departmentsFormatter = (SubdivisionsDb, departmentsData) => {
	let departments = [];

	for (let i = 0; i < departmentsData.length; i++) {
		_.forEach(SubdivisionsDb, item => {
			if (departmentsData[i].parent_id == item.api_id) {
				departments.push({
					subdivision_id: item.subdivision_id,
					api_id: departmentsData[i].api_id,
					name: departmentsData[i].name,
				});
			}
		});
	}
	return departments;
};

const store = async response => {
	let { subdivisions, departments } = parseData(response);

	await Subdivision.bulkCreate(subdivisions);
	let SubdivisionsDb = await Subdivision.findAll();

	departments = departmentsFormatter(SubdivisionsDb, departments);
	await Departments.bulkCreate(departments);
};

module.exports = {
	getAsuData(req, res) {
		curl
			.get(process.env.ASU_SUMDU_API + process.env.ASU_KEY)
			.then(({ body }) => {
				store(body);
				res.send('Data was successfully saved to data base');
			})
			.catch(e => {
				console.log(e);
				res.status(400).send({
					error: 'Problem with API ASU',
				});
			});
	},
};
