import mongoose from "mongoose";

const QuestionSchema = mongoose.Schema({
    questionTitle:{type:String,required:"Question must have a tittle"},
    questionBody:{type:String,required:"Question must have a body"},
    questionTags:{type:[String],required:"Question must have a tag"},
    userPosted:{type:String,required:"Question must have a author"},
    noOfAnswers:{type:Number,default:0},
    upVote:{type:[String],default:[]},
    downVote:{type:[String],default:[]},
    userId:{type:String},
    askedOn:{type:Date,default:Date.now},
    answer:[{
        answerBody:String,
        userAnswered:String,
        userId:String,
        answeredOn:{type:Date,default:Date.now}
    }]
});

export default mongoose.model("Question",QuestionSchema);