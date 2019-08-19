const User = require('./../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { registerValidation, loginValidation } = require('./../../src/app/validation');

module.exports = {
    new: async (req, res) => {
        //VALIDATING BEFORE CREATING NEW USER
        let {error} = registerValidation(req.body)
        if(error) return res.status(400).send(error.details[0].message) 

        //CHECK IF USER ALREADY IN THE DATABASE
        let emailExist = await User.findOne({email:req.body.email});
        if(emailExist) return res.status(400).send("Email already exists");

        //HASH PASSWORD
        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(req.body.password, salt)

        //CREATE NEW USER
        let newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        try {
            const user = await newUser.save();
            res.json({success: "Successfully saved new user", user:user._id});
        } catch(err) {
            res.status(400).json({error: "Error, could not save new user", err});
        }
    },

    login: async (req, res) => {
        //VALIDATE LOGIN
        let {error} = loginValidation(req.body)
        if(error) return res.status(400).send(error.details[0].message) 

        //CHECK IF EMAIL EXISTS
        let user = await User.findOne({email:req.body.email});
        if(!user) return res.status(400).send("This email is not registered");

        //CHECK CORRECT PASSWORD
        let validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) return res.status(400).json({error: "Error, email/password is incorrect."});

        res.json({success: "You are now logged in"})
    }
}


