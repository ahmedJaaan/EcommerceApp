const Product = require("../Models/product");
const slugify = require("slugify");


exports.create = async(req, res) => {
    try {
        // console.log(req.body);
        
        req.body.slug = slugify(req.body.title);
        const newProduct = await new Product(req.body).save();
        res.json(newProduct);
    } catch (error) {
        console.log("Create product failed", error)
        res.status(400).send("Error in creating product");
    }
}

exports.listAll = async(req, res) => {
    const products = await Product.find({})
    .limit(parseInt(req.params.count))
    .populate("category")
    .populate("subs")
    .sort([["createdAt", "desc"]])
    .exec();
    res.json(products);    
}


exports.remove = async(req, res) => {
    try {
        const deletedProduct = await Product.findOneAndRemove({slug: req.params.slug})
        .exec();
        res.json(deletedProduct);
    } catch (error) {
        console.log("Delete product failed", error)
        res.status(400).send("Error in deleting product");
    }
}