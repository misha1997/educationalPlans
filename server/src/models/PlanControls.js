const Sequelize = require('sequelize');
let db = require('../db');

let EducationPlan = require('./EducationPlan');

const PlanControls = db.define('plan_controls', {
	control_id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	id: {
		type: Sequelize.INTEGER,
	},
	module_number: {
		type: Sequelize.INTEGER,
	},
	hours_week: {
		type: Sequelize.INTEGER,
	},
	exams: {
		type: Sequelize.INTEGER,
	},
	credit: {
		type: Sequelize.INTEGER,
	},
	course_work: {
		type: Sequelize.INTEGER,
	},
	сontrol_work: {
		type: Sequelize.INTEGER,
	},
	semester: {
		type: Sequelize.INTEGER,
	},
});

PlanControls.belongsTo(EducationPlan, {
	foreignKey: 'id',
	targetKey: 'id',
});

EducationPlan.hasMany(PlanControls, {
	foreignKey: 'id',
	targetKey: 'id',
});

module.exports = PlanControls;
