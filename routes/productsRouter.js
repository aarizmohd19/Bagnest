const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product-model")

router.post('/create',upload.single("image"), async (req,res)=>{
  try{
  let {name,price,discount,bgcolor,panelcolor,textcolor} = req.body;

  let product = await productModel.create({
    name,
    image:req.file.buffer,
    price,
    discount,
    bgcolor,
    panelcolor,
    textcolor,
   })
    req.flash("success","Product Created Successfully");
     res.redirect("/owners/admin");
    } catch (err){
      res.send(err.message);
    }
});

module.exports = router;