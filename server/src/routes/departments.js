let express = require('express');
let router = express.Router();

const DepartmentsController = require('../controllers/DepartmentsController');

let Department = new DepartmentsController();

router.get('/', Department.index);
router.post('/', Department.store);
router.get('/:id', Department.show);
router.put('/:id', Department.update);
router.delete('/:id', Department.destroy);

module.exports = router;
