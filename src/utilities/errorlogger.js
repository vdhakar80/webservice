// import necessary file
const fs=require('fs')

var errorLogger = function (err,req,res,next) {
    //write your code here
    if (err) {
        fs.appendFile('ErrorLogger.txt',  err.stack + "\n" , (error) => {
            if (error) {
                console.log("Could not log the errors");
            }
        });
        if(err.status) {
           res.status(err.status);
        }
        else {
           res.status(500);
        }
        res.json({ "message": err.message })
    }
    next();
}

//export errorLogger object
module.exports=errorLogger;