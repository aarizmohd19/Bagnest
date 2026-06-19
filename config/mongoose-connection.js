const mongoose = require("mongoose");
const config = require("config");
const dbgr = require("debug")("development:mongooose");

mongoose.connect(`${config.get("MONGODB_URI")}/Bagnest`)
.then(function(err){
    dbgr("Connected");
})
.catch(function(err){
    dbgr(err)
})