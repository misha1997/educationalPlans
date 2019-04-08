let express = require('express');
let router = express.Router();

const SubjectsController = require('../controllers/SubjectsController');

let Subject = new SubjectsController();

router.get('/', Subject.index);
router.post('/', Subject.store);
router.get('/:id', Subject.show);
router.put('/:id', Subject.update);
router.delete('/:id', Subject.destroy);


module.exports = router;
