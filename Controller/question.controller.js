import mongoose from "mongoose"
import Question from "../Model/questionModel.js";
import User from "../Model/userModel.js";


const getQuestionAskedToday = async (id) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0)
    const response = await Question.aggregate([
        { $match: { userId: id, askedOn: { $gte: today } } },
        { $count: "questionCount" }
    ])
    return { questionCount: 0, ...response[0] }

}

const getUserPlan = async (id) => {
    const response = await User.findById(id)
    return response.plan
}

export const askQues = async(req,res)=>{
    const postQuestionData = req.body;
    const postQuestion = new Question({ ...postQuestionData, userId: req.userId })
    try {
        //checking daily limit
        const { questionCount } = await getQuestionAskedToday(req.userId)
        const plan = await getUserPlan(req.userId)
        if (plan === "free" && questionCount > 100) {
            return res.status(400).json({ message: "Daily limit exhausted. Try again tomorrow or change your plan." })
        } else if (plan === "silver" && questionCount > 9) {
            return res.status(400).json({ message: "Daily limit exhausted. Try again tomorrow or change your plan." })
        }
        await postQuestion.save();
        res.status(200).json({ message: "posted a question successfully" })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message })
    }
}

export const getQues = async(req,res)=>{
  try {
    const questionList =await Question.find().sort({ askedOn: -1 });
    res.status(200).json(questionList);
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ error: err.message })
  }
}

export const deleteQues = async (req,res)=>{
    try{
        const {id:_id} =await req.params;
        if(!mongoose.Types.ObjectId.isValid(_id)){
            return res.status(404).json({ error: "Question unavailable" })
        }
        await Question.findByIdAndDelete(_id);
        res.status(200).json({message:"Deleted Successful"});
    } catch (error){
        console.log(error.message);
        res.status(404).json({ error: err.message })
    }
}

export const voteQues = async (req,res)=>{
    
    try {
        
        const {id: _id} =await req.params;
        const {value} = req.body;
        const userId = req.userId;
        if(!mongoose.Types.ObjectId.isValid(_id)){
            return res.status(404).json({ error: "Question unavailable" })
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
        res.status(200).json({message:"voted successfully"})
     } catch (error) {
        console.log(error)
        res.status(404).json({ error: err.message })       
    }
}