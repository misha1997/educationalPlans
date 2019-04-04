let express = require('express');
let router = express.Router();

const DistributionOfHoursController = require('../controllers/DistributionOfHoursController');

let DistributionOfHours = new DistributionOfHoursController();

router.post('/', DistributionOfHours.findAll);
router.post('/store', DistributionOfHours.store);

module.exports = router;
