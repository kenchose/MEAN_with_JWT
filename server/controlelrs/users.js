const User = require('./../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const verify = require('./../config/routes/verifyToken');
const { registerValidation, loginValidation } = require('../validation');

module.exports = {
    new: async (req, res) => {
        //VALIDATING BEFORE CREATING NEW USER
        const {error} = registerValidation(req.body)
        if(error) return res.status(400).send(error.details[0].message) 

        //CHECK IF USER ALREADY IN THE DATABASE
        const emailExist = await User.findOne({email:req.body.email});
        if(emailExist) return res.status(400).send("Email already exists");

        //HASH PASSWORD
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        //CREATE NEW USER
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        try {
            const user = await newUser.save();
            res.status(201).json({success: "Successfully saved new user", user:user._id});
        } catch(err) {
            res.status(400).json({error: "Error, could not save new user", err});
        }
    },

    login: async (req, res) => {
        //VALIDATE LOGIN
        const {error} = loginValidation(req.body)
        if(error) return res.status(400).send(error.details[0].message) 

        //CHECK IF EMAIL EXISTS
        const user = await User.findOne({email:req.body.email});
        if(!user) return res.status(400).send("This email is not registered");

        //CHECK CORRECT PASSWORD
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) return res.status(400).json({error: "Error, email/password is incorrect."});

        //CREATE AND ASSIGN TOKEN
        const token = jwt.sign({id:user._id}, process.env.TOKEN_SECRET);
        res.header('auth-token', token).send(token)

        res.status(200).json({success: "You are now logged in"})
    },

    getAll: (req, res) => {
        User.find({}, (err, users) => {
            if(err) {
                res.json({error: "Error, could not get all users", err});
            } else {
                res.json({success: "Success, got all users", users})
            }
        })
    }
}


