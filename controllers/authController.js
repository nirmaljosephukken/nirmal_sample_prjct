const User = require('../models/userModel');
const bcrypt = require( 'bcrypt');
const jwt = require( 'jsonwebtoken');

exports.signUp = async (req, res, next) => {
    const fullname = req.body. fullname;
    const email = req.body.email;
    const password = req.body.password;
    
    const userExists = await User.findOne({ email: email });

    if (userExists) {
        res.status (500).json({
        message: "Email ID already exists"
        });

    }   
    console.log(password);
    const passwordHash = await bcrypt.hash(password,12);
    
    const user = new User({
        fullname: fullname, 
        email: email, 
        password: passwordHash, 
        token: "some token"
        });
        
    const userData = await user.save(); 
    res.status (201).json ({
        message: "Sign up successfull.",
        user: userData
    });
};


exports.login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    
    const user = await User.findOne({ email: email });

    console.log(user);
    if (!user) {
        res.status (500).json({
        message: "User not found"
        });

    }   
    console.log(user.password);
    console.log(password);
    const passwordMatch= await bcrypt.compare(password,user.password);
    
    if (!passwordMatch){
        res.status (500).json({
            message: "Invalid Credentials"
            });
    }
        const token = await jwt.sign({
            email : email,
            userId: user._id.toString()
        }, 'secret ', {expiresIn: '1h'});

    res.status (200).json ({
        userId: user._id.toString(),
        token: token
    });
};
