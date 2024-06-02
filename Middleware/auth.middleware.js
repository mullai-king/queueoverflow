import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const auth =(req,res,next)=>{
    const token =req.headers.authorization.split(' ')[1];
    if(!token){
        return res.status(401).json({message:"tocken is missing"})
    }
    try {
        let decodeData =jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.userId = decodeData?.id
        next()
    } catch (error) {
        console.log(error.message)
        return res.status(500).json(error.message);
    }
}
export default auth