const Users = require('../models/Users');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt-nodejs');

function hashNewPassword (password) {
  const SALT_FACTOR = 8
  return bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_FACTOR), null)
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
        const token = jwt.sign(user.user_id.toString(), process.env.JWT_SECRET);
        const userJson = user.toJSON()
        res.send({
          user: userJson,
          token: token
        })
      } else {
        res.status(401).json({ message: 'Invalid credentials!' });
      }
    })
    .catch(err => res.status(500).json({ message: err.message }))
  }

  logout (req, res) {
    req.session.destroy();
  }
}

module.exports = UsersController;
