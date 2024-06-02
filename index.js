//buildin imports
import express from "express";
import dontenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

//custom imports
import userRouter from "./Router/user.router.js";
import quesRouter from "./Router/question.router.js"

//config and middleware
const app =express();
dontenv.config();
const PORT= process.env.PORT ||3000;
const CONNECTION_STRING =process.env.CONNECTION_STRING;
app.use(express.json({limit:"30mb",extended:"true"}));
app.use(express.urlencoded({limit:"30mb",extended:"true"}));
app.use(cors())

//routes 
app.use("/user",userRouter);
app.use("/question",quesRouter)


//db connection
mongoose.connect(CONNECTION_STRING)
.then(()=>app.listen(PORT,()=>{console.log(`port is running on ${PORT}`);}))
.catch(err=>console.log(err))

