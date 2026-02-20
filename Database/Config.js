import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()


 const connectDb=async()=>{
  
    try {
          const connection= await mongoose.connect(process.env.MONGODB);
      
        console.log("Connected");
        
    } catch (error) {
        console.log(error);
        
    }
}

export default connectDb;