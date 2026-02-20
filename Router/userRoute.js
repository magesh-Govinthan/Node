import express from "express"
import { getUser, loginUser, registerUser } from "../Controller/UserController.js";
import authMiddleware from "../Middleware/authMiddleware.js";

const router=express.Router();

router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/getuser",authMiddleware,getUser)

export default router