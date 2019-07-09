const jwt = require('jsonwebtoken');

const Users = require('../models/Users');

const bcrypt = require('bcrypt');

function hashNewPassword(password) {
	const SALT_FACTOR = 8;
	return bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_FACTOR), null);
}

class UsersController {
	findAll(req, res) {
		Users.findAll()
			.then(users => {
				res.send(users);
			})
			.catch(err => {
				res.send(err);
			});
	}

	findOne(req, res) {
		Users.findOne({
			where: {
				user_id: req.params.id,
			},
		})
			.then(users => {
				res.send(users);
			})
			.catch(err => {
				res.send(err);
			});
	}

	destroy(req, res) {
		Users.destroy({
			where: {
				user_id: req.params.id,
			},
		})
			.then(() => {
				res.send('User was successfully deleted');
			})
			.catch(err => {
				res.send(err);
			});
	}

	create(req, res) {
		Users.create(req.body)
			.then(user => {
				res.send({
					user,
				});
			})
			.catch(err => {
				res.send(err);
			});
	}

	update(req, res) {
		const {
			name,
			surname,
			email,
			password,
			role,
			department_id,
		} = req.body.data;
		Users.update(
			{
				name: name,
				surname: surname,
				email: email,
				password: hashNewPassword(password),
				role: role,
				department_id: department_id,
			},
			{
				where: {
					user_id: req.params.id,
				},
			},
		)
			.then(user => {
				res.send({
					user,
				});
			})
			.catch(err => {
				res.send(err);
			});
	}

	login(req, res) {
		const { email, password } = req.body;
		Users.findOne({
			where: {
				email: email,
			},
		})
			.then(async user => {
				if (!user) {
					res.status(401).json({ message: 'User does not exist!' });
				}
				const isValid = await user.comparePassword(password, user.password);
				if (isValid) {
					const token = jwt.sign(
						user.user_id.toString(),
						process.env.JWT_SECRET,
					);
					delete user.password;
					const userJson = user.toJSON();
					res.send({
						user: userJson,
						token: token,
					});
				} else {
					res.status(401).json({ message: 'Invalid credentials!' });
				}
			})
			.catch(err => res.status(500).json({ message: err.message }));
	}
}

module.exports = UsersController;
