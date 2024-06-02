import express from "express";


import auth from "../Middleware/auth.middleware.js";
import { askQues, deleteQues, getQues, voteQues } from "../Controller/question.controller.js";


const router = express.Router();

router.get("/get-ques",getQues);
router.post("/ask-ques",auth,askQues);
router.delete("/delete/:id",auth,deleteQues);
router.patch("/vote/:id",auth,voteQues);

export default router