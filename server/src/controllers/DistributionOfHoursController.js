const _ = require('lodash');

const DistributionOfHours = require('../models/DistributionOfHours');

class DistributionOfHoursController {
	index(req, res) {
		DistributionOfHours.findAll({
			where: {
				education_item_id: req.body.id,
			},
		})
			.then(response => {
				res.send(response);
			})
			.catch(err => {
				res.send(err);
			});
	}

	store(req, res) {
		let seriesRequests = async (req, res) => {
			try {
				await DistributionOfHours.destroy({
					where: { education_item_id: req.body.educationItemId },
				});
				let response = await DistributionOfHours.bulkCreate(req.body.data);

				res.send(response);
			} catch (err) {
				res.send(err);
			}
		};

		seriesRequests(req, res);
	}

	delete(req, res) {
		DistributionOfHours.destroy({
			where: {
				education_item_id: req.params.id,
			},
		})
			.then(() => {
				res.send('DistributionOfHours was successfully deleted');
			})
			.catch(err => {
				res.send(err);
			});
	}
}

module.exports = DistributionOfHoursController;
