let express = require('express');
let router = express.Router();

const EducationItemController = require('../controllers/EducationItemController');

let EducationItem = new EducationItemController();

router.post('/', EducationItem.save);

module.exports = router;
