const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {generateToken} = require("../utils/generateToken")

module.exports.registerUser = async (req,res)=>{
    try{

        let {username,email,password} = req.body;

        let existingUser = await userModel.findOne({email});
         if(existingUser) {
             return res.status(400).send("You already have an Account ,Please login");
        }

        bcrypt.genSalt(10,function (err,salt) {
            bcrypt.hash(password,salt, async function(err,hash) {
                if(err) res.send(err.message);
                else {
                    let user = await userModel.create({
                        username,
                        email,
                        password:hash,
                    }); 
            
                let token = generateToken(user);
                res.cookie("token",token);
                res.send("User Created")
                }
            })
        })
        
    } catch(err){
        res.send(err.message)
    }

}

module.exports.loginUser = async (req,res) => {
    let {email,password} = req.body;

    let user = await userModel.findOne({email});
    if(!user)
        return res.status(401).send("Email or Password is incorrect")


    bcrypt.compare(password,user.password,function (err,result) {
        if(result){
            let token = generateToken(user);
            res.cookie("token",token);
            res.send("You can login")
        } else {
            res.status(406).send("Email or Password is  incorrect")
        }
    })
}