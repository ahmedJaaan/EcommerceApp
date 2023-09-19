const Category = require("../Models/category");
const slugify = require( 'slugify');

exports.create = async(req, res) => {
    try {
        const {name} = req.body
        const category = await new Category({name, slug: slugify(name)}).save();
        res.json(category)
    } catch (error) {
        console.log("Error in creating Category", error)
        res.status(400).send("Creating Category failed")    
    }
};

exports.list = async(req, res) => {
    res.json(await Category.find({}).sort({createdAt: -1}).exec());
};

exports.read = async(req, res) => {
    const category = await Category.findOne({slug: req.params.slug}).exec();
    res.json(category);
};

exports.update = async(req, res) => {
    const {name} = req.body;
    try {
        const updated = await Category.findOneAndUpdate(
            {slug: req.params.slug}, 
            {name, slug: slugify(name)},
            {new: true}
            );
            res.json(updated);
    } catch (error) {
        res.status(400).send("Updating Category failed") 
        console.log("Error in updating Category", error)
    }
};

exports.remove = async(req, res) => {
    try {
        const deleted = await Category.findOneAndDelete({slug: req.params.slug});
        res.json(deleted);
    } catch (error) {
        console.log("Error in deleting Category", error)
        res.status(400).send("Deleting Category failed")    
    }
};

