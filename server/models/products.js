const mongoose = require("mongoose")
const Schema = mongoose.Schema
const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    mrp: {
        type: String,
        required: false
    },
    mdp: {
        type: String,
        required: false
    },
    offer: {
        type: String,
        required: true
    },
    availability: {
        type: String,
        required: true
    },
    product_rating: {
        type: String,
        required: false
    },
    product_specifications: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    }
},
    {
        versionKey: false
    }
)

module.exports = mongoose.model("Products", productSchema)