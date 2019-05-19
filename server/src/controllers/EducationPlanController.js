const _ = require('lodash');

const EducationPlan = require('../models/EducationPlan');
const Departmens = require('../models/Departments');
const Subdivision = require('../models/Subdivision');
const EducationItem = require('../models/EducationItem');
const PlanControls = require('../models/PlanControls');
const DistributionOfHours = require('../models/DistributionOfHours');
const DistributionOfControls = require('../models/DistributionOfControls');

class EducationPlanController {
	findAll(req, res) {
		EducationPlan.findAll({
			include: [
				{
					model: Departmens,
					include: [
						{
							model: Subdivision,
						},
					],
				},
			],
		})
			.map(el => el.get({ plain: true }))
			.then(response => {
				let educationPlans = _.map(response, item => {
					return Object.assign(item, {
						subdivision_id: item.department.subdivision.subdivision_id,
					});
				});
				res.send(educationPlans);
			})
			.catch(err => {
				res.send(err);
			});
	}

	findOne(req, res) {
		EducationPlan.findAll({
			include: [
				{
					model: Departmens,
					include: [
						{
							model: Subdivision,
						},
					],
				},
			],
			where: { id: req.params.id },
		})
			.map(el => el.get({ plain: true }))
			.then(response => {
				let educationPlans = _.map(response, item => {
					return Object.assign(item, {
						subdivision_id: item.department.subdivision.subdivision_id,
					});
				});
				res.send(educationPlans);
			})
			.catch(err => {
				res.send(err);
			});
	}

	async clone(req, res) {
		const educationPlan = await EducationPlan.findOne({
			where: {
				id: req.body.id,
			},
		});
		const creareEducationPlan = await EducationPlan.create({
			user_id: req.body.user_id,
			department_id: educationPlan.department_id,
			name: educationPlan.name + " - клон",
			status: 'cloned',
			year: educationPlan.year,
			created_at: new Date(),
		});

		let planControls = await PlanControls.findAll()
		for (let i = 0; i < planControls.length; i++) {
			planControls.controls = planControls[i].dataValues;
		}
		await PlanControls.create({
			id : creareEducationPlan.id,
			module_number: planControls.controls.module_number,
			hours_week : planControls.controls.hours_week,
			exams : planControls.controls.exams,
			credit : planControls.controls.credit,
			course_work : planControls.controls.course_work
		});

		let educationItem = await EducationItem.findAll({
			where: {
				education_plans_id : educationPlan.id
			}
		})

		var newEducationItemId = [];

		for (let i = 0; i < educationItem.length; i++) {
			var createEducationItem = await EducationItem.create({
				sub_category_id : educationItem[i].sub_category_id,
				category_id : educationItem[i].category_id,
				cycles_id : educationItem[i].cycles_id,
				education_plans_id : creareEducationPlan.id,
				subject_id : educationItem[i].subject_id,
				credits : educationItem[i].credits,
				lectures : educationItem[i].lectures,
				laboratories : educationItem[i].laboratories,
				choice : educationItem[i].choice
			})
			newEducationItemId.push(createEducationItem.education_item_id)
		}

		let distributionOfHours = await DistributionOfHours.findAll()

		for(let i = 0; i < distributionOfHours.length; i++) {
			for (let j = 0; j < educationItem.length; j++) {
				if(distributionOfHours[i].education_item_id == educationItem[j].education_item_id) {
					DistributionOfHours.create({
						education_item_id : newEducationItemId[j],
						module_number : distributionOfHours[i].module_number,
						value : distributionOfHours[i].value
					})
				}
			}
		}

		let distributionOfControls = await DistributionOfControls.findAll()

		for(let i = 0; i < distributionOfControls.length; i++) {
			for (let j = 0; j < educationItem.length; j++) {
				if(distributionOfControls[i].education_item_id == educationItem[j].education_item_id) {
					DistributionOfControls.create({
						education_item_id : newEducationItemId[j],
						exams : distributionOfControls[i].exams,
						credit : distributionOfControls[i].credit,
						individual_tasks : distributionOfControls[i].individual_tasks
					})
				}
			}
		}
		res.send();
	}

	store(req, res) {
		req.body.created_at = new Date();
		EducationPlan.create(req.body, {
			include: [Departmens],
		})
			.then(response => {
				EducationPlan.findOne({
					where: {
						id: response.id,
					},
					include: [
						{
							model: Departmens,
						},
					],
				})
					.then(response => {
						res.send(response);
					})
					.catch(err => {
						res.send(err);
					});
			})
			.catch(err => {
				res.send(err);
			});
	}

	update(req, res) {
		EducationPlan.update(
			{
				name: req.body.data.name,
				department_id: req.body.data.department_id,
				year: req.body.data.year,
			},
			{
				where: {
					id: req.params.id,
				},
			},
		)
			.then(education_planes => {
				res.send(education_planes);
			})
			.catch(err => {
				res.send(err);
			});
	}

	destroy(req, res) {
		EducationItem.destroy({
			where: {
				education_plans_id: req.params.id,
			},
		})
			.then(() => {
				res.send('Educationitem was successfully deleted');
			})
			.catch(err => {
				res.send(err);
			});

		EducationPlan.destroy({
			where: {
				id: req.params.id,
			},
		})
			.then(() => {
				res.send('EducationPlan was successfully deleted');
			})
			.catch(err => {
				res.send(err);
			});
	}
}

module.exports = EducationPlanController;
