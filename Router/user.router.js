import express from "express";


import { signin, signup } from "../Controller/user.controller.js";
import { deleteUser, getAllUsers, updateProfile } from "../Controller/profile.controller.js";
import auth from "../Middleware/auth.middleware.js";

//router express method 
const router =express.Router();

//end point for signup and signin
router.post("/signup",signup);
router.post("/login",signin)
//end point router getallusers and update peofile
router.get('/getAllUsers',getAllUsers)
router.patch('/update', auth,updateProfile)
router.delete("/delete", auth,deleteUser)

export default router;