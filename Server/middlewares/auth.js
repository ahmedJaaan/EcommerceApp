const admin = require("../firebase")
const User = require("../Models/user")
const { getAuth } = require("firebase-admin/auth");

exports.authCheck = async (req, res, next) => {
    try {
        const authToken = req.headers.authtoken;
        // console.log(req.headers.authtoken)
        if (!authToken) {
            throw new Error("No Firebase ID token provided in headers.");
        }

        const decodedToken = await getAuth().verifyIdToken(authToken);
        const firebaseUser = decodedToken;
        req.user = firebaseUser
        // console.log(firebaseUser);
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({
            error: "Invalid User or Expired token"
        });
    }
};
exports.adminCheck = async(req, res, next) => {
    const {email} = req.user;

    const adminUser = await User.findOne({email}).exec()

    if(adminUser.role !== "admin") {
        res.status(401).json({
            err: "Only admin is allowed"
        })
    } else {
        next();
    }
}