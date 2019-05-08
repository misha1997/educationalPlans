let express = require('express');
let router = express.Router();

const DistributionOfHoursController = require('../controllers/DistributionOfHoursController');

let DistributionOfHours = new DistributionOfHoursController();

router.post('/', DistributionOfHours.index);
router.post('/store', DistributionOfHours.store);
router.delete('/:id', DistributionOfHours.delete);

module.exports = router;
