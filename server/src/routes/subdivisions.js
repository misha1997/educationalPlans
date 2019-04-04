let express = require('express');
let router = express.Router();

const SubDivisionController = require('../controllers/SubDivisionController');

let SubDivision = new SubDivisionController();

router.get('/', SubDivision.findAll);
router.get('/:id', SubDivision.findOne);
router.post('/', SubDivision.create);
router.put('/:id', SubDivision.update);
router.delete('/:id', SubDivision.destroy);

module.exports = router;
