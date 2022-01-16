let Validator = {}

Validator.validateCustomer = (name) => {
    //Code the validator
    reg1 = /^[a-zA-Z]*$/
    if (!reg1.test(name)) {
        err = new Error("Customer name cannot have special characters");
        err.status = 406;
        throw err;
    }
    if (name.length < 4) {
        err = new Error("Customer name should be of min 4 character length");
        err.status = 406;
        throw err;
    }
}
// Validator.validateCustomer("Vi#sd");
Validator.validateDate = (pDate, iDate) => {
    //Code the validator
    let today=new Date();
    today.setHours(0,0,0,0);
    if (pDate < today) {
        let err = new Error("Purchase date should be greater than or equal to current date");
        err.status = 406;
        throw err;
    }
    else if (pDate >= iDate) {
        let err = new Error("Installation Date should be greater than Purchase Date");
        err.status = 406;
        throw err;
    }

    // let date = new Date();
    // if (pDate < date) {
    //     let err = new Error("Purchase date should be greater than or equal to current date");
    //     err.status = 406;
    //     throw err
    // } else if (iDate <= pDate) {
    //     let err = new Error("Installation Date should be greater than Purchase Date");
    //     err.status = 406;
    //     throw err
    // }

}
// Validator.validateDate(new Date("2021-03-27"),new Date("2021-03-28"));
Validator.validateDistributor = (distributor) => {
    //Code the validator
    Distributors = ["Suntek", "A4solar", "SupremeSolar", "IcarusHeaters", "MagnumTurbo", "Blitz"];
    let flag = false;
    for (let i = 0; i < Distributors.length; i++) {
        if (Distributors[i] == distributor) {
            flag = true;
        }
    }
    if (flag == false) {
        err = new Error("Invalid Distributor Name");
        err.status = 406;
        throw err;
    }

}

// Validator.validateDistributor("Suntek");

//export validator
module.exports=Validator;