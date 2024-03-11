import { Schema,model } from "mongoose";
const governorates = new Schema(
    {
name : {
    type : String,
    required: true,
},
description : {
    type : String,
    required: true,
},
Wikipedia_link : {
    type : String,
    required: true,
},
weather_link : {
    type : String,
    required: true,
},
video_link : {
    type : String,
    required: true,
},
image : {
    type : String,
    required: true,
},
popular : {
    type : String,
    required: true,
},
places_number : {
    type : Number,
    required: false,
    default : 0,
},
Tourguides : {
    type :  [{ type: Schema.Types.ObjectId, ref: 'Tourguide_Acc' }],
    required: false,
},
}, { timestamps:true});
export default model('governorates',governorates);