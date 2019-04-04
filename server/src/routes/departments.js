let express = require('express');
let router = express.Router();

const DepartmentsController = require('../controllers/DepartmentsController');

let Department = new DepartmentsController();

router.get('/', Department.findAll);
router.get('/:id', Department.findOne);
router.post('/', Department.create);
router.put('/:id', Department.update);
router.delete('/:id', Department.destroy);

module.exports = router;
