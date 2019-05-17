const Sequelize = require('sequelize');
let db = require('../db');

let Cycles = require('./Cycles');

const Categories = db.define('categories', {
  category_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cycles_id: {
    type: Sequelize.INTEGER
  }, 
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  credits: {
    type: Sequelize.INTEGER
  },
});

Categories.belongsTo(Cycles, {
  foreignKey: "cycles_id",
  targetKey: "cycles_id"
});

Cycles.hasMany(Categories, {
  foreignKey: "cycles_id",
  targetKey: "cycles_id"
});

module.exports = Categories;

