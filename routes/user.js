const express = require('express');
const router = express.Router();
const { getAllusers, registers, myProfile,updateUser,deleteUser, login, logout } = require('../controllers/user.js');
const {isAuthenticated} = require("../middlewares/auth.js")


router .get("/",(req,res)=>{
    res.send('Nice Work');
})

router.get("/all",getAllusers);
router.post("/new",registers);
router.post('/login',login);
router.get("/me",isAuthenticated,myProfile);
router.get("/logout",logout);
router.put("/userId/:id",updateUser);
router.delete("/userId/:id",deleteUser);


module.exports = router;