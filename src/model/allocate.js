const dbModel = require('../utilities/connection');

let allocateModel = {}

allocateModel.generateId = () => {
    return dbModel.getAllocationData().then((model) => {
        return model.distinct("customer.customerId").then((ids) => {
            let sId = Math.max(...ids);
            return sId + 1;
        })
    })
}



allocateModel.allocateHeater = async (distName, customerObj) => {
    //Code the method as specified in QP
    let customerId = await allocateModel.generateId();
    customerObj.customerId = customerId;
    let model = await dbModel.getAllocationData();
    let data = await model.updateOne({ distributorName: distName }, { $push: { customer: customerObj } });
    if (data.nModified > 0) {
        return customerId;
    }
    else {
        error = new Error("Allocation Failed");
        error.status = 500;
        throw error;
    }
}

let obj = {
    name: "Vicky",
    purchaseDate: new Date("2021-07-12"),
    installationDate: new Date("2021-08-12"),
    location: "gwalior",
    customerId: undefined
}
// allocateModel.allocateHeater("Suntek",obj).then(da=>console.log(da));

allocateModel.fetchDetails = async(location) => {
    //Code the method as specified in QP
    let model = await dbModel.getAllocationData();
    let data = await model.find({ "customer.location": location }, { _id: 0, distributorName: 1 })
    
    if (data.length > 0) {
        return data;
    }
    else {

        error = new Error(`Service not provided in ${location}`);
        error.status = 404;
        throw error;
    }
}
// allocateModel.fetchDetails("Bangalore").then(data=>console.log(data));

//export object of allocatemodel
module.exports = allocateModel;