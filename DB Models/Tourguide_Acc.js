import { Schema,model } from "mongoose";
const tourguidesAccounts = new Schema(
    {
name : {
    type : String,
    required: true,
},
username : {
    type : String,
    required: true,
},
password : {
    type : String,
    required: true,
},
governorate : {
    type : String,
    required: true,
},
gender : {
    type : String,
    required: true,
},
Tourguide_papers_new: {
    type: String,
    required: true,
},
Tourguide_papers_original: {
    type: String,
    required: true,
},
state : {
    type : String,
    required: false,
    default : "Blocked",
},
rate : {
    type : Number,
    required: false,
    default: 0,
},
Bio : {
    type : String,
    required: false,
    default: "",
},
facebook_link : {
    type : String,
    required: false,
    default: "",
},
instagram_link : {
    type : String,
    required: false,
    default: "",
},
linkedin_link : {
    type : String,
    required: false,
    default: "",
},
image : {
    type : String,
    required: false,
    default: "Avatar.png",
},
}, { timestamps:true});
export default model('Tourguide_Acc',tourguidesAccounts);