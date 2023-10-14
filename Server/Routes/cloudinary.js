const express = require("express");

const router = express.Router();

const {
  upload,
  remove,
  userUploadAvatar,
} = require("../controllers/cloudinary");
const { authCheck, adminCheck } = require("../middlewares/auth");

router.post("/uploadimages", authCheck, adminCheck, upload);
router.post("/removeimage", authCheck, adminCheck, remove);
router.post("/uploadavatar", authCheck, userUploadAvatar);

module.exports = router;
