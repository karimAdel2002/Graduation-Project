import { Schema,model } from "mongoose";
const companies = new Schema(
    {
name : {
    type : String,
    required: true,
},
description : {
    type : String,
    required: true,
},
image : {
    type : String,
    required: true,
},
link : {
    type : String,
    required: true,
},
}, { timestamps:true});
export default model('companies',companies);