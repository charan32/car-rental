var mongoose = require('mongoose');
var SchemaObject = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var userSchema=new SchemaObject({
	userId: ObjectId,
	name: String,
	email:{
        type:String,
        required:true
    } ,
	mobile:{
        type:String,
        required:true
    },
    password: String,
    rentedCars:[{type: ObjectId, ref: 'Car'}],
	isAdmin:{type:Boolean,default:false}
	
});
var userModel = mongoose.model('User', userSchema);
module.exports = {model: userModel, schema: userSchema};