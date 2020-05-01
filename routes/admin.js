var express = require('express');
var router = express.Router();
var adminController=require('../controllers/adminController');
var isAuth=require('../middleware/isAuth')

/* GET home page. */
router.get('/authenticate',isAuth.authenticate)
router.post('/addCars',isAuth.verifyToken,adminController.addNewCar);
router.post('/deleteCar',isAuth.verifyToken,adminController.deleteCar);
router.post('/updateCar',isAuth.verifyToken,adminController.updateCar);
router.get('/carsBooked',isAuth.verifyToken,adminController.findAllBookedCars);
router.get('/carStatus',isAuth.verifyToken,adminController.findStatusOfCar);


module.exports = router;
