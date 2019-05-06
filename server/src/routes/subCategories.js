let express = require('express');
let router = express.Router();

const SubCategoriesController = require('../controllers/SubCategoriesController');

let SubCategory = new SubCategoriesController();

router.get('/', SubCategory.index);
router.post('/', SubCategory.store);
router.get('/:id', SubCategory.show);
router.put('/:id', SubCategory.update);
router.delete('/:id', SubCategory.destroy);

module.exports = router;
