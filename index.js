//buildin imports
import express from "express";
import dontenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

//middleware 
const app =express();
dontenv.config();
const PORT= process.env.PORT ||3000;
const CONNECTION_STRING =process.env.CONNECTION_STRING;
app.use(express.json({limit:"30mb",extended:"true"}));
app.use(express.urlencoded({limit:"30mb",extended:"true"}));
app.use(cors())

// app.listen(PORT,()=>{
//     console.log("port is running default");
// })
//test api
app.get("/test",(req,res)=>{
    res.json({"msg":"testing"});
    console.log(`test api`)
}) 

//port listen

mongoose.connect(CONNECTION_STRING)
.then(()=>app.listen(PORT,()=>{console.log(`port is running on ${PORT}`);}))
.catch(err=>console.log(err))

