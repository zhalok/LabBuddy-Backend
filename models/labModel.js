const mongoose = require("mongoose");
const labSchema = new mongoose.Schema({
    type: { type: String, required: true },
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    users:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ]
});
const labModel = mongoose.model("Lab", labSchema);
module.exports = labModel;
