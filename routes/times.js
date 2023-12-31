const express = require('express');
const router = express.Router();

const timesController = require('../controllers/times');

//* Delete time
router.post('/time-delete', timesController.postDeleteTime)

//* adding time
router.get('/add', timesController.getAddTime);
router.post('/add', timesController.postAddTime);

//* showing times
router.get('/', timesController.getShowTime);

module.exports = router