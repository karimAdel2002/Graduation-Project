import { Schema,model } from "mongoose";
const bills = new Schema(
    {
user_id : {
    type : Schema.Types.ObjectId,
    required: true,
    ref : 'Tourists_Acc'
},
trip : {
    type : String,
    required: true,
},
pending : {
    type : String,
    required: true,
},
amount_cents : {
    type : String,
    required: true,
},
success : {
    type : String,
    required: true,
},
order : {
    type : String,
    required: true,
},
created_at : {
    type : String,
    required: true,
},
currency : {
    type : String,
    required: true,
},
owner : {
    type : String,
    required: true,
},

}, { timestamps:true});
export default model('bills',bills);