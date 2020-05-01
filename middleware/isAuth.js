const jwt = require('jsonwebtoken');



const users = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }];



module.exports.authenticate=(req,res,next)=> {
    
    const user = users.find(u => u.username === req.body.username && u.password === req.body.password);
    if (user) {
        const token = jwt.sign({ sub: user.id }, 'superSecret');
      
       if(token)
       {
           res.send({jwt_token:token})
       }
       else{
           res.send("you are not authenticated to use this api")
       }
    }else{
        res.send("user not found")
    }
    

}

module.exports.verifyToken=async (req,res,next)=>{

    
  try {
      if(req.headers.authorization != undefined){
    const key = req.headers.authorization;
    
    let decodedToken;
    jwt.verify(key, 'superSecret',function(err,decoded){
        if(err){
            res.send("Authenticate to continue")
        }else{
            next(); 
        }
    });
    
  }else{
      res.send("please Authenticate!")
  }
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
}