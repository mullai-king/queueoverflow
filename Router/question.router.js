import express from "express";


import auth from "../Middleware/auth.middleware.js";
import { getques } from "../Controller/question.controller.js";


const router = express.Router();

router.get("/get-ques",getques);
// router.post("/ask-ques",auth,)
// router.delete("/delete:id",auth,)
// router.patch("/vote:id",auth,)

export default router