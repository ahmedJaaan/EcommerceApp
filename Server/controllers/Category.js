const Category = require("../Models/category");
const Sub = require("../Models/sub");
const slugify = require("slugify");
const Product = require("../Models/product");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await new Category({ name, slug: slugify(name) }).save();
    res.json(category);
  } catch (error) {
    console.log("Error in creating Category", error);
    res.status(400).send("Creating Category failed");
  }
};

exports.list = async (req, res) => {
  res.json(await Category.find({}).sort({ createdAt: -1 }).exec());
};

exports.read = async (req, res) => {
  const category = await Category.findOne({ slug: req.params.slug }).exec();
  const products = await Product.find({ category })
    .populate("category")
    .populate("subs")
    .populate("ratings")
    .exec();
  res.json({
    category,
    products,
  });
};

exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const updated = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).send("Updating Category failed");
    console.log("Error in updating Category", error);
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (error) {
    console.log("Error in deleting Category", error);
    res.status(400).send("Deleting Category failed");
  }
};

exports.getSubs = async (req, res) => {
  try {
    const subs = await Sub.find({ parent: req.params._id }).exec();
    //console.log(subs);
    res.json(subs);
  } catch (err) {
    console.error(err);
    res.status(400).send("Error in getting subs");
  }
};
