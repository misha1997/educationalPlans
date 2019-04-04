let express = require('express');
let router = express.Router();

const EducationItemController = require('../controllers/EducationItemController');

let EducationItem = new EducationItemController();

router.post('/', EducationItem.findAll);
router.post('/store', EducationItem.create);
router.put('/update-learning-plan/:id', EducationItem.updateLearningPlan);
router.delete('/:id', EducationItem.destroy);

module.exports = router;
