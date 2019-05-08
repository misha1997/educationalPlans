let express = require('express');
let router = express.Router();

const DistributionOfControlsController = require('../controllers/DistributionOfControlsController');

let DistributionOfControls = new DistributionOfControlsController();

router.get('/:id', DistributionOfControls.findOne);
router.post('/', DistributionOfControls.create);
router.delete('/:id', DistributionOfControls.delete);

module.exports = router;
