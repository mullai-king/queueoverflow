import express from "express";


import auth from "../Middleware/auth.middleware.js";
import { askQues, deleteQues, getQues, voteQues } from "../Controller/question.controller.js";


const router = express.Router();

router.get("/",getQues);
router.post("/",auth,askQues);
router.delete("/:id",auth,deleteQues);
router.patch("/vote/:id",auth,voteQues);

export default router;