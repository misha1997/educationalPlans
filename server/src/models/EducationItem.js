const Sequelize = require('sequelize');
let db = require('../db');

const Subjects = require('./Subjects');
const SubCategories = require('./SubCategories');
const DistributionOfHours = require('./DistributionOfHours');

const EducationItem = db.define('education_items',{
  education_item_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  sub_category_id: {
    type: Sequelize.INTEGER
  },
  education_plans_id: {
    type: Sequelize.INTEGER
  },
  subject_id: {
    type: Sequelize.INTEGER
  },
  credits: {
    type: Sequelize.INTEGER
  },
  lectures: {
    type: Sequelize.INTEGER
  },
  practice: {
    type: Sequelize.INTEGER
  },
  laboratories: {
    type: Sequelize.INTEGER
  }
});

EducationItem.belongsTo(Subjects,{
  foreignKey: "subject_id",
  targetKey: "subject_id"
});

EducationItem.belongsTo(SubCategories,{
  foreignKey: "sub_category_id",
  targetKey: "sub_category_id"
});

SubCategories.hasMany(EducationItem,{
  foreignKey: "sub_category_id",
  targetKey: "sub_category_id"
});

EducationItem.hasMany(DistributionOfHours, {
  foreignKey: "education_item_id",
  targetKey: "education_item_id"
});


module.exports = EducationItem;
