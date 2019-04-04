const Sequelize = require('sequelize');
let db = require('../../db');

const Categories = db.define('categories', {
  category_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Categories;

