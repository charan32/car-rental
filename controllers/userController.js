var carModel=require('../models/cars');
var carBooking=require('../models/carBooking');
var dateFormat = require('dateformat');
var { ObjectId } = require('mongodb');
module.exports.availableCars=async (req,res)=>{
    try{
   if(req.body.date != undefined){
       if(req.body.days != undefined){
      req.body.date=new Date(req.body.date);
      endDate=new Date();
      req.body.endDate=endDate.setDate(endDate.getDate() + Number(req.body.days));
      var bookedCars=await carModel.findAvailablityOfCars(req.body.date,req.body.endDate)
   var beforeFilters=[...bookedCars[0].field2,...bookedCars[0].Field1]
var afterFilters=await applyFilters(beforeFilters,req);
res.send(afterFilters);
       }
       else{
        res.send("please provide number of days you need car")
       }
   }
else{
    res.send("please provide a date to proceed")
}
}
catch(error){
console.log(error);
}
    
}

var applyFilters=(data,req)=>{
    try{
var af=data;
if(req.body.seatCapacity != undefined){
af=af.filter(key=>key.seatCapacity==req.body.seatCapacity)
}
if(req.body.model != undefined){
    af=af.filter(key=>key.model==req.body.model)
}
if(req.body.minPrice != undefined ){
    af=af.filter(key=>key.price >=req.body.minPrice )
}
if(req.body.maxPrice != undefined){
    af=af.filter(key=>key.price<=req.body.maxPrice)
}
return af;
    }
    catch(error){
        console.log(error);
    }


}






module.exports.bookCar=async (req,res)=>{
    
    try{
        if(req.body.vehicleNo != undefined){
            if(req.body.date != undefined){
                
var car=await carModel.findCar(req.body.vehicleNo);
if(req.body.date != undefined){
   var bookdate=new Date(req.body.date);
    
}else{

   var bookdate=new Date();

}
if(bookdate > Date.now()){



var endDate=new Date(req.body.date);
endDate.setDate(endDate.getDate() + Number(req.body.days));

var bookedDetails=await carBooking.findCarBooked(req.body.vehicleNo,bookdate);
if(bookedDetails.length == 0){
    var id=ObjectId();

    var bookingcardetails={
       _id:id,
        user:{Name:req.body.name,
                phoneNo:Number(req.body.phone)
        },
        car:{
            vehicleNo:req.body.vehicleNo,
            id:car[0]._id
        },
        BookingDate:bookdate,
        days:Number(req.body.days),
        EndDate:endDate
    }
    var result=await  carBooking.addCarBooking(bookingcardetails);
    data={
        _id:id,
        phoneNo:req.body.phone,
        startDate:bookdate,
        endDate:endDate
    }
    var update=await carModel.updateBookedCar(req.body.vehicleNo,data)
    
    res.send("car Booked :" +id);
}
else{
    res.send("the car you have choosen is already booked for the given date please choose another car or another date")

}
}else{
    res.send("Invalid Date")

}}else{
    res.send("please provide Booking Date ")
}
        }
        else{
            res.send("please provide vehicle no to book a car")
        }
    }
    catch(error){
        console.log(error);
    }
}



module.exports.cancelBooking=async (req,res)=>{
    try{
    if(req.body.bookingId != undefined){
var id = req.body.bookingId;
if(id.length == 24){
    var valid= await carBooking.findBooking(id);
if(valid != null || valid != undefined ){
var status=await carBooking.cancelBooking(id);
var findcar=await carModel.findCar(valid.car.vehicleNo);
var list=findcar[0].BookedDates;

    
if(list.length > 1)
{
    bool=true;
}
else{
    bool=false;
}

var updateCar=await carModel.updateCanceledCar(valid.car.vehicleNo,id,bool);

if(status){
    res.send("cancellation of Booking " +id+ " was successful")
}
else{
    res.send("please provide valid booking id")
}
}else{
    res.send("please provide a valid id");
}
}
else{
    res.send("booking id is not valid");
}
    }
    else{
        res.send("please provide a Booking id to cancel")
    }
}catch(error){
    console.log(error);
}
}