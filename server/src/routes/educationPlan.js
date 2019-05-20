let express = require('express');
let router = express.Router();

const EducationPlanController = require('../controllers/EducationPlanController');

let EducationPlan = new EducationPlanController();

router.get('/', EducationPlan.findAll);
router.get('/:id', EducationPlan.findOne);
router.post('/', EducationPlan.create);
router.post('/clone-plan', EducationPlan.clone);
router.post('/send-verify', EducationPlan.sendVerify);
router.post('/verify', EducationPlan.verify);
router.post('/refinement', EducationPlan.refinement);
router.put('/:id', EducationPlan.update);
router.delete('/:id', EducationPlan.destroy);

module.exports = router;
