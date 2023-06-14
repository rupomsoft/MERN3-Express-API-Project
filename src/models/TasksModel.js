const mongoose=require('mongoose')

const TasksSchema=mongoose.Schema(
    {
        email:{type:String},
        title:{type:String},
        description:{type:String},
        status:{type:String}
    },
    {timestamps:true,versionKey:false}
)

const TasksModel=mongoose.model('tasks',TasksSchema);
module.exports=TasksModel;