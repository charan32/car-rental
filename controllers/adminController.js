var carModel=require('../models/cars');
var carBooking=require('../models/carBooking');
var users=require('../models/users');


exports.addNewCar=async (req,res)=>{
    try{
    if(req.body != undefined){
    if(req.body.vehicleno!=undefined && req.body.model!=undefined && req.body.seatcapacity!=undefined && req.body.rentperday!=undefined  ){
        if(Number(req.body.seatcapacity) ==4 || Number(req.body.seatcapacity) ==6){
        if(Number(req.body.rentperday) >0){
        var findcar=await carModel.findCar(req.body.vehicleno);
        if(findcar.length == 0 || findcar.length == undefined || findcar.length == null){
    let car={
         vehicleNo:req.body.vehicleno,
         model:req.body.model,
         seatCapacity:req.body.seatcapacity,
         price:req.body.rentperday,
         creationDate:Date(Date.now())
    }

var result=await carModel.addCar(car);
if(result){
    res.send("new car added")
}
else{
    res.send("not saved")
}
        }
        else{
            res.send("car with vehicle No :"+req.body.vehicleno+" already exists")
        }
    }else{
        res.send("rent per day must be greater than 0")
    }
}else{
    res.send("choose seat capacity either 4 or 6")
}
    }else{
        res.send("please provide all the values")
    }
    }
    else{
        res.send("please provide data to add a car")
    }
}catch(error){
    console.log(error);
}
}

exports.deleteCar=async (req,res)=>{
    //let carobj = new car(req);
var vehicleNo=req.body.vehicleNo;
if(vehicleNo!=undefined){
    var findcar=await carModel.findCar(vehicleNo);
    if(findcar.length !=0   ){
    if(findcar[0].isRented != true){

var result=await carModel.deleteCar(vehicleNo);
if(result){
    res.send("deleted :"+vehicleNo)
}
else{
    res.send("there is no vehicle with no : "+vehicleNo)
}
    }else{
    res.send("the car is already booked ,you cant delete")
    }
}
else{
    res.send("please provide a valid vehicle no")
}
}
else{
    res.send("please provide vehicle number to delete")
}
}


exports.updateCar=async (req,res)=>{
    if(req.body !=undefined){
var vehicleNo=req.body.vehicleNo;
if(vehicleNo!=undefined){
    var findcar=await carModel.findCar(vehicleNo);
    if(findcar.length !=0   ){
    if(findcar[0].isRented != true){

        var data={
            price:req.body.price,
            updatedDate:Date.now()
        }
        var result=await carModel.updateCar(vehicleNo,data);
        if(result){
            res.send("updated :"+vehicleNo)
        }
        else{
            res.send("there is no vehicle with no : "+vehicleNo)
        }
    }else{
    res.send("the car is already booked ,you cant update")
    }
}
else{
    res.send("please provide a valid vehicle no")
}
}
else{
    res.send("please provide vehicle number to update")
}
    }
    else{
        res.send("please provide some data to update")
    }
}

module.exports.findAllBookedCars=async (req,res)=>{

    var bookedCars=await carBooking.findAllBookedCars();
    if(bookedCars.length == 0){
        res.send("there are no booked cars")
    }else{
        res.send(bookedCars);

    }
}

module.exports.findStatusOfCar=async (req,res)=>{
    if(req.body.vehicleNo != undefined && req.body.vehicleNo.length != 0){
    var vehicleno=req.body.vehicleNo;
    var status = await carModel.findCar(vehicleno);
    if(status.length !=0){
    
    var obj={
        Rented:status[0].isRented,
        BookedDates:status[0].BookedDates
    }
    res.send(obj);

}
else{
    res.send("Ther is no car with provided vehicle no")
}
}
else{
    res.send("please provide vehicle no")
}
}

module.exports.getAllCars=async (req,res)=>
{

var cars=await carModel.findAllCars();
if(cars.length !=0 ){
    res.send(cars);

}else{
    res.send("there are no cars to display!")
}
    
}


