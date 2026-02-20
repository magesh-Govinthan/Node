import  dotenv  from "dotenv";
import exprss from "express";
import connectDb from "./Database/Config.js";
import userRoute from "./Router/userRoute.js";

const app=exprss();
dotenv.config();

const PORT=process.env.PORT;
app.use(exprss.json());
connectDb();

app.use("/api/user",userRoute)
app.listen(PORT,()=>{
    console.log(`Server Running ${PORT}`);
    })