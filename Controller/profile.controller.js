
import mongoose from "mongoose"
import bcrypt from "bcrypt"
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
    res.status(500).json({ error: "Something went wrong" })
    console.log(error.message)
   }
}

// update profile details 
export const updateProfile = async (req,res)=>{
    const _id = req.userId;
    const {name, about, tags, password} =req.body;
    // console.log(_id);
    //object validation with mongodb
   if(!mongoose.Types.ObjectId.isValid(_id)){
    return res.status(404).json({ message: "User unavailable" })
    }
    try {
        let hashedPassword;
        if (password) {
            hashedPassword = await bcrypt.hash(password,12);
        }
        const updatedProfile = await users.findByIdAndUpdate( _id, { $set: { 'name': name, 'about': about, 'tags': tags , 'password' :hashedPassword}}, { new: true } )
        if (!updatedProfile) {
            return res.status(400).json({ message: "No user found" })
        }
        res.status(200).json(updatedProfile)
    } catch (error) {
        console.log(error.message);
        res.status(405).json(error.message);
    }
}

export  const deleteUser = async (req, res) => {
    try {
        const _id = req.userId;
        const deletedData = await users.findByIdAndDelete(_id);
        res.status(200).json({ message: "Deleted Successfully" })
    } catch (err) {
        // console.log(err.message);
        res.status(500).json({ error: "Something Went Wrong" })
    }
}