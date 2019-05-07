let express = require('express');
let router = express.Router();

const DistributionOfControlsController = require('../controllers/DistributionOfControlsController');

let DistributionOfControls = new DistributionOfControlsController();

router.post('/', DistributionOfControls.index);
router.post('/store', DistributionOfControls.store);

module.exports = router;
