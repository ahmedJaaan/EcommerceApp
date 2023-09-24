const express = require("express");

const router = express.Router();

const {create, listAll, remove, read, update, list, productsCount} = require("../controllers/product")
const {authCheck, adminCheck} = require("../middlewares/auth")

router.post("/product", authCheck, adminCheck, create);
router.get("/products/:count", listAll);
router.delete("/product/:slug", authCheck, adminCheck, remove);
router.get("/product/:slug", read);
router.put("/product/:slug", authCheck, adminCheck, update);
router.post("/products", list);
router.get("/products/total", productsCount);

module.exports = router;