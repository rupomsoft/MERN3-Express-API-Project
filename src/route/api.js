const express=require('express');
const UsersController=require('../controller/UsersController');
const Tas=require('../controller/TasksController');
const AuthVerifyMiddleware=require('../middleware/AuthVerifyMiddleware')
const router=express.Router();

// Before Login
router.post("/registration",UsersController.registration);
router.post("/login",UsersController.login);
router.get("/SendOTP/:email",UsersController.SendOTP);
router.get("/VerifyOTP/:email/:otp",UsersController.VerifyOTP);

// After Login
router.get("/profile-details",AuthVerifyMiddleware,UsersController.profileDetails)

// Task
router.post("/create-task",AuthVerifyMiddleware,Tas.createTask);
router.get("/delete-task/:id",AuthVerifyMiddleware,Tas.deleteTask);
router.post("/update-task/:id",AuthVerifyMiddleware,Tas.updateTask);
router.get("/list-task-by-status/:status",AuthVerifyMiddleware,Tas.listTaskByStatus);


module.exports=router;