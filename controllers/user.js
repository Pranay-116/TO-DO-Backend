const User = require('../models/user.js');
const bcrypt = require('bcrypt');

const { sendCookie } = require('../utils/features.js');
const {ErrorHandler} = require('../middlewares/error.js')

const getAllusers = async(req,res) =>{
    const users = await User.find({});
    res.json({
        success:true,
        users,
    })
};

const updateUser = async(req,res) =>{
    const {id} = req.params;
    const users = await User.findById(id);
    res.json({
        success:true,
        message:"updated",
    })
};

const deleteUser = async(req,res) =>{
    const {id} = req.params;
    const users = await User.findById(id);
   // await users.remove();
    res.json({
        success:true,
        message:"deleted",
    })
};

const registers = async(req,res,next)=>{
    try{
   const {name,email,password} = req.body;
   //console.log(User);
   let user = await User.findOne({email});
  // console.log(user);
   if(user)
   {
    return res.status(404).json({
        success:false,
        message:"User Already Exist",
    })
   }

   const hashedPasssword = await bcrypt.hash(password,10);

  user =  await User.create({
    name,
    email,
    password:hashedPasssword,
   })

   sendCookie(user,res,201,"Registered Successfully")
    }
    catch(error)
    {
      next(error);
    }
}

const login = async(req,res,next)=>{
    try{
    const {email,password} = req.body;

    const user = await User.findOne({email}).select("+password");
    console.log(user);

    if(!user)
    {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }
    
    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch)
    {
        return res.status(401).json({
            success:false,
            message:"Invalid Email or Password",
        })
    }
    sendCookie(user,res,201,`Welcome back,${user.name}`)
}
catch(error){
    next(error);
}
}

const logout = (req,res) =>{
   res.status(201).cookie("token","",{expires: new Date(Date.now()),
    sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
    secure: process.env.NODE_ENV === "Development" ? false : true,}).json({
    success:true,
    user:req.user,
   })
}

const myProfile = (req,res)=>{
   
    res.status(201).json({
        success:true,
        user:req.user,
    })

}




module.exports  = {getAllusers,registers,login,logout,myProfile,updateUser,deleteUser}
