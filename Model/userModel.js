import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    about: {type: String },
    tags: {type: [String] },
    joinedOn: {type: Date, default: Date.now },
    plan: {type: String,required: true, enum: ['free', 'silver', 'gold'],default: 'free'}
});

export default mongoose.model("user",userSchema)