const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_Sec = "iamastar";

// create a user using POST: "/api/auth/" no login required
router.post('/createuser', [
    body('name').isLength({ min: 5 }),
    body('email').isEmail(),
    body('password').isLength({ min: 7 }),
], async (req, res) => {
    // Error validation
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
    }
    try {
        // Check whether a user with this email already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success, error: "Sorry, a user with this email already exists" });
        }

        // Generate salt and hash password
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // Create new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });

        const data = {
            user: {
                id: user.id
            }
        };

        // Send token
        const authtoken = jwt.sign(data, JWT_Sec);
        success = true;
        res.json({success,authtoken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }
});

// Authenticate a user using login
router.post('/login', [
    body('email').isEmail(),
    body('password').exists(),
], async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success:false
            return res.status(400).json({ error: "Please login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success:false
            return res.status(400).json({ success,error: "Please login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        };

        // Send token
        const authtoken = jwt.sign(data, JWT_Sec);
        success = true;
        res.json({ success,authtoken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});
// Getting logged in user details anedpoint = getuser

router.post('/getUser',fetchuser, 
[
    body('email').isEmail(),
    body('password').exists(),
], 
async (req, res) => {
    // Validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const userId = req.user.id; // Replace "todo" with actual logic to get the userId
        const user = await User.findById(userId).select("-password");
        // res.send(user);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        return res.status(200).json({ password: user.password });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server Error');
    }
});

module.exports = router;


// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const { body, validationResult } = require('express-validator');
// const bcrypt = require('bcryptjs');
// var jwt = require('jsonwebtoken');
// const JWT_Sec = "iamastar";
// // create a user using POST: "/api/auth/" no login reqd
// router.post('/createuser',[
//     body('name').isLength({min: 5}),
//     body('email').isEmail(),
//     body('password').isLength({min: 7}),
// ],async(req,res)=>{
//     // Making a new user 
// //    console.log(req.body);
// //    const user = User(req.body);
// //    user.save();
// // Error validation 
// // If there are errors return bad request and errors 
//     const errors = validationResult(req);
//     if(!errors.isEmpty()){
//         return res.status(400).json({errors: errors.array()});
//     }
//     // check whether user with duplicate email exists '
//     try{
//     let user = await User.findOne({email: req.body.email});
//     if (user){
//         return res.status(400).json({error: "Sorry a user with this email already exists"})
//     };
//     // generates salt 
//     const salt = await bcrypt.genSalt(10); 
//     secPass = await bcrypt.hash(req.body.password,salt);
//     user = await User.create({
//         name : req.body.name,
//         email : req.body.email,
//         password: secPass
//     })
    
//     data = {
//         user:{
//             id: user.id
//         }
//     }
//     // sends token 
//     const authtoken = jwt.sign(data,JWT_Sec);
//      res.json({authtoken})}
//      catch(error){
//         console.error(error.message)
//         res.status(500).send("Some error caused")
//     }
//     // .then(user=> res.json(user))
//     // .catch(err=>(console.log(err)));
// //    sending body data as response 
//     // res.send(req.body);
// })
// // Authenticate a user using login
// router.post('/login',[
//     body('email').isEmail(),
//     body('password').exists(),
// ],async(req,res)=>{
//     const errors = validationResult(req);
//     if(!errors.isEmpty()){
//         return res.status(400).json({errors: errors.array()});
//     }
//     const (email,password) = req.body;
//     try {
//         let user = User.findOne({email});
//         if(!user){
//             return res.status(400).json({error:"Please correctly login with proper credentials"});
//         }
//         const passwordCompare = bcrypt.compare(password,user.password);
//         if(!passwordCompare){
            
//                 return res.status(400).json({error:"Please correctly login with proper credentials"});
            
//         }
//         const data = {
//             user:{
//                 id: user.id
//             }
//         }
//         // sends token 
//         const authtoken = jwt.sign(data,JWT_Sec);
//          res.json({authtoken})
//     }
//      catch (error) {
//         console.error(error.message)
//         res.status(500).send("Internal server error")
    
// }
// module.exports = router;