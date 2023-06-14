const express=require('express');
const UsersController=require('../controller/UsersController');
const AuthVerifyMiddleware=require('../middleware/AuthVerifyMiddleware')

const router=express.Router();

// Before Login
router.post("/registration",UsersController.registration);
router.post("/login",UsersController.login);
router.get("/SendOTP/:email",UsersController.SendOTP);
router.get("/VerifyOTP/:email/:otp",UsersController.VerifyOTP);



// After Login
router.get("/profile-details",AuthVerifyMiddleware,UsersController.profileDetails)


module.exports=router;