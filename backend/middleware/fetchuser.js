 var jwt = require('jsonwebtoken');
 const JWT_SEC = "iamastar";
 const fetchuser = (req,res,next)=>{
    // Gdt user using jwt token and and add id to req object 
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Authenticate using a valid token"})
    }
    try{
    const data = jwt.verify(token, JWT_SEC);
    req.user = data.user;
    next();
 }catch(error){
    res.status(401).send({error:"Authenticate using a valid token"})
    
 }
}
 module.exports = fetchuser