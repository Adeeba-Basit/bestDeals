const mongoose = require("mongoose")

async function getConnect(){
    try {
        // await mongoose.connect("mongodb://127.0.0.1:27017/MernStack")
        await mongoose.connect(process.env.DB_KEY)
        console.log("Database is Conneted!!!");
    } 
    catch (error) {
        console.log(error)
    }
}
getConnect()