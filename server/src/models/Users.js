const Sequelize = require('sequelize');
let db = require('../db');

const bcrypt = require('bcrypt');

const hashPassword = async (user, options) => {
	if (!user.changed('password')) return;

	const SALT_FACTOR = parseInt(process.env.ROUND_SALT) || 8;
	const hash = await bcrypt.hash(user.password, SALT_FACTOR);
	return await user.setDataValue('password', hash);
};

const Users = db.define(
	'users',
	{
		user_id: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		surname: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		role: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	},
	{
		hooks: {
			beforeCreate: hashPassword,
			beforeUpdate: hashPassword,
		},
	},
);

Users.prototype.comparePassword = async function(password) {
	return await bcrypt.compare(password, this.password);
};

module.exports = Users;
