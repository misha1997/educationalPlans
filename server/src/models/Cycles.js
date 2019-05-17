const Sequelize = require('sequelize');
let db = require('../db');

const Cycles = db.define('cycles', {
	cycles_id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	credits: {
		type: Sequelize.INTEGER,
	},
});

module.exports = Cycles;
