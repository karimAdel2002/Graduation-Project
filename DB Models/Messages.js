import { Schema,model } from "mongoose";
const messages = new Schema(
    {
sender : {
    type : Schema.Types.ObjectId,
    required: true,
},
receiver : {
    type : Schema.Types.ObjectId,
    required: true,
},
message : {
    type : String,
    required: true,
},
}, { timestamps:true});
export default model('messages',messages);