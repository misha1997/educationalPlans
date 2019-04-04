let express = require('express');
let router = express.Router();

const CategoriesController = require('../controllers/CategoriesController');

let Category = new CategoriesController();

router.get('/', Category.findAll);
router.get('/:id', Category.findOne);
router.post('/', Category.create);
router.put('/:id', Category.update);
router.delete('/:id', Category.destroy);


module.exports = router;
