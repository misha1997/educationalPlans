const Sequelize = require('sequelize');
const db = require('../db');

const Subjects = db.define('subjects', {
	subject_id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	name: {
		type: Sequelize.STRING,
	},
});

module.exports = Subjects;
