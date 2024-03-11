import { Schema,model } from "mongoose";
const rate = new Schema(
    {
id : {
    type : Schema.Types.ObjectId,
    required: true,
},
user : {
    type : Schema.Types.ObjectId,
    required: true,
},
rate : {
    type : Number,
    required: true,
},
}, { timestamps:true});
export default model('rate',rate);