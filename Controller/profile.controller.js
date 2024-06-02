
import mongoose from "mongoose"
import users from "../Model/userModel.js"

//get all user details
export const getAllUsers =async (req,res)=>{
   try {
    const allUsers =await users.find();
    const allUserDetails = [];
    allUsers.forEach(user => {
        allUserDetails.push({ id:user._id, name:user.name, email:user.email, about:user.about, tags:user.tags, joinedOn:user.joinedOn})
    });
    res.status(200).json(allUserDetails)
   } catch (error) {
    res.status(500).json({message:"server internal error"});
    console.log(error.message)
   }
}

// update profile details 
export const updateProfile = async (req,res)=>{
    try {
        const {id: _id} = req.params;
        const {name, about, tags} =req.body;
        
        //object validation with mongodb
       if(!mongoose.Types.ObjectId.isValid(_id)){
            return res.status(404).json("object id not matched");
        }
        const updatedProfile = await users.findByIdAndUpdate( _id, { $set: { 'name': name, 'about': about, 'tags': tags }}, { new: true } )
        if (!updatedProfile) {
            return res.status(404).json({ msg: "Profile not found" });
        }
        res.status(200).json(updatedProfile)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({msg:"internal server error"});
    }
}