let express = require('express');
let router = express.Router();

const AsuApiController = require('../controllers/AsuApiController');

router.post('/', AsuApiController.getAsuData);

module.exports = router;
