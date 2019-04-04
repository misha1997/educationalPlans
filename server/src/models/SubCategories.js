const Sequelize = require('sequelize');
let db = require('../../db');

let Categories = require('./Categories');

const SubCategories = db.define('sub_categories', {
  sub_category_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  category_id: {
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING,
    required: true
  }
});

SubCategories.belongsTo(Categories, {
  foreignKey: "category_id",
  targetKey: "category_id"
});

Categories.hasMany(SubCategories, {
  foreignKey: "category_id",
  targetKey: "category_id"
});

module.exports = SubCategories;

