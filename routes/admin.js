var express = require('express');
var router = express.Router();
var adminController=require('../controllers/adminController');

/* GET home page. */
router.post('/addCars',adminController.addNewCar);
router.post('/deleteCar',adminController.deleteCar);
router.post('/updateCar',adminController.updateCar);
router.get('/carsBooked',adminController.findAllBookedCars);
router.get('/carStatus',adminController.findStatusOfCar);


module.exports = router;
