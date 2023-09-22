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


exports.read = async(req, res) => {
    const product = await Product.findOne({slug: req.params.slug})
    .populate("category")
    .populate("subs")
    .exec();
    res.json(product);
}

exports.update = async(req, res) => {
    try {
        if(req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const updated = await Product.findOneAndUpdate({slug: req.params.slug}, req.body, {new: true})
        res.json(updated);
    } catch (error) {
        console.log("Update product failed", error)
        res.status(400).send({
            error: error.message
        });
    }  
}