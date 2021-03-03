const Products = require("../models/products")
const redis=require("redis")
const {promisify}=require("util")

const client=redis.createClient()
const GET_ASYNC=promisify(client.get).bind(client)
const SET_ASYNC=promisify(client.set).bind(client)

const getProducts=(req, res) => {
    Products.find().
        then((products) => res.json(products)).
        catch((err) => res.status(400).json("Error: " + err))
}

const getProduct=(req, res) => {
    console.log(req.params.id)
    const id = req.params.id
    Products.findById(id)
    .then((product) => {
        console.log(product)
        res.json(product)})
    .catch((err) => res.status(404).json("Product not Found"))
}

const addProducts=(req, res) => {
    const name = req.body.name
    const brand = req.body.brand
    const category = req.body.category
    const description = req.body.description
    const mrp = req.body.mrp
    const mdp = req.body.mdp
    const offer = req.body.offer
    const availability = req.body.availability
    const product_rating = req.body.product_rating
    const product_specifications = req.body.product_specifications
    const image = req.body.image
    const newProduct = new Products({name,brand,category,description,mrp,offer,mdp,offer,availability,product_rating,product_specifications,image})
    newProduct.save()
        .then(() => res.json("Product Added Successfully"))
        .catch((err) => res.status(400).json("Error: " + err))
}

const editProducts= (req, res) => {
    console.log(req.body.brand)
    const id = req.params.id
    Products.findById(id).then((product) => {
        console.log(product)
        product.name = req.body.name
        product.brand = req.body.brand
        product.category = req.body.category
        product.description = req.body.description
        product.mrp = req.body.mrp
        product.mdp = req.body.mdp
        product.offer = req.body.offer
        product.availability = req.body.availability
        product.product_rating = req.body.product_rating
        product.product_specifications = req.body.product_specifications
        product.image = req.body.image
        product.save()
            .then(() => res.json(product))
            .catch((err) => res.status(400).json("Error: " + err))
    }).catch((err) => res.status(404).json("Product not Found"))
}

const deleteProducts=(req, res) => {
    const id = req.params.id
    Products.findByIdAndDelete(id)
        .then(() => res.status(200).json({ message: "Product deleted successfully" }))
        .catch((err) => res.status(404).json({ message: "Product not found" }))

}

module.exports={getProducts,getProduct,addProducts,editProducts,deleteProducts}