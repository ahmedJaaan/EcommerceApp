const cloudinary = require("cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


exports.upload =  async(req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.body.image, {
            public_id: `${Date.now()}`,
            resource_type: "auto"
        })
        res.json(
            {
                public_id: result.public_id,
                url: result.secure_url
            }
        );
    } catch (error) {
        console.log(error);
        res.json(401).send({
            error: error.message
        })
    }
};


exports.remove = async(req, res) => {
    const {image_id} = req.body._public_id;
    await cloudinary.uploader.destroy(image_id, (error, result) => {
        if (error) return res.json({success: false, error});
    });
    res.send({ok: true});
}