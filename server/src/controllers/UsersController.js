const Users = require('../models/Users');
const Token = require('../models/Token');
const jwt = require('jsonwebtoken');
const authHelper = require('../helpers/authHelper');

require('dotenv').config();
const bcrypt = require('bcrypt-nodejs');

function hashNewPassword (password) {
  const SALT_FACTOR = 8
  return bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_FACTOR), null)
}

updateTokens = (userId) => {
  const accessToken = authHelper.generateAccessToken(userId);
  const refreshToken = authHelper.generateRefreshToken();

  return authHelper.replaceDbRefreshToken(refreshToken.id, userId)
    .then(() => ({
      accessToken,
      refreshToken: refreshToken.token
    }));
}

class UsersController{

  findAll(req, res){
    Users.findAll().then((users) => {
      res.send(users);
    }).catch((err) => {
      res.send(err);
    });
  }

  destroy(req, res){
    Users.destroy({
      where: {
        user_id: req.params.id
      }
    }).then(() => {
      res.send("User was successfully deleted");
    }).catch((err) => {
      res.send(err);
    })
  }

  create(req,res){
    Users.create(req.body)
    .then((user) => {
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwt.sign(user.user_id.toString(), process.env.JWT_SECRET)
      })
    })
    .catch(err => res.status(500).json({ message: err.message }))
  }

  update(req, res){
    const {name, surname, email, password, role} = req.body
    Users.update({
      name: name,
      surname: surname,
      email: email,
      password: hashNewPassword(password),
      role: role
    }, {
      where: {
        user_id: req.params.id
      }
    })
    .then((user) => {
      res.send({
        user
      })
    })
    .catch(err => res.status(500).json({ message: err.message }))
  }

  login (req, res) {
    const { email, password } = req.body;
    Users.findOne({ 
      where: { 
        email: email 
      } 
    })
    .then((user) => {
      if(!user) {
        res.status(401).json({ message: 'User does not exist!' });
      }
      const isValid = bcrypt.compareSync(password, user.password);
      if (isValid) {
        updateTokens(user.user_id).then(tokens => res.json(tokens));
      } else {
        res.status(400).json({ message: 'invalid credentials' });
      }
    })
    .catch(err => res.status(500).json({ message: err.message }))
  }

  refreshToken (req, res) {
    const { refreshToken } = req.body;
    let payload;
    try {
      payload = jwt.verify(refreshToken, process.env.JWT_SECRET)
      if (payload.type !== 'refresh') {
        res.status(400).json({ message: 'invalid token' });
        return;
      }
    } catch (e) {
      if (e instanceof jwt.TokenExpiredError) {
        res.status(400).json({ message: 'token expired' });
        return;
      } else if (e instanceof jwt.JsonWebTokenError) {
        res.status(400).json({ message: 'invalid token' });
        return;
      }
    }

      Token.findAll({
        where: {
          tokenId: payload.id
        }
      })
      .then((token) => {
        Object.assign({}, token);
        console.log(token)
        if (token == null) {
          throw new Error('invalid token');
        }
        return updateTokens(token.userId);
      })
      .then(tokens => res.json(tokens))
      .catch(err => res.status(400).json({ message: err.message }));
  }

  logout (req, res) {
    req.session.destroy();
  }
}

module.exports = UsersController;
