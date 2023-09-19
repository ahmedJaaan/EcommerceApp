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

exports.read = async(req, res) => {
    const products = await Product.find({}).populate("category").sort({createdAt: -1}).exec();
    res.json(products);    
}
