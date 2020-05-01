var mongoose = require('mongoose');
var SchemaObject = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;


const rentedCarSchema = new mongoose.Schema({
    _id:{type:ObjectId,required:true},
        car: {  
                id:{type:ObjectId},
               vehicleNo:String,
                
            },
        user: {
                Name:String,
                phoneNo:Number
            },
        BookingDate: {
                type: Date,
                required: true 
        },
        days: {
                type: Number,
                required: true
            }, 

            EndDate: {
                type: Date,
                required: true 
        },

})

const RentedCarInfo = mongoose.model('RentedCarInfo', rentedCarSchema);

module.exports = RentedCarInfo;

module.exports.addCarBooking = async function (carDetails) {
    try {
      
        var result= await RentedCarInfo.create(carDetails) ;
     
                  return(result);
          
    } catch (error) {
        console.log(error);
    }
  
}
module.exports.findCarBooked=async function(vehicleno,bookdate){
var result = await RentedCarInfo.find({"car.vehicleNo":vehicleno,$and:[{BookingDate:{$gte:bookdate}},{BookingDate:{$lte:bookdate}}]}).exec();
return result;
}//$and:[{endDate:{$gte:bookdate}},{BookingDate:{$lte:bookdate}}]

module.exports.cancelBooking=async function(id){
var result = await RentedCarInfo.deleteOne({"_id":id}).exec();
 if(result){
     return true;
 }else{
     return false;
 }
}

module.exports.findBooking=async function(id){
    var result =  await RentedCarInfo.findById(id);
    return result;
}
module.exports.findAllBookedCars=async function(){
    var result =  await RentedCarInfo.find({});
    return result;
}