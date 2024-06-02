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
            return res.status(404).json({message:"user already exist."});
        }
        
        const hashPassword = await bcrypt.hash(password,12);
        //create new user
        const newUser =await user.create({name,email,password:hashPassword});
        const token = jwt.sign({email:newUser.email,id:newUser._id},process.env.JWT_SECRET_KEY,{expiresIn:"1h"})
        res.status(201).json({result:newUser,token});

   } catch (error) {
        res.status(500).json({message:"internal server error"});
        console.log(error.message)
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
            return res.status(404).json({msg:"no account found"})
        }
        const passwordCorrect =await bcrypt.compare(password,existUser.password);
        if(!passwordCorrect){
            return res.status(400).json({msg:"Invalid password"})
        }
        const token = jwt.sign({email:existUser.email,id:existUser._id},process.env.JWT_SECRET_KEY,{expiresIn:"1h"});
        res.status(200).json({result:existUser,token})
    } catch (error) {
        res.status(500).json({message:"internal server error"});
        console.log(error.message)
    }
}