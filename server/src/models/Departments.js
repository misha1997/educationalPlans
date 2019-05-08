const Sequelize = require('sequelize');
let db = require('../db');

let Subdivision = require('../models/Subdivision')

const Departments = db.define('departments', {
    department_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  subdivision_id: {
    type: Sequelize.INTEGER
  },
  api_id: {
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING,
    required: true
  }
});

Departments.belongsTo(Subdivision, {
  foreignKey: "subdivision_id",
  targetKey: "subdivision_id"
});

Subdivision.hasMany(Departments, {
  foreignKey: "subdivision_id",
  targetKey: "subdivision_id"
});


module.exports = Departments;

