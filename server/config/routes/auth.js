const router = require('express').Router();
const user = require("./../../controlelrs/users");

router.post('/register', (req, res) => {
    user.new(req, res)
});

router.post('/login', (req, res) => {
    user.login(req, res)
});

router.get('/users', (req, res) => { 
    user.getAll(req, res)
});

module.exports = router;