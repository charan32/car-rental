const mongoose = require('mongoose');
var SchemaObject = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
const carSchema = new mongoose.Schema({
    vehicleNo:{
        type:String,
        required:true
    },
    model: {
         type: mongoose.Schema.Types.String,
          required: true 
        },
    seatCapacity:{
        type:Number,
        required:true
    },
    price: {
         type: Number,
          required: true 
        },
    isRented: {
        type: Boolean,
         required: true,
          default: false
    },
    BookedDates:[{
        phoneNo:Number,
        startDate:Date,
        endDate:Date
    }],
    creationDate: {
        type: Date, 
        required:true
    },    
    updatedDate:{
        type:Date
    }
    
})

const Car = mongoose.model('Car', carSchema);

module.exports = Car;

module.exports.addCar = async function (carDetails) {
    try {
       // const  user = new Car(carDetails);
        var result= await Car.create(carDetails) ;
       
                  return(result);
          
    } catch (error) {
        console.log(error);
    }
  
}

module.exports.findCar = async function (vehicleno) {
    try{
        var foundStatus=await Car.find({"vehicleNo":vehicleno})
        return foundStatus;
    }catch(error){
        throw error;
    }


}


module.exports.deleteCar = async function (vehicleno) {
    try {
       // const  user = new Car(carDetails);
        var result= await Car.deleteOne({"vehicleNo":vehicleno}) ;
       
                  return(result);
          
    } catch (error) {
        console.log(error);
    }
  
}

module.exports.updateCar = async function (vehicleno,Data) {
    try {
       // const  user = new Car(carDetails);
        var result= await Car.updateOne({"vehicleNo":vehicleno},Data) ;
       
                  return(result);
          
    } catch (error) {
        console.log(error);
    }
  
}

module.exports.findAvailableCars = async function (filters) {
    try{
        var foundStatus=await Car.find({$and:[{"isRented":false},{"seatCapacity":filters.seatCapacity}]})
        return foundStatus;
    }catch(error){
        throw error;
    }


}

module.exports.updateBookedCar = async function (vehicleno,Data) {
    try {
       // const  user = new Car(carDetails);
        var result= await Car.updateOne({"vehicleNo":vehicleno},{$push:{"BookedDates":Data},isRented:true}) ;
       
                  return(result);
          
    } catch (error) {
        console.log(error);
    }
  
}


module.exports.findAvailableCarsonDate = async function (startDate,endDate) {
    try{
        var foundStatus=await Car.find({"BookedDates.endDate":{$lt:startDate}})
        return foundStatus;
    }catch(error){
        throw error;
    }


}

// module.exports.findAvailablityOfCars = async function (startDate,endDate) {
//     try{
//         var foundStatus=await Car.aggregate([
//             {"$unwind":"$BookedDates"},
//             {"$match":{
//                 "BookedDates.endDate":{$lt:startDate}
//             }},
//             {$group:{
//                 "_id":"$_id",
//                 vehicleno: {
//                     $first: "$vehicleNo"
//             },
//             model: {
//                 $first: "$model"
//         },
//         price: {
//             $first: "$price"
//     }},
//             }
//         ]
    
            
//             ).exec();
//         return foundStatus;
//     }catch(error){
//         throw error;
//     }


// }



module.exports.findAvailablityOfCars = async function (startDate,endDate) {
    try{
        var foundStatus=await Car.aggregate([{
            $facet: {
                    Field1: [
                        {"$unwind":"$BookedDates"},
                        
                        {
                            "$match":{
                                "BookedDates.endDate":{$lt:startDate}
                            }
                    }, {
                        $group:{
                            "_id":"$_id",
                            vehicleno: {
                                $first: "$vehicleNo"
                        },
                        model: {
                            $first: "$model"
                    },
                    price: {
                        $first: "$price"
                },
                seatCapacity:{
                    $first:"$seatCapacity"
                }
            }
                    }],
                    field2: [{
                                    $match: {
                                            isRented:false
                                    }
                            }, {
                                    $group: {
                                        "_id":"$_id",
                                        vehicleno: {
                                            $first: "$vehicleNo"
                                    },
                                    model: {
                                        $first: "$model"
                                },
                                price: {
                                    $first: "$price"
                            },
                            seatCapacity:{
                                $first:"$seatCapacity"
                            }

                                    }
                            }

                    ]
            }
    },

]
            
            ).exec();
        return foundStatus;
    }catch(error){
        throw error;
    }


}



module.exports.updateCanceledCar = async function (vehicleno,phone,bool) {
    try {
       // const  user = new Car(carDetails);
        var result= await Car.updateOne({"vehicleNo":vehicleno},{$pull:{"BookedDates":{"_id":phone}},isRented:bool}) ;
       
                  return(result);
          
    } catch (error) {
        console.log(error);
    }
  
}

module.exports.findAllCars=async function(){
    try{
var result=await Car.find({}).exec();
return result;
    }catch(error){
        console.log(error);
    }
}
