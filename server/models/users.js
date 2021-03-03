const mongoose = require("mongoose")
const Schema = mongoose.Schema
const userSchema = new Schema({
    name: {
        type: String,
    },
    mobile: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    type: {
        type: String,
    },
    orders:{
        type: Schema.Types.Mixed,
    },
    returns:{
        type: Schema.Types.Mixed,
    }


},
    {
        versionKey: false
    }
)

module.exports = mongoose.model("Users", userSchema)