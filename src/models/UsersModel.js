const mongoose=require('mongoose')

const UsersSchema=mongoose.Schema(
    {
        email:{type:String,unique:true},
        firstName:{type:String},
        lastName:{type:String},
        mobile:{type:String},
        password:{type:String},
    },
    {timestamps:true,versionKey:false}
)

const UsersModel=mongoose.model('users',UsersSchema);
module.exports=UsersModel;