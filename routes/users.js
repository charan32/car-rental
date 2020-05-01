var express = require('express');
var router = express.Router();
var userController=require('../controllers/userController')
/* GET users listing. */
router.get('/availableCars',userController.availableCars);
router.post('/bookCar',userController.bookCar);
router.post('/cancelBooking',userController.cancelBooking)

module.exports = router;
