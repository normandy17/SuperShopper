const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config();

const connectDB = async () => {
    try {
        const connect = await mongoose.connect("mongodb://localhost/temp", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log("Connection Established: " + connect.connection.host)
    } catch (err) {
        console.log("Error: " + err.message)
        process.exit(1)
    }
}

module.exports=connectDB