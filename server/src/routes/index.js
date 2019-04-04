let categories = require('./categories');
let subdivisions = require('./subdivisions');
let subCategories = require('./subCategories');
let asu = require('./asu');
let educationPlan = require('./educationPlan');
let departments = require('./departments');
let educationItem = require('./educationItem');
let users = require('./users');
let login = require('./login');
let logout = require('./logout');
let subjects = require('./subjects');
let distributionOfHours = require('./distributionOfHours');
let authMiddleware = require('../middleware/auth');

module.exports = function(app){
  
  app.use('/categories', authMiddleware, categories);
  app.use('/asu', asu);
  app.use('/subdivisions', authMiddleware, subdivisions);
  app.use('/sub-categories', authMiddleware, subCategories);
  app.use('/education-plan', authMiddleware, educationPlan);
  app.use('/departments', authMiddleware, departments);
  app.use('/education-item', authMiddleware, educationItem);
  app.use('/users', authMiddleware, users);
  app.use('/login', login);
  app.use('/logout', logout);
  app.use('/subjects', authMiddleware, subjects);
  app.use('/distribution-of-hours', distributionOfHours);
}
