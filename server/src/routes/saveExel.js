let express = require('express');
let router = express.Router();

const SavePlanController = require('../controllers/SavePlanController');

let SavePlan = new SavePlanController();

router.post('/', SavePlan.save);

module.exports = router;
