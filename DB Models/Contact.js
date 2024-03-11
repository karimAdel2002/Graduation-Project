import { Schema,model } from "mongoose";
const contact = new Schema(
    {
tourist_id : {
    type : Schema.Types.ObjectId,
    required: true,
    ref : 'Tourists_Acc'
},
subject : {
    type : String,
    required: true,
},
message : {
    type : String,
    required: true,
},
}, { timestamps:true});
export default model('contact',contact);