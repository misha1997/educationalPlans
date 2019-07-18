const EducationItem = require('../models/EducationItem');
const SubCategories = require('../models/SubCategories');
const Categories = require('../models/Categories');
const DistributionOfHours = require('../models/DistributionOfHours');
const Cycles = require('../models/Cycles');

class CyclesController {
	index(req, res) {
		Cycles.findAll()
			.then(cycles => {
				res.send(cycles);
			})
			.catch(err => {
				res.send(err);
			});
	}

	show(req, res) {
		Cycles.findAll({
			where: {
				cycles_id: req.params.id,
			},
		})
			.then(cycles => {
				res.send(cycles);
			})
			.catch(err => {
				res.send(err);
			});
	}

	store(req, res) {
		Cycles.create(req.body)
			.then(response => {
				res.send(response);
			})
			.catch(err => {
				res.send(err);
			});
	}

	update(req, res) {
		Cycles.update(
			{
				credits: req.body.data.credits,
				name: req.body.data.name,
			},
			{
				where: {
					cycles_id: req.params.id,
				},
			},
		)
			.then(cycles => {
				res.send(cycles);
			})
			.catch(err => {
				res.send(err);
			});
	}

	async destroy(req, res) {
		let educationItem = await EducationItem.findAll({
			where: {
				cycles_id: req.params.id,
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

		let category = await Categories.findAll({
			where: {
				cycles_id: req.params.id,
			},
		});

		let subCategories = await SubCategories.findAll();

		for (let i = 0; i < subCategories.length; i++) {
			for (let j = 0; j < category.length; j++) {
				if (subCategories[i].category_id == category[j].category_id) {
					SubCategories.destroy({
						where: {
							category_id: category[j].category_id,
						},
					});
				}
			}
		}

		res.send();

		EducationItem.destroy({
			where: {
				cycles_id: req.params.id,
			},
		})
			.then(() => {
				res.send('Educationitem was successfully deleted');
			})
			.catch(err => {
				res.send(err);
			});

		Categories.destroy({
			where: {
				cycles_id: req.params.id,
			},
		})
			.then(() => {
				res.send('Categories was successfully deleted');
			})
			.catch(err => {
				res.send(err);
			});

		Cycles.destroy({
			where: {
				cycles_id: req.params.id,
			},
		})
			.then(() => {
				res.send('Cycles was successfully deleted');
			})
			.catch(err => {
				res.send(err);
			});
	}
}

module.exports = CyclesController;
