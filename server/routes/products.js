const express=require("express")
const router=express.Router()
const {getProducts,getProduct,addProducts,editProducts,deleteProducts} =require("../controllers/product-controller")
const responseTime=require("response-time")

router.get("/", getProducts )
router.get("/product/:id", getProduct )
router.post("/",addProducts )
router.put("/:id",editProducts )
router.delete("/:id",deleteProducts )

module.exports=router
