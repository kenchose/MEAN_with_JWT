const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const authRouter = require('./server/config/routes/auth');

app.use(express.static(__dirname + '/dist/reg-login-jwt'));

//connect db
mongoose.connect(process.env.CONNECT_DB, { useCreateIndex:true, useNewUrlParser:true, useFindAndModify:false }, () => console.log("Successfully connected to DB!"));

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

//route middleware
app.use('/api/user', authRouter);

app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("/dist/lreg-login-jwt/index.html"));
})

app.listen(8000, () => console.log("Listening on port 8000"));