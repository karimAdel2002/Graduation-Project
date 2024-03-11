import { Schema,model } from "mongoose";
const comments = new Schema(
    {
id : {
    type : Schema.Types.ObjectId,
    required: false,
},
user : {
    type : Schema.Types.ObjectId,
    required: true,
    ref : 'Tourists_Acc'
},
type : {
    type : String,
    required: true,
},
comment : {
    type : String,
    required: true,
},
likes : {
    type : Number,
    required: false,
    default : 0,
},
}, { timestamps:true});
export default model('comments',comments);