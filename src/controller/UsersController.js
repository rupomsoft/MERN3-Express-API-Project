const UsersModel=require('../models/UsersModel');
const jwt=require("jsonwebtoken");
const OTPModel = require("../models/OTPModel");
const SendEmailUtility = require("../utility/SendEmailUtility");

exports.registration=async(req,res)=>{
    let reqBody=req.body;
    try{
       let result= await UsersModel.create(reqBody)
       res.status(200).json({status:"success",data:result})
    }
    catch (e) {
        res.status(200).json({status:"fail",data:e})
    }
}

exports.login=async (req,res)=>{
    try{
        let reqBody=req.body;
        let result= await UsersModel.find(reqBody).count('total');
        if(result===1){
            // Token issue
            let Payload={
                exp:Math.floor(Date.now()/1000)+(24*60*60),
                data:req.body['email']
            }
            let token=jwt.sign(Payload,'SecretKey123456789',{ algorithm: 'HS256' });
            res.status(200).json({status:"success",data:token})
        }
        else{
            res.status(200).json({status:"fail",data:result})
        }

    }
    catch (e) {
        res.status(200).json({status:"fail",data:e})
    }
}

exports.profileDetails=async(req,res)=>{
    try {
        let email=req.headers['email'];
        let result= await UsersModel.find({email:email});
        res.status(200).json({status:"success",data:result})
    }
    catch (e) {
        res.status(200).json({status:"fail",data:e})
    }
}



exports.SendOTP=async (req,res)=>{
    let email=req.params.email;

    let OTPCode=Math.floor(100000+Math.random()*900000);

    try{
        await OTPModel.create({email:email,otp:OTPCode}); // Database Insert

        let result=await SendEmailUtility(email,`PIN CODE IS=${OTPCode}}`,"MERN Batch 3")

        res.status(200).json({status:"success",data:result})
    }
    catch (e) {
        res.status(200).json({status:"fail",data:e})
    }



}

exports.VerifyOTP=async(req,res)=>{
    try {
        let email=req.params.email;
        let otp=req.params.otp;
        let result=await OTPModel.find({email:email,otp:otp,status:0}).count("total");
        if(result===1){
            await OTPModel.updateOne({email:email,otp:otp,status:0},{status:1})
            res.status(200).json({status:"Success",data:"Verification Success"})
        }
        else{
            res.status(200).json({status:"used",data:"Already Used"});
        }
    }
    catch (e) {
        res.status(200).json({status:"fail",data:e})
    }
}










