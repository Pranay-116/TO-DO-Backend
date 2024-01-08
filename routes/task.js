const express = require('express');
const router = express.Router();
const {isAuthenticated} = require("../middlewares/auth.js");
const { createTask, getMyTasks, updateTask, deleteTask } = require('../controllers/task.js');



router.post("/new",isAuthenticated,createTask);
router.get("/myTasks",isAuthenticated,getMyTasks)
router.put("/:id",isAuthenticated,updateTask)
router.delete("/:id",isAuthenticated,deleteTask)

module.exports = router;