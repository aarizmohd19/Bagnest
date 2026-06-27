const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {generateToken} = require("../utils/generateToken")

module.exports.registerUser = async (req,res)=>{
    try{

        let {username,email,password} = req.body;

        let existingUser = await userModel.findOne({email});
         if(existingUser) {
             return req.flash("error","You already have an Account ,Please login");
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
                res.redirect("/shop");
                }
            })
        })
        
    } catch(err){
        res.send(err.message)
    }

}

module.exports.loginUser = async (req,res) => {
    try {
        let {email,password} = req.body;
        
        let user = await userModel.findOne({email});
        if(!user){
            req.flash("error","Email or Password is  incorrect");
            return res.redirect("/");
        }
        
        
        bcrypt.compare(password,user.password,function (err,result) {
            if(result){
            let token = generateToken(user);
            res.cookie("token",token);
            res.redirect("/shop");
        } else {
            req.flash("error","Email or Password is  incorrect");
            return res.redirect("/")
            
        }
    })
    }
    catch (err) {
        res.send(err.message);
    }
} 

module.exports.logout= (req,res) => {
    res.cookie("token","");
    res.redirect("/")
}