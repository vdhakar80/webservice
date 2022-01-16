const express = require('express');
const create = require("./model/dbsetup")
const tester = require("../parserModule/parser").reportGenerator
const cors = require('cors');
const app = express();
//import required files
const routing=require('./routes/routing');
const bodyParser=require('body-parser');
const requestLogger=require('./utilities/requestlogger');
const errorLogger=require('./utilities/errorlogger');

app.use(cors());

//Use required middlewares
app.use(bodyParser.json());
app.use(requestLogger);
app.use('/',routing);
app.use(errorLogger);

//Donot remove the below lines code

//for running test case
app.get('/test', (req, res, next) => {
    tester()
        .then((data) => {
            console.log("--- Verification Completed ---")
            res.send(data)
        }).catch((err) => {
            console.log(err.message);
        })
})

////for setting up db
app.get('/setupDb', (req, res, next) => {
    create.setupDb().then((data) => {
        res.send(data)
    }).catch((err) => {
        next(err)
    })
})

if (!module.parent) {
    app.listen(2040);
    console.log("Server listening in port 2040");
}


module.exports = app;