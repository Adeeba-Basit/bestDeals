const mongoose = require("mongoose")

const MaincategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name Must Required"],
        unique: true
    }
})
const Maincategory = new mongoose.model("Maincategory", MaincategorySchema)
module.exports = Maincategory