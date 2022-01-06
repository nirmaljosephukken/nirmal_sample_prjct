const jwt = require('jsonwebtoken');

module.exports =async (req, res, next) => { 
let decodedToken;
try{
    const token = req.headers.bearer;
    decodedToken = await jwt.verify(token , 'secret');
     
    if(!decodedToken){
        res.status(500).json({
            message :'Invalid token'
        });
    }
   
} catch(error) {
    res.status(500).json({
        message :'Cannot verify token'
    });
}

req.userId = decodedToken.userId
next();

};