let express = require('express');
let router = express.Router();

const EducationPlanController = require('../controllers/EducationPlanController');

let EducationPlan = new EducationPlanController();

router.get('/', EducationPlan.findAll);
router.get('/:id', EducationPlan.findOne);
router.post('/', EducationPlan.store);
router.put('/:id', EducationPlan.update);
router.delete('/:id', EducationPlan.destroy);

module.exports = router;
