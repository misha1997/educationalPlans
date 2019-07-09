const _ = require('lodash');

const EducationItem = require('../models/EducationItem');
const SubCategories = require('../models/SubCategories');
const Categories = require('../models/Categories');
const DistributionOfHours = require('../models/DistributionOfHours');

class SubCategoriesController {
	index(req, res) {
		SubCategories.findAll({
			include: [
				{
					model: Categories,
				},
			],
		})
			.map(el => el.get({ plain: true }))
			.then(response => {
				let sub_category = _.map(response, item => {
					return Object.assign(item, { category_id: item.category_id });
				});
				res.send(sub_category);
			})
			.catch(err => {
				res.send(err);
			});
	}

	store(req, res) {
		SubCategories.create(req.body, {
			include: [Categories],
		})
			.then(response => {
				SubCategories.findOne({
					where: {
						sub_category_id: response.sub_category_id,
					},
					include: [
						{
							model: Categories,
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

	show(req, res) {
		SubCategories.findAll({
			where: { sub_category_id: req.params.id },
		})
			.then(response => {
				res.send(response);
			})
			.catch(err => {
				res.send(err);
			});
	}

	update(req, res) {
		SubCategories.update(
			{
				name: req.body.data.name,
				credits: req.body.data.credits,
				category_id: req.body.data.category_id,
			},
			{
				where: {
					sub_category_id: req.params.id,
				},
			},
		)
			.then(subcategories => {
				res.send(subcategories);
			})
			.catch(err => {
				res.send(err);
			});
	}

	async destroy(req, res) {
		let educationItem = await EducationItem.findAll({
			where: {
				sub_category_id: req.params.id,
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
				sub_category_id: req.params.id,
			},
		})
			.then(() => {
				res.send('Educationitem was successfully deleted');
			})
			.catch(err => {
				res.send(err);
			});

		SubCategories.destroy({
			where: {
				sub_category_id: req.params.id,
			},
		})
			.then(() => {
				res.send('SubCategories was successfully deleted');
			})
			.catch(err => {
				res.send(err);
			});
	}
}

module.exports = SubCategoriesController;
