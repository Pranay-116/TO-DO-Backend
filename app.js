const express = require('express');
const app = express();
const userRouter = require('./routes/user.js');
const taskRouter = require('./routes/task.js');
const { connectDB } = require('./data/database.js');
const config = require('dotenv').config({ path: './data/config.env' });
const cookieParser = require('cookie-parser');
const {errorMiddleware} = require('./middlewares/error.js')
const cors = require('cors');



//Using middleware
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['GET','POST','PUT','DELETE'],
    credentials:true,
})
)
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/task',taskRouter);
// Using Error Middleware
app.use(errorMiddleware);

connectDB();

app.listen(process.env.PORT,()=>{
    console.log(`Server is working on port :${process.env.PORT} in ${process.env.NODE_ENV} Mode`);
})