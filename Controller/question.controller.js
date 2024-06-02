import mongoose from "mongoose"
import Question from "../Model/questionModel.js";

export const askQues = async(req,res)=>{
    const postQuestionData = req.body;
    const userId = req.userId;
    const postQuestion =new Question({...postQuestionData,userPosted:userId});
    //console.log(userId,postQuestionData,postQuestion)
    try {
        await postQuestion.save();
        res.status(200).json("Posted a Question");
    } catch (error) {
        console.log(error.message);
        res.status(409).json({message:"couldn't post.. insuficient data",error:error.message})
    }
}

export const getQues = async(req,res)=>{
  try {
    const questionList =await Question.find();
    res.status(200).json(questionList);
  } catch (error) {
    console.log(error.message);
    res.status(404).json({message:"no questions found"})
  }
}

export const deleteQues = async (req,res)=>{
    try{
        const {id:_id} =await req.params;
        if(!mongoose.Types.ObjectId.isValid(_id)){
            return res.status(404).json({message:"question unavailable."})
        }
        await Question.findByIdAndDelete(_id);
        res.status(200).json({message:"deleted successfully"});
    } catch (error){
        console.log(error.message);
        res.status(404).json({message:"question unavailable"})
    }
}

export const voteQues = async (req,res)=>{
    
    try {
        
        const {id: _id} =await req.params;
        const {value} = req.body;
        const userId = req.userId;
        if(!mongoose.Types.ObjectId.isValid(_id)){
            return res.status(404).json({message:"question unavailable"});
        }
        const question =await Question.findById(_id);
        const upIndex = question.upVote.findIndex((id)=> id === String(userId));
        const downIndex = question.downVote.findIndex((id)=> id === String(userId));
        
        if(value === 'upVote'){
            if(downIndex !== -1){
                question.downVote = question.downVote.filter((id) => id !== String(userId))
            } 
            if(upIndex === -1){
                question.upVote.push(userId)
            }else{
                question.upVote = question.upVote.filter((id) => id !== String(userId))
            }
        }
        else if(value === 'downVote'){
            if(upIndex !== -1){
                question.upVote = question.upVote.filter((id) => id !== String(userId))
            } 
            if(downIndex === -1){
                question.downVote.push(userId)
            }else{
                question.downVote = question.downVote.filter((id) => id !== String(userId))
            }
        }
        await Question.findByIdAndUpdate( _id, question );
        res.status(200).json({message:"Voted Successfully"})
     } catch (error) {
        console.log(error)
     res.status(500).json({message:"id not found"})        
    }
}