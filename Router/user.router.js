import express from "express";


import { signin, signup } from "../Controller/user.controller.js";
import { getAllUsers, updateProfile } from "../Controller/profile.controller.js";
import auth from "../Middleware/auth.middleware.js";

//router express method 
const router =express.Router();

//end point for signup and signin
router.post("/signup",signup);
router.post("/signin",signin)

router.get('/getAllUsers',getAllUsers)
router.patch('/update/:id', auth,updateProfile)

export default router;