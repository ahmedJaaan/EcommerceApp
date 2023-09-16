const admin = require("../firebase/index");

exports.authCheck =(req, res, next) => {
    // console.log(req.headers);
    try {
        
    } catch (error) {
        console.log(error)
        res.status(401).json({
            error: "Invalid User or Expired token"
        });        
    }
    next();
};


