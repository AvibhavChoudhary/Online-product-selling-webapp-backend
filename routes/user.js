var express=require("express");
var router= express.Router();

const {isAdmin,isAuthenticated,isSignedIn}=require("../controllers/auth");
const {getUser,getUserById,updateUser, userPurchaseList} =require("../controllers/user");

router.param("userId",getUserById);

router.get("/user/:userId",isSignedIn, isAuthenticated ,getUser)

router.put("/update/:userId",isSignedIn,isAuthenticated,updateUser)

router.get("/orders/user/:userId",isSignedIn,isAuthenticated, userPurchaseList)

module.exports= router;