const express=require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const products=require("./data/products")
const Products = require("./models/products")
const cors = require("cors")
const productRoute=require("./routes/products")
const connectDB=require("./config/db")

dotenv.config();
const app = express()
connectDB()
app.use(express.json())
app.use(cors())
app.use("/api/products", productRoute)
console.log(products[0].mdp)

const importData = async () => {
    try {
        await Products.deleteMany()
        const createdProducts=await Products.insertMany(products)
        console.log("Data Import Successfull")
        process.exit()
    } catch (err) {
        console.log("Error: " + err.message)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await Products.deleteMany()
        console.log("Data Deletion Successfull")
        process.exit()
    } catch (err) {
        console.log("Error: " + err.message)
        process.exit(1)
    }
}

if(process.argv[2]==="-d"){
    destroyData()
}
else importData()

app.listen(8001, () => {
    console.log("The server is running on port 5000")
})