//Import necessary modules
const model=require('../model/allocate');
const validator=require('../utilities/validator')

let allocateService = {}

allocateService.allocate = async(distName, customerObj) => {
  //Code the allocate method as specified in QP
  validator.validateCustomer(customerObj.name);
  validator.validateDate(customerObj.purchaseDate,customerObj.installationDate);
  validator.validateDistributor(distName);
  data=await model.allocateHeater(distName,customerObj);
  return data;
}
// let obj = {
//   name: "Vicky",
//   purchaseDate: new Date("2021-07-12"),
//   installationDate: new Date("2021-08-12"),
//   location: "gwalior",
//   customerId: undefined
// }
// allocateService.allocate("Suntek",obj).then(data=>console.log(data));

allocateService.fetchDetails = async(location) => {
//Code the allocate method as specified in QP
  let data=await model.fetchDetails(location);
  names=[];
        for(obj of data)
        {
            names.push(obj.distributorName);
        }
        console.log(names);
  return names;
}

  // allocateService.fetchDetails("Bangalore").then(data=>console.log(data))

//export the object of service
module.exports=allocateService;