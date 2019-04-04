const Sequelize = require('sequelize');
let db = require('../../db');

const DistributionOfHours = db.define('distribution_of_hours',{
  distribution_of_hours_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoincrement: true
  },
  education_item_id: {
    type: Sequelize.INTEGER,
    unique: 'compositeIndex'
  },
  module_number: {
    type: Sequelize.INTEGER,
    unique: 'compositeIndex'
  },
  value: {
    type: Sequelize.INTEGER
  }
});

module.exports = DistributionOfHours;
