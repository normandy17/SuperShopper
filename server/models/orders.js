const mongoose = require("mongoose")
const Schema = mongoose.Schema
const orderSchema = new Schema({

    userData: {
        type: Schema.Types.Mixed,
        required: true
    },
    cart: {
        type: Schema.Types.Mixed,
        required: true
    },
    amount: {
        type: Schema.Types.Mixed,
        required: true
    },
    billnum: {
        type: Schema.Types.Mixed,
        required: true
    }

},
    {
        versionKey: false
    }
)

module.exports = mongoose.model("Orders", orderSchema)