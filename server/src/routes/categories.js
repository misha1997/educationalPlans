const express = require('express');
const router = express.Router();

const CategoriesController = require('../controllers/CategoriesController');
const Category = new CategoriesController();

router.get('/', Category.index);
router.post('/', Category.store);
router.get('/:id', Category.show);
router.put('/:id', Category.update);
router.delete('/:id', Category.destroy);

module.exports = router;
