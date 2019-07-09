const db = require('../../db/index');
const Promise = require('bluebird');

const Cycles = require('../../models/Cycles');
const Categories = require('../../models/Categories');
const SubCategories = require('../../models/SubCategories');
const Subdivisions = require('../../models/Subdivision');
const Departments = require('../../models/Departments');
const Subjects = require('../../models/Subjects');
const Users = require('../../models/Users');

const cycles = require('./Cycles.json');
const categories = require('./Categories.json');
const subCategories = require('./SubCategories.json');
const subdivisions = require('./Subdivision.json');
const departments = require('./Departments.json');
const subjects = require('./Subjects.json');
const users = require('./Users.json');

db.sync().then(async function() {
	await Promise.all(
		cycles.map(cycle => {
			Cycles.create(cycle);
		}),
	);

	await Promise.all(
		categories.map(category => {
			Categories.create(category);
		}),
	);

	await Promise.all(
		subCategories.map(subCategory => {
			SubCategories.create(subCategory);
		}),
	);

	await Promise.all(
		subdivisions.map(subdivision => {
			Subdivisions.create(subdivision);
		}),
	);

	await Promise.all(
		departments.map(department => {
			Departments.create(department);
		}),
	);

	await Promise.all(
		subjects.map(subject => {
			Subjects.create(subject);
		}),
	);

	await Promise.all(
		users.map(user => {
			Users.create(user);
		}),
	);
	
});
