const User = require("../models/user.js")
const jwt = require('jsonwebtoken');
const isAuthenticated = async(req,res,next) =>{
    const {token} = req.cookies;
    if(!token)
    {
       return res.status(401).json({
            success:false,
            message:"Log In First",
        })
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    req.user = user;
    next();
}
module.exports = {isAuthenticated};