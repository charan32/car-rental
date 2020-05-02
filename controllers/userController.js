var carModel=require('../models/cars');
var carBooking=require('../models/carBooking');
var dateFormat = require('dateformat');
var { ObjectId } = require('mongodb');
var moment=require('moment')
module.exports.availableCars=async (req,res)=>{
    try{
        var bookdate=new Date(req.body.date)
   if(bookdate != undefined  ){
       
       if(bookdate > Date.now()){
           if(req.body.days != 0){
       var dateValid=moment(req.body.date,"mm/dd/yyyy").isValid();
       if(dateValid == true){
       if(req.body.days != undefined){
      req.body.date=new Date(req.body.date);
      endDate=new Date();
      req.body.endDate=endDate.setDate(endDate.getDate() + Number(req.body.days));
      var bookedCars=await carModel.findAvailablityOfCars(req.body.date,req.body.endDate)
      if(bookedCars[0].Field1.length !=0 || bookedCars[0].Field2!=0){
   var beforeFilters=[...bookedCars[0].field2,...bookedCars[0].Field1]
var afterFilters=await applyFilters(beforeFilters,req,res);
if(afterFilters.length!=0){
    res.send(afterFilters);

}
      }else{
          res.send("No car available on given date please choose another date")
      }
       }
       else{
        res.send("please provide number of days you need car")
       }
   }else{
       res.send("the date format must be mm/dd/yyyy")
   }
}else{
    res.send("please provide no of days greater than 0")
}
}else{
  res.send("The Booking date cannot be from the past")  
}
}
else{
    res.send("please provide a valid  date to proceed")
}
}
catch(error){
console.log(error);
}
    
}

var applyFilters=(data,req,res)=>{
    try{
var af=data;
if(req.body.seatCapacity != undefined){
    
        af=af.filter(key=>key.seatCapacity==req.body.seatCapacity)
   if(af.length == 0){

    
        res.send("We only deal with car capacity of 4 and 6");
        return af;
   }

    }

if(req.body.model != undefined){
    af=af.filter(key=>key.model==req.body.model)
    if(af.length ==0){
        res.send("there is no such car model");
        return af;
        
    }
}
if(req.body.minPrice != undefined ){
    af=af.filter(key=>key.price >=req.body.minPrice )
    if(af.length ==0){
        res.send("provide valid minPrice")
        return af;

    }
}
if(req.body.maxPrice != undefined){
    af=af.filter(key=>key.price<=req.body.maxPrice)
    if(af.length ==0){
        res.send("provide valid maxPrice");
        return af;

    }
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
            if(req.body.phone != null && req.body.phone.length == 10){
                if(req.body.name != null && req.body.name.length !=0){
            if(req.body.date != undefined){
                if(Number(req.body.days) > 0){
                var dateValid=moment(req.body.date,"mm/dd/yyyy").isValid();
                if(dateValid==true){
                if(req.body.phone != undefined || req.body.name != undefined){
       var mobile= Number(req.body.phone);             

if(req.body.date != undefined){
   var bookdate=new Date(req.body.date);
    
}else{

   var bookdate=new Date();

}
if(bookdate > Date.now()){


    var car=await carModel.findCar(req.body.vehicleNo);
    if(car.length !=0){
var endDate=new Date(req.body.date);
endDate.setDate(endDate.getDate() + Number(req.body.days));

var bookedDetails=await carBooking.findCarBooked(req.body.vehicleNo,bookdate);
if(bookedDetails.length == 0){
    var id=ObjectId();

    var bookingcardetails={
       _id:id,
        user:{Name:req.body.name,
                phoneNo:mobile,
        },
        car:{
            vehicleNo:req.body.vehicleNo,
            id:car[0]._id
        },
        BookingId:id,
        BookingDate:bookdate,
        days:Number(req.body.days),
        EndDate:endDate
    }
    var result=await  carBooking.addCarBooking(bookingcardetails);
    data={
        BookingId:id,
        phoneNo:mobile,
        startDate:bookdate,
        endDate:endDate
    }
    var update=await carModel.updateBookedCar(req.body.vehicleNo,data)

    res.send("Boking Id : "+id+" \nissueDate : "+bookdate+" \nreturnDate : "+endDate+" \nphone no : "+mobile);
}
else{
    res.send("the car you have choosen is already booked for the given date please choose another car or another date")

}
}else{
    res.send("car with vehicle No :"+req.body.vehicleNo+" does not exist")
}
}else{
    res.send("Invalid Date")

}
            }else{
                res.send("please provide user Details")
            }
        }else{
            res.send("date format must be mm/dd/yyyy")
        }
}else{
    res.send("days must be greater than 0")
}
                }
else{
    res.send("please provide Booking Date ")
}
            }else{
                res.send("please provide a valid name");
            }
        }else{
            res.send("please provide a valid Mobile number");
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