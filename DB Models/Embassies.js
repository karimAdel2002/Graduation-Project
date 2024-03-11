import { Schema,model } from "mongoose";
const embassies = new Schema(
    {
name : {
    type : String,
    required: true,
},
image : {
    type : String,
    required: true,
},
address : {
    type : String,
    required: true,
},
telephone : {
    type : String,
    required: true,
},
email : {
    type : String,
    required: true,
},
office_Hours : {
    type : String,
    required: true,
},

}, { timestamps:true});
export default model('embassies',embassies);