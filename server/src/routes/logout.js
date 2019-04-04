let express = require('express');
let router = express.Router();

const UsersController = require('../controllers/UsersController');

let User = new UsersController();

router.post('/', User.logout);

module.exports = router;
