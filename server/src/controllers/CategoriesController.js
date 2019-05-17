const _ = require('lodash');

const Categories = require('../models/Categories');
const SubCategories = require('../models/SubCategories');
const Cycles = require('../models/Cycles');

class CategoriesController {
	index(req, res) {
		Categories.findAll({
			include: [
				{
					model: Cycles,
				},
			],
		})
			.map(el => el.get({ plain: true }))
			.then(response => {
				let category = _.map(response, item => {
					return Object.assign(item, { cycles_id: item.cycles_id });
				});
				res.send(category);
			})
			.catch(err => {
				res.send(err);
			});
	}

	store(req, res) {
		Categories.create(req.body, {
			include: [Cycles],
		})
			.then(response => {
				Categories.findOne({
					where: {
						category_id: response.category_id,
					},
					include: [
						{
							model: Cycles,
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
		Categories.findAll({
			where: { category_id: req.params.id },
		})
			.then(response => {
				res.send(response);
			})
			.catch(err => {
				res.send(err);
			});
	}

	update(req, res) {
		Categories.update(
			{
				name: req.body.data.name,
				credits: req.body.data.credits,
				cycles_id: req.body.data.cycles_id,
			},
			{
				where: {
					category_id: req.params.id,
				},
			},
		)
			.then(categories => {
				res.send(categories);
			})
			.catch(err => {
				res.send(err);
			});
	}

	destroy(req, res) {
		SubCategories.destroy({
			where: {
				category_id: req.params.id,
			},
		})
			.then(() => {
				res.send('SubCategories was successfully deleted');
			})
			.catch(err => {
				res.send(err);
			});
		Categories.destroy({
			where: {
				category_id: req.params.id,
			},
		})
			.then(() => {
				res.send('Categories was successfully deleted');
			})
			.catch(err => {
				res.send(err);
			});
	}
}

module.exports = CategoriesController;
