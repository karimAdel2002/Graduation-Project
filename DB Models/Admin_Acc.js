import { Schema,model } from "mongoose";
const AdminAccounts = new Schema(
    {
fname : {
    type : String,
    required: true,
},
lname : {
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
}, { timestamps:true});
export default model('Admin_Acc',AdminAccounts);