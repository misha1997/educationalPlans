let express = require('express');
let router = express.Router();

const PlanControlsController = require('../controllers/PlanControlsController');

let PlanControls = new PlanControlsController();

router.get('/:id', PlanControls.index);

module.exports = router;
