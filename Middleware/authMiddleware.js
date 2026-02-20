import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../Model/schema.js';

dotenv.config();

const authMiddleware=async (req,res,next)=>{
  const token= req.header("Authorization")
  if(!token){
    return res.status(401).json({Message:"token is missing"})
  }
  try {
    const decoded=jwt.verify(token,process.env.JWT_SECERT);
    req.user=decoded;
    const user=await User.findById(req.user._id);

    if(user.role!=="admin"){
     return res.status(401).json({Message:"Access Deny"})
    }
  } catch (error) {
    res.status(500).json({Message:"Error"})
  }
}
export default authMiddleware;