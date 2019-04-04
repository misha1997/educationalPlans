let express = require('express');
let router = express.Router();

const SubjectsController = require('../controllers/SubjectsController');

let Subject = new SubjectsController();

router.get('/', Subject.findAll);
router.get('/:id', Subject.findOne);
router.post('/', Subject.create);
router.put('/:id', Subject.update);
router.delete('/:id', Subject.destroy);


module.exports = router;
