let express = require('express');
let router = express.Router();

const SubDivisionController = require('../controllers/SubDivisionController');

let SubDivision = new SubDivisionController();

router.get('/', SubDivision.index);
router.post('/', SubDivision.create);
router.get('/:id', SubDivision.show);
router.put('/:id', SubDivision.update);
router.delete('/:id', SubDivision.destroy);

module.exports = router;
