const mongoose = require("mongoose")

const NewsletterShema = new mongoose.Schema({
    email : {
        type:String,
        required:[true,"Email Must Required!!!"],
        unique:true
    }
})
const Newsletter = new mongoose.model("Newsletter",NewsletterShema)
module.exports = Newsletter