import { Schema,model } from "mongoose";
const trip = new Schema(
    {
name : {
    type : String,
    required: true,
},
description : {
    type : String,
    required: true,
},
price : {
    type : String,
    required: true,
},
rate : {
    type : Number,
    required: true,
},
image : {
    type : String,
    required: true,
},
}, { timestamps:true});
export default model('trip',trip);