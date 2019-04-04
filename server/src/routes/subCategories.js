let express = require('express');
let router = express.Router();

const SubCategoriesController = require('../controllers/SubCategoriesController');

let SubCategory = new SubCategoriesController();

router.get('/', SubCategory.findAll);
router.get('/:id', SubCategory.findOne);
router.post('/', SubCategory.create);
router.put('/:id', SubCategory.update);
router.delete('/:id', SubCategory.destroy);

module.exports = router;
