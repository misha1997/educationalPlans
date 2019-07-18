const Sequelize = require('sequelize');
require('dotenv').config({ path: __dirname + '/./../.env' });

const db = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASS,
	{
		host: process.env.DB_HOST,
		dialect: 'mysql',
		port: process.env.DB_POST,
		//logging: (process.env.NODE_ENV === 'development'),
		define: {
			timestamps: false,
			freezeTableName: true,
		},
	},
);

module.exports = db;
