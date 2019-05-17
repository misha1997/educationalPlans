const Sequelize = require('sequelize');
let db = require('../db');
const EducationItem = require('./EducationItem');

const DistributionOfControls = db.define('distribution_of_controls', {
	distribution_of_controls_id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoincrement: true,
	},
	education_item_id: {
		type: Sequelize.INTEGER,
	},
	exams: {
		type: Sequelize.STRING,
	},
	credit: {
		type: Sequelize.STRING,
	},
	individual_tasks: {
		type: Sequelize.STRING,
	},
});

DistributionOfControls.belongsTo(EducationItem, {
	foreignKey: 'education_item_id',
	targetKey: 'education_item_id',
});

EducationItem.hasMany(DistributionOfControls, {
	foreignKey: 'education_item_id',
	targetKey: 'education_item_id',
});

module.exports = DistributionOfControls;
