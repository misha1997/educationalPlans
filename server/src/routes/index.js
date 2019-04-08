const categories = require('./categories');
const subdivisions = require('./subdivisions');
const subCategories = require('./subCategories');
const asu = require('./asu');
const educationPlan = require('./educationPlan');
const departments = require('./departments');
const educationItem = require('./educationItem');
const users = require('./users');
const login = require('./login');
const refreshTokens = require('./refreshToken');
const subjects = require('./subjects');
const distributionOfHours = require('./distributionOfHours');

const authMiddleware = require('../middleware/auth');

module.exports = function(app){
  app.use('/api/categories', authMiddleware, categories);
  app.use('/api/asu', asu);
  app.use('/api/subdivisions', subdivisions);
  app.use('/api/sub-categories', subCategories);
  app.use('/api/education-plan', educationPlan);
  app.use('/api/departments', departments);
  app.use('/api/education-item', educationItem);
  app.use('/api/users', users);
  app.use('/api/login', login);
  app.use('/api/refresh-tokens', refreshTokens);
  app.use('/api/subjects', subjects);
  app.use('/api/distribution-of-hours', distributionOfHours);
}
