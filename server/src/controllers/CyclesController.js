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

	destroy(req, res) {
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
