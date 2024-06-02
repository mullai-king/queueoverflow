import mongoose from "mongoose"
import Question from "../Model/questionModel.js";

export const getques = async(req,res)=>{
    try {
        const postQuestionData = req.body;
        const userId = req.userId;
        const postQuestion =new Question({...postQuestionData,userId});
        await postQuestion.save();
        res.status(200).json("Posted a Question")
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:"Internal server error"})
    }
}

export const askques = async(req,res)=>{
    res.status(200).json({msg:"ask question"})
}

export const deletequs = async (req,res)=>{
    
}