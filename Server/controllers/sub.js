const Sub = require("../Models/sub");
const slugify = require("slugify");
const Product = require("../Models/product");
exports.create = async (req, res) => {
  try {
    const { name, parent } = req.body;

    if (!name || name.length < 2 || name.length > 40) {
      return res.status(400).json({ error: "Invalid name" });
    }

    const slug = slugify(name);
    const subcategory = new Sub({ name, slug, parent });
    const savedSubcategory = await subcategory.save();

    res.status(201).json(savedSubcategory);
  } catch (error) {
    console.error("Error in creating Sub Category", error);
    res.status(500).json({ error: "Creating Sub failed" });
  }
};

exports.list = async (req, res) => {
  res.json(await Sub.find({}).sort({ createdAt: -1 }).exec());
};

exports.read = async (req, res) => {
  const sub = await Sub.findOne({ slug: req.params.slug }).exec();
  const products = await Product.find({ subs: sub })
    .populate("category")
    .exec();
  res.json({
    sub,
    products,
  });
};

exports.update = async (req, res) => {
  const { name, parent } = req.body;
  try {
    const updated = await Sub.findOneAndUpdate(
      { slug: req.params.slug },
      { name, parent, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).send("Updating Sub failed");
    console.log("Error in updating Sub", error);
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Sub.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (error) {
    console.log("Error in deleting Sub", error);
    res.status(400).send("Deleting Sub failed");
  }
};
