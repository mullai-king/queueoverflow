import express from "express";
import auth from "../Middleware/auth.middleware.js";
import { deleteAnswer, postAnswer } from "../Controller/answer.controller.js";


const router =express.Router();

//endpoint answer

router.patch('/post/:id',auth,postAnswer);
router.patch('/delete/:id',auth,deleteAnswer);

export default router