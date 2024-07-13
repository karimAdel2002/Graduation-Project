import { Schema,model } from "mongoose";
const contact = new Schema(
    {
user_id : {
    type : Schema.Types.ObjectId,
    required: true,
    ref : 'Tourists_Acc'
},
type : {
    type : String,
    required: true,
},
subject : {
    type : String,
    required: true,
},
message : {
    type : String,
    required: true,
},
reply : {
    type : String,
    required: true,
    default : "None"
},
}, { timestamps:true});
export default model('contact',contact);