const Sequelize = require('sequelize');
let db = require('../db');

const Subdivision = db.define('subdivisions',{
  subdivision_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  api_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Subdivision;
