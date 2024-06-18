const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const createUser = asyncHandler(async (req,res)=>{
    const email = req.body.email;
    const mobile = req.body.mobile;
    const userByEmail = await User.findOne({email: email});
    const userByMobile = await User.findOne({mobile: mobile});
    if(userByEmail || userByMobile){
        res.json({
            message: "User already exist"
        });
    }
    else{
        try{
            const newUser = await User.create(req.body);
            res.json({
                message: "User created successfully",
                body: newUser
            })
        }catch(err){
            throw new Error(err);
        }
    }
})

const loginUser = asyncHandler(async (req,res)=>{
    const {email, password} = req.body;
    const findUser = await User.findOne({email: email})
    if(findUser){
        if(await findUser.isPasswordMatch(password)){
            res.json({
                message: "Authenticated successful"
            })
        }else{
            res.json({
                message: "Incorrect password"
            })
        }
    }else{
        res.json({
            message: "Incorrect Email"
        })
    }
})

module.exports = {createUser, loginUser};