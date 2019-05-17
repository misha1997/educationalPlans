const express = require('express');
const router = express.Router();

const CyclesController = require('../controllers/CyclesController');
const Cycles = new CyclesController();

router.get('/', Cycles.index);
router.post('/', Cycles.store);
router.get('/:id', Cycles.show);
router.put('/:id', Cycles.update);
router.delete('/:id', Cycles.destroy);

module.exports = router;
