const Sequelize = require('sequelize');
let db = require('../db');

let Departments = require('./Departments');

const EducationPlan = db.define('education_plans', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	user_id: {
		type: Sequelize.INTEGER,
	},
	department_id: {
		type: Sequelize.INTEGER,
	},
	name: {
		type: Sequelize.STRING,
	},
	status: {
		type: Sequelize.STRING,
	},
	year: {
		type: Sequelize.STRING,
	},
	created_at: {
		type: Sequelize.DATE,
	},
	qualification: {
		type: Sequelize.STRING,
	},
	discipline: {
		type: Sequelize.STRING,
	},
	specialty: {
		type: Sequelize.STRING,
	},
	specialization: {
		type: Sequelize.STRING,
	},
	educational_program: {
		type: Sequelize.STRING,
	},
	educational_level: {
		type: Sequelize.STRING,
	},
	form_study: {
		type: Sequelize.STRING,
	},
	training_period: {
		type: Sequelize.STRING,
	},
});

EducationPlan.belongsTo(Departments, {
	foreignKey: 'department_id',
	targetKey: 'department_id',
});

module.exports = EducationPlan;
