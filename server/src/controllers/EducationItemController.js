let _ = require('lodash');

const EducationItem = require('../models/EducationItem');
const Subjects = require('../models/Subjects');
const Categories = require('../models/Categories');
const Cycle = require('../models/Cycles');
const SubCategories = require('../models/SubCategories');
const DistributionOfHours = require('../models/DistributionOfHours');

class EducationItemController {
	index(req, res) {
		let seriesRequests = async (req, res) => {
			try {
				let data = await Cycle.findAll({
					include: [
						{
							model: Categories,
							include: [
								{
									model: SubCategories,
									order: [
										['name', 'ASC'],
									],
								},
							],
							order: [
								['name', 'ASC'],
							],
						},
					],
					order: [
						['name', 'ASC'],
					],
				});
				let educationItems = await EducationItem.findAll({
					where: {
						education_plans_id: req.body.id,
					},
					include: [{ model: Subjects }, { model: DistributionOfHours }],
				});

				res.send({
					data: data,
					educationItems: educationItems,
				});
			} catch (err) {
				res.send(err);
			}
		};
		seriesRequests(req, res);
	}

	findOne(req, res) {
		EducationItem.findAll()
			.then(response => {
				res.send(response);
			})
			.catch(err => {
				res.send(err);
			});
	}

	store(req, res) {
		EducationItem.create(req.body)
			.then(response => {
				EducationItem.findOne({
					where: {
						education_item_id: response.education_item_id,
					},
					include: {
						model: Subjects,
					},
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

	updateLearningPlan(req, res) {
		EducationItem.update(
			{
				lectures: parseInt(req.body.lectures),
				laboratories: parseInt(req.body.laboratories),
			},
			{
				where: {
					education_item_id: req.params.id,
				},
			},
		)
			.then(response => {
				EducationItem.findOne({
					where: {
						education_item_id: req.params.id,
					},
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

	destroy(req, res) {
		EducationItem.destroy({
			where: {
				education_item_id: req.params.id,
			},
		})
			.then(() => {
				res.send('Education item was successfully deleted');
			})
			.catch(err => {
				res.send(err);
			});
	}
}

module.exports = EducationItemController;
