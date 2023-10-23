const mongoose = require("mongoose")

const SubcategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name Must Required"],
        unique: true
    }
})
const Subcategory = new mongoose.model("Subcategory", SubcategorySchema)
module.exports = Subcategory