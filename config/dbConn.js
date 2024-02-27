const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DATABASE_URI);
    }catch(err){
        console.log("Sorry an error occured while connection" + err);    
    }
}

module.exports = connectDB;