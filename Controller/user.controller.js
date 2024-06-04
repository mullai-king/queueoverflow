import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

import user from "../Model/userModel.js";

//signup controller 
export const signup = async (req,res)=>{
   try {
        //getting user inputs
        const {name,email,password} = req.body;
        //check user already exist
        const existUser = await user.findOne({email})
        if(existUser){
            return res.status(400).json({ message: "Email already registered" });
        }
        
        const hashPassword = await bcrypt.hash(password,12);
        //create new user
        const newUser =await user.create({name,email,password:hashPassword});
        const token = jwt.sign({email:newUser.email,id:newUser._id},process.env.JWT_SECRET_KEY,{expiresIn:"1h"})
        res.status(200).json({data:newUser,token});

   } catch (error) {
        res.status(500).json({ error: "Something went wrong" })
        // console.log(error.message)
   }
}
//signin controller
export const signin =async(req,res)=>{
    try {
        //getting user inputs
        const {email,password}=req.body;
        //checking is already exist
        const existUser = await user.findOne({email});
        //console.log(existUser);
        if(!existUser){
            return res.status(400).json({ message: "User doesn't exist" });
        }
        const passwordCorrect =await bcrypt.compare(password,existUser.password);
        if(!passwordCorrect){
            return res.status(400).json({ message: "Password Wrong" })
        }
        const token = jwt.sign({email:existUser.email,id:existUser._id},process.env.JWT_SECRET_KEY,{expiresIn:"1h"});
        res.status(200).json({data:existUser,token})
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" })
        // console.log(error.message)
    }
}