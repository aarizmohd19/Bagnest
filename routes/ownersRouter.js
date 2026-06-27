const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model")

if(process.env.NODE_ENV === "development"){
    router.post('/create', async (req,res)=>{
        let owners = await ownerModel.find();
        if(owners.length > 0){
            return res
            .status(504)
            .send("You can't create more than one owner");
        }
            let {fullname,email,password} = req.body ;

        let Createdowner = await ownerModel.create({
                fullname,
                email,
                password,
        })

        res.send(Createdowner)
    });
}

router.get('/admin',(req,res)=>{
    let success = req.flash("success");
    res.render("createproducts",{success});
});

module.exports = router;