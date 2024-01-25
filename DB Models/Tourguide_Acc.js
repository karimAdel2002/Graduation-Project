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
phone : {
    type : String,
    required: false,
},
image : {
    type : String,
    required: false,
},
work_gov1 : {
    type : Schema.Types.ObjectId,
    required: false,
    ref : 'governorates'
},
work_gov2 : {
    type : Schema.Types.ObjectId,
    required: false,
    ref : 'governorates'
},
Account_Nom : {
    type : String,
    required: false,
},
Rate_Nom : {
    type : String,
    required: false,
},
state : {
    type : String,
    required: true,
},
}, { timestamps:true});
export default model('Tourguide_Acc',tourguidesAccounts);