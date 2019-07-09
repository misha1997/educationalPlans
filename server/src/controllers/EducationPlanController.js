const _ = require('lodash');

const EducationPlan = require('../models/EducationPlan');
const Departmens = require('../models/Departments');
const Subdivision = require('../models/Subdivision');
const EducationItem = require('../models/EducationItem');
const PlanControls = require('../models/PlanControls');
const DistributionOfHours = require('../models/DistributionOfHours');

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
			order: [['id', 'ASC']],
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
			name: educationPlan.name + ' - клон',
			status: 'cloned',
			year: educationPlan.year,
			created_at: new Date(),
			qualification: educationPlan.qualification,
			discipline: educationPlan.discipline,
			specialty: educationPlan.specialty,
			specialization: educationPlan.specialization,
			educational_program: educationPlan.educational_program,
			educational_level: educationPlan.educational_level,
			form_study: educationPlan.form_study,
			training_period: educationPlan.training_period,
		});

		let planControls = await PlanControls.findAll();

		if (planControls.length > 0) {
			for (let i = 0; i < planControls.length; i++) {
				await PlanControls.create({
					id: creareEducationPlan.id,
					module_number: planControls[i].module_number,
					hours_week: planControls[i].hours_week,
					exams: planControls[i].exams,
					credit: planControls[i].credit,
					course_work: planControls[i].course_work,
					semester: planControls[i].semester,
				});
			}
		}

		let educationItem = await EducationItem.findAll({
			where: {
				education_plans_id: educationPlan.id,
			},
		});

		var newEducationItemId = [];

		for (let i = 0; i < educationItem.length; i++) {
			var createEducationItem = await EducationItem.create({
				sub_category_id: educationItem[i].sub_category_id,
				category_id: educationItem[i].category_id,
				cycles_id: educationItem[i].cycles_id,
				education_plans_id: creareEducationPlan.id,
				subject_id: educationItem[i].subject_id,
				credits: educationItem[i].credits,
				lectures: educationItem[i].lectures,
				laboratories: educationItem[i].laboratories,
				choice: educationItem[i].choice,
				fixed: educationItem[i].fixed,
			});
			newEducationItemId.push(createEducationItem.education_item_id);
		}

		let distributionOfHours = await DistributionOfHours.findAll();

		for (let i = 0; i < distributionOfHours.length; i++) {
			for (let j = 0; j < educationItem.length; j++) {
				if (
					distributionOfHours[i].education_item_id ==
					educationItem[j].education_item_id
				) {
					DistributionOfHours.create({
						education_item_id: newEducationItemId[j],
						module_number: distributionOfHours[i].module_number,
						value: distributionOfHours[i].value,
						form_control: distributionOfHours[i].form_control,
						individual_tasks: distributionOfHours[i].individual_tasks,
						semester: distributionOfHours[i].semester,
					});
				}
			}
		}

		res.send();
	}

	sendVerify(req, res) {
		EducationPlan.update(
			{
				status: 'on verification',
			},
			{
				where: {
					id: req.body.id,
				},
			},
		).then(() => {
			res.send();
		});
	}

	verify(req, res) {
		EducationPlan.update(
			{
				status: 'verified',
			},
			{
				where: {
					id: req.body.id,
				},
			},
		).then(() => {
			res.send();
		});
	}

	refinement(req, res) {
		EducationPlan.update(
			{
				status: 'on refinement',
			},
			{
				where: {
					id: req.body.id,
				},
			},
		).then(() => {
			res.send();
		});
	}

	create(req, res) {
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
				qualification: req.body.data.qualification,
				discipline: req.body.data.discipline,
				specialty: req.body.data.specialty,
				specialization: req.body.data.specialization,
				educational_program: req.body.data.educational_program,
				educational_level: req.body.data.educational_level,
				form_study: req.body.data.form_study,
				training_period: req.body.data.training_period,
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

	async destroy(req, res) {
		let educationItem = await EducationItem.findAll({
			where: {
				education_plans_id: req.params.id,
			},
		});

		let distributionOfHours = await DistributionOfHours.findAll();

		for (let i = 0; i < distributionOfHours.length; i++) {
			for (let j = 0; j < educationItem.length; j++) {
				if (
					distributionOfHours[i].education_item_id ==
					educationItem[j].education_item_id
				) {
					DistributionOfHours.destroy({
						where: {
							education_item_id: educationItem[j].education_item_id,
						},
					});
				}
			}
		}

		res.send();

		EducationItem.destroy({
			where: {
				education_plans_id: req.params.id,
			},
		});
		PlanControls.destroy({
			where: {
				id: req.params.id,
			},
		});
		EducationPlan.destroy({
			where: {
				id: req.params.id,
			},
		});
	}
}

module.exports = EducationPlanController;
