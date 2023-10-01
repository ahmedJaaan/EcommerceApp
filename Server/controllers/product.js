const Product = require("../Models/product");
const slugify = require("slugify");
const User = require("../Models/user");

exports.create = async (req, res) => {
  try {
    // console.log(req.body);

    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (error) {
    console.log("Create product failed", error);
    res.status(400).send("Error in creating product");
  }
};

exports.listAll = async (req, res) => {
  const products = await Product.find({})
    .limit(parseInt(req.params.count))
    .populate("category")
    .populate("subs")
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(products);
};

exports.remove = async (req, res) => {
  try {
    const deletedProduct = await Product.findOneAndRemove({
      slug: req.params.slug,
    }).exec();
    res.json(deletedProduct);
  } catch (error) {
    console.log("Delete product failed", error);
    res.status(400).send("Error in deleting product");
  }
};

exports.read = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug })
    .populate("category")
    .populate("subs")
    .exec();
  res.json(product);
};

exports.update = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updated = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    console.log("Update product failed", error);
    res.status(400).send({
      error: error.message,
    });
  }
};

exports.list = async (req, res) => {
  // console.log(req.body);
  try {
    const { sort, order, page } = req.body;
    const currentPage = page || 1;
    const perPage = 3;
    const skip = (currentPage - 1) * perPage;
    const products = await Product.find({})
      .skip(skip)
      .populate("category")
      .populate("subs")
      .sort([[sort, order]])
      .limit(perPage)
      .exec();
    res.json(products);
  } catch (error) {
    console.log("List products failed", error);
    res.status(400).send("Error in listing products");
  }
};

exports.productsCount = async (req, res) => {
  try {
    const total = await Product.find({}).estimatedDocumentCount().exec();

    if (!isNaN(total)) {
      res.json(total);
    } else {
      console.error("Invalid products count:", total);
      res.status(500).send("Error in calculating products count");
    }
  } catch (error) {
    console.error("Error in getting Product Count:", error);
    res.status(500).send("Error in calculating products count");
  }
};

exports.productStar = async (req, res) => {
  try {
    // console.log(req.body);
    const product = await Product.findById(req.params.productId).exec();
    const user = await User.findOne({ email: req.user.email }).exec();
    const { star } = req.body;

    const existingRatingObject = product.ratings.find(
      (ele) => ele.postedBy.toString() === user._id.toString()
    );

    if (existingRatingObject === undefined) {
      const ratingAdded = await Product.findByIdAndUpdate(
        product._id,
        {
          $push: { ratings: { star, postedBy: user._id } },
        },
        { new: true }
      ).exec();
      //   console.log(ratingAdded);
      res.json(ratingAdded);
    } else {
      const ratingUpdated = await Product.updateOne(
        { ratings: { $elemMatch: existingRatingObject } },
        { $set: { "ratings.$.star": star } },
        { new: true }
      ).exec();
      //   console.log(ratingUpdated);
      res.json(ratingUpdated);
    }
  } catch (error) {
    console.error("Error in updating product rating:", error);
    res.status(500).send("Error in updating product rating");
  }
};

exports.listRelated = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId).exec();
    const related = await Product.find({
      _id: { $ne: product._id },
      category: product.category,
    })
      .limit(6)
      .populate("category")
      .populate("subs")
      .populate("ratings")
      .exec();
    res.json(related);
  } catch (error) {
    console.error("Error in listing related products:", error);
    res.status(500).send("Error in listing related products");
  }
};

const handleQuery = async (req, res, query) => {
  try {
    const products = await Product.find({
      $text: { $search: query },
    })
      .populate("category", "_id name")
      .populate("subs", "_id name ")
      .populate("ratings")
      .exec();
    res.json(products);
  } catch (error) {
    console.error("Error in searching products", error);
    res.status(500).send("Error in searching products");
  }
};

const handlePrice = async (req, res, price) => {
  try {
    const products = await Product.find({
      price: {
        $gte: price[0],
        $lte: price[1],
      },
    })
      .populate("category", "_id name")
      .populate("subs", "_id name ")
      .populate("ratings")
      .exec();
    res.json(products);
  } catch (error) {
    console.error("Error in searching products price", error);
    res.status(500).send("Error in searching products price");
  }
};

const handleCategory = async (req, res, category) => {
  try {
    const products = await Product.find({ category })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      .populate("ratings")
      .exec();

    res.json(products);
  } catch (error) {
    console.error("Error in searching products category", error);
    res.status(500).send("Error in searching products category");
  }
};
const handleStar = async (req, res, stars) => {
  try {
    const aggregates = await Product.aggregate([
      {
        $project: {
          document: "$$ROOT",
          floorAverage: {
            $floor: { $avg: "$ratings.star" },
          },
        },
      },
      { $match: { floorAverage: stars } },
    ]).limit(12);

    const productIds = aggregates.map((agg) => agg.document._id);

    const products = await Product.find({ _id: { $in: productIds } })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      .populate("ratings")
      .exec();

    res.json(products);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "An error occurred" });
  }
};

const handleSub = async (req, res, subs) => {
  try {
    const products = await Product.find({ subs })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      .populate("ratings")
      .exec();
    res.json(products);
  } catch (error) {
    console.error("Error HandleSUb:", error);
    res.status(500).json({ error: "An error occurred In handleSUb" });
  }
};

const handleColor = async (req, res, color) => {
  try {
    const products = await Product.find({ color })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      .populate("ratings")
      .exec();
    res.json(products);
  } catch (error) {
    console.error("Error in searching products by color", error);
    res.status(500).json({ error: "An error occurred in handleColor" });
  }
};

exports.searchFilters = async (req, res) => {
  const { query, price, category, stars, subs, color } = req.body;

  if (query) {
    await handleQuery(req, res, query);
    // console.log(query);
  }

  if (price != undefined) {
    await handlePrice(req, res, price);
    // console.log(price);
  }
  if (category) {
    await handleCategory(req, res, category);
    // console.log(category);
  }

  if (stars) {
    await handleStar(req, res, stars);
    // console.log(stars);
  }

  if (subs) {
    await handleSub(req, res, subs);
    // console.log(subs);
  }

  if (color) {
    await handleColor(req, res, color);
    console.log(color);
  }
};
