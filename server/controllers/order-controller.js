const Orders = require("../models/orders")
const Razorpay = require("razorpay")
const dotenv = require("dotenv")
const request = require("request")

dotenv.config()
const instance = new Razorpay({
    key_id: process.env.RAZOR_PAY_KEY_ID,
    key_secret: process.env.RAZOR_PAY_KEY_SECRET
})

const createOrder = (req, res) => {
console.log("asd")
    try {
        const options = {
            amount: req.body.amount * 100,
            currency: "INR",
            receipt: req.body.billnum

        }
        
        instance.orders.create(options, (err, order) => {
            if (err) {
                return res.status(500).json({ message: err })
            }
            console.log("zxc")
            return res.status(200).json(order)
        })
    }
    catch (err) {
        res.status(500).json({ message: "Something went wrong" })
    }
}

const captureOrder = (req, res) => {
    console.log("qwert")
    try {
        return request(
            {
                method: "POST",
                url: `https://${process.env.RAZOR_PAY_KEY_ID}:${process.env.RAZOR_PAY_KEY_SECRET}@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
                form: {
                    amount: req.body.amount * 100,
                    currency: "INR",
                },
            },
            async function (error, response, body) {
                if (error) {
                    return res.status(500).json({
                        message: "Something Went Wrong",
                    });
                }
                return res.status(200).json(body);
            });
    } catch (err) {
        return res.status(500).json({
            message: "Something Went Wrong",
        });
    }
};

const addOrder = (req, res) => {
    console.log(req.body)
    const amount=req.body.amount
    const userData=req.body.userData
    const billnum=req.body.billnum
    const cart=req.body.cart
    
    const newOrder = new Orders({ amount,userData,billnum,cart})
    newOrder.save()
        .then(() => res.json("Order Added Successfully"))
        .catch((err) => res.status(400).json("Error: " + err))
}



module.exports = { createOrder, captureOrder,addOrder }