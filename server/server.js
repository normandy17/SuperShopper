const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const connectDB=require("./config/db")
const productRoute=require("./routes/products")
const userRoute=require("./routes/users")
const orderRoute=require("./routes/orders")

dotenv.config();
const app = express()
app.use(express.json())
app.use(cors())

connectDB()
app.use("/api/products", productRoute)
app.use("/api", userRoute)
app.use("/", orderRoute)

app.listen(8001, () => {
    console.log("The server is running on port 8001")
})

