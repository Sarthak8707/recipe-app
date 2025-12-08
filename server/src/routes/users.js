import express from "express";
import {UserModel} from "../models/Users.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await UserModel.findOne({username});
    if(user){
        return res.json({message: "Username already exists"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({username, password: hashedPassword})

    await newUser.save();

    res.json({message: "User created successfully"})

})


router.post("/login", async (req, res) => {
    const {username, password} = req.body;
    const user = await UserModel.findOne({username});
    if(!user){
        return res.json({message: "User Doesn't Exist"});
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(!isPasswordCorrect){
        return res.json({message: "Username or Password is Incorrect"})
    }

    const token = jwt.sign({id: user._id}, "secret");
    return res.json({token, userID: user._id});
})

export {router as userRouter}