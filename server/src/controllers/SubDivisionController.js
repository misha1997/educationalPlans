const Subdivision = require('../models/Subdivision');

class SubDivisionController {
	index(req, res) {
		Subdivision.findAll()
			.then(response => {
				res.send(response);
			})
			.catch(err => {
				res.send(err);
			});
	}

	create(req, res) {
		Subdivision.create(req.body)
			.then(response => {
				res.send(response);
			})
			.catch(err => {
				res.send(err);
			});
	}

	show(req, res) {
		Subdivision.findAll({
			where: {
				subdivision_id: req.params.id,
			},
		})
			.then(subdivision => {
				res.send(subdivision);
			})
			.catch(err => {
				res.send(err);
			});
	}

	update(req, res) {
		Subdivision.update(
			{
				name: req.body.data.name,
			},
			{
				where: {
					subdivision_id: req.params.id,
				},
			},
		)
			.then(subdivision => {
				res.send(subdivision);
			})
			.catch(err => {
				res.send(err);
			});
	}

	destroy(req, res) {
		Subdivision.destroy({
			where: {
				subdivision_id: req.params.id,
			},
		})
			.then(() => {
				res.send('Subdivision was deleted');
			})
			.catch(err => {
				res.send(err);
			});
	}
}

module.exports = SubDivisionController;
