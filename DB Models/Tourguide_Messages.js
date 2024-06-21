import { Schema,model } from "mongoose";
const Tourguide_Messages = new Schema(
    {
sender : {
    type : Schema.Types.ObjectId,
    required: true,
    ref : 'Tourguide_Acc'
},
receiver : {
    type : Schema.Types.ObjectId,
    required: true,
    ref : 'Tourists_Acc'
},
message : {
    type : String,
    required: true,
},
replay : {
    type : String,
    required: true,
    default:"None",
},
}, { timestamps:true});
export default model('Tourguide_Messages',Tourguide_Messages);