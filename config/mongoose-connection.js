const mongoose = require("mongoose");
const dbgr = require("debug")("development:mongooose");

mongoose.connect(process.env.MONGODB_URI)
.then(function(err){
    dbgr("Connected");
})
.catch(function(err){
    dbgr(err)
})