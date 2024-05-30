import express from "express"

const app =express();
const PORT=4000;

app.listen(PORT,()=>{
    console.log(`the port is running on ${PORT}`)
});

app.get("/user",(req,res)=>{
    console.log("api working");
    res.json({"msg":"api is working"})
})

