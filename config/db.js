var mongoose = require('mongoose');
//var const_values = require('../common/properties');
var conectionString = 'mongodb://localhost:27017/car-rental';
module.exports = {
  /**
   * Connecting to mongo DB 
   * Response is call back and is returned to app.js after 
   * connection is established 
   */
  connectToServer: function (response) {
    //dbServiceLog.debug('connectToDBServer function called');
    mongoose
      .connect(conectionString, { useNewUrlParser: true,useUnifiedTopology: true })
      .then(result => {
        console.log('Connected  to Mongo DB car-rental');
        response(result);//call back to app
      })
  }
};
