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
phone : {
    type : String,
    required: false,
},
Tourguide_papers_new: {
    type: String,
    required: false,
},
Tourguide_papers_original: {
    type: String,
    required: false,
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
languages : {
    type : [String],
    required: false,
},
image : {
    type : String,
    required: false,
    default: "Avatar.png",
},
Experience : {
    type : String,
    required: false,
    default: "",
},
Hourly_Rate : {
    type : String,
    required: false,
    default: "",
},
Total_Tours : {
    type : String,
    required: false,
    default: "",
},
English_Level : {
    type : String,
    required: false,
    default: "",
},
Availability : {
    type : String,
    required: false,
    default: "",
},
}, { timestamps:true});
export default model('Tourguide_Acc',tourguidesAccounts);