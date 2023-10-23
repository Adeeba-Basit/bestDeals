const mongoose = require("mongoose")

const BrandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name Must Required"],
        unique: true
    },
    pic:{
        type:String,
        required:[true,"Pic must Required"]
    }
})

const Brand = new mongoose.model("Brand", BrandSchema)
module.exports = Brand