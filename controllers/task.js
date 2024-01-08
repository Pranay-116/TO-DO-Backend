const Task = require('../models/task.js');
const {ErrorHandler} = require('../middlewares/error.js');

const createTask = async(req,res,next) =>{
    try{
    const {title,description} = req.body;

     await Task.create({
        title,
        description,
        user:req.user,
     })

     res.status(201).json({
        success:true,
        message:"Task added successfully",

     })
    } catch(error){
         next(error);
    }
}

const getMyTasks = async(req,res,next) =>{
    try{
    const userId =  req.user._id;
    const tasks = await Task.find({user:userId});
    res.status(201).json({
        success:true,
        tasks,
    })
}
catch(error){
    next(error);

}
}

const updateTask = async(req,res,next) =>{
    try{
    const userId = req.params.id;
    const task = await Task.findById(userId);
    //console.log(task);
    if (!task) return next(new ErrorHandler("Task not found", 404));
    task.isCompleted = !task.isCompleted;
    await task.save();
    res.status(201).json({
        success:true,
        message:"Task updated Successfully",
    })
}
catch(error){
    next(error);
}

}

const deleteTask = async(req,res,next) =>{
    try{
    const userId = req.params.id;
    const task = await Task.findById(userId);
    if (!task) return next(new ErrorHandler("Task not found", 404));
    await task.deleteOne();
    res.status(201).json({
        success:true,
        message:"Task deleted successfully",
    })
}
catch(error)
{
    next(error);
}
}

module.exports = {createTask,getMyTasks,updateTask,deleteTask};
