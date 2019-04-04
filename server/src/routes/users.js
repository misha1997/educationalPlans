let express = require('express');
let router = express.Router();

const UsersController = require('../controllers/UsersController');

let User = new UsersController();

router.get('/', User.findAll);
router.post('/', User.create);
router.put('/:id', User.update);
router.delete('/:id', User.destroy);

module.exports = router;
