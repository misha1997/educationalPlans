const db = require('../../db/index');
const Promise = require('bluebird')

const Categories = require('../../src/models/Categories')
const Subdivisions = require('../../src/models/Subdivision')
const Departments = require('../../src/models/Departments')
const SubCategories = require('../../src/models/SubCategories')
const EducationPlan = require('../../src/models/EducationPlan')
const Subjects = require('../../src/models/Subjects')
const Users = require('../../src/models/Users')
  
const categories = require('./Categories.json')
const subdivisions = require('./Subdivision.json')
const departments = require('./Departments.json')
const subCategories = require('./SubCategories.json')
const educationPlan = require('./EducationPlan.json')
const subjects = require('./Subjects.json')
const users = require('./Users.json')

db.sync().then(async function () {
    await Promise.all(
        categories.map(category => {
            Categories.create(category)
        })
    )

    await Promise.all(
        subdivisions.map(subdivision => {
            Subdivisions.create(subdivision)
        })
    )

    await Promise.all(
        departments.map(department => {
            Departments.create(department)
        })
    )

    await Promise.all(
        subCategories.map(subCategory => {
            SubCategories.create(subCategory)
        })
    )

    await Promise.all(
        users.map(user => {
            Users.create(user)
        })
    )

    await Promise.all(
        educationPlan.map(educationPlan => {
            EducationPlan.create(educationPlan)
        })
    )

    await Promise.all(
        subjects.map(subject => {
            Subjects.create(subject)
        })
    )

})