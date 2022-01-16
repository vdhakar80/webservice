//Import necessary modules
const express = require('express')
const routing = express.Router();
const Customer = require('../model/customer');
const myservice=require('../service/allocate');



routing.put('/allocate/:distributor', async (req, res, next) => {
    //Code the route as specified in QP
    try {
        let customerObj = new Customer(req.body);
        customerObj.installationDate=new Date(req.body.installationDate);
        customerObj.purchaseDate=new Date(req.body.purchaseDate);
        let data=await myservice.allocate(req.params.distributor,customerObj);
        res.json({"message": `Solar Heater ${req.params.distributor} successfully allocated to customer ${data}`})

    }
    catch (error) {
        next(error);
    }

})

routing.get('/findService/:location', async(req,res,next) => {
    //Code the route as specified in QP
    try {
        let data=await myservice.fetchDetails(req.params.location);
        res.send(data);
        
    }
    catch (error) {
        next(error);
    }
})


///export routing
module.exports = routing;
