const express=require("express")
const router=express.Router()
const {createOrder,captureOrder, addOrder} =require("../controllers/order-controller")

router.post("/orders", createOrder )
router.post("/capture/:id",captureOrder )
router.post("/addorder",addOrder )

module.exports=router
