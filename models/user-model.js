const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username: String,
    email:String,
    password:String,
    cart:[ 
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"product",
    }
],
    orders: [
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"product",
    },
],
    contact: Number,
});

module.exports = mongoose.model("user",userSchema);
 