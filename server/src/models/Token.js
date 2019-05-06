const Sequelize = require('sequelize')
let db = require('../db')

const Token = db.define('token', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tokenId: {
    type: Sequelize.STRING
  },
  userId: {
    type: Sequelize.INTEGER
  }
})

module.exports = Token;

