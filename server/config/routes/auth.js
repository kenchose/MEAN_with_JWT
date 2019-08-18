const router = require('express').Router();
const User = require("./../../models/User");

router.post('/register',  (req, res) => {
    let user = new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.email
    })
    res.send(user)
})

module.exports = router;