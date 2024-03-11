import { Schema,model } from "mongoose";
const Places = new Schema(
    {
governorate : {
    type : Schema.Types.ObjectId,
    required: true,
    ref : 'governorates'
},
name : {
    type : String,
    required: true,
},
description : {
    type : String,
    required: true,
},
rate : {
    type : Number,
    required: false,
    default : 0,
},
type : {
    type : String,
    required: true,
},
video_link : {
    type : String,
    required: false,
    default : "None",
},
Wikipedia_link : {
    type : String,
    required: false,
    default : "None",
},
location_link : {
    type : String,
    required: false,
    default : "None",
},
main_image : {
    type : String,
    required: true,
},
image_1 : {
    type : String,
    required: false,
    default : "",
},
image_2 : {
    type : String,
    required: false,
    default : "",
},
image_3 : {
    type : String,
    required: false,
    default : "",
},
image_4 : {
    type : String,
    required: false,
    default : "",
},
image_5 : {
    type : String,
    required: false,
    default : "",
},
image_6 : {
    type : String,
    required: false,
    default : "",
},
Egy_Student_Ticket : {
    type : String,
    required: false,
    default : "--",
},
Non_Egy_Student_Ticket : {
    type : String,
    required: false,
    default : "--",
},
Egy_Adults_Ticket : {
    type : String,
    required: false,
    default : "--",
},
Non_Egy_Adults_Ticket : {
    type : String,
    required: false,
    default : "--",
},
Egy_Senior_Ticket : {
    type : String,
    required: false,
    default : "--",
},
Non_Egy_Senior_Ticket : {
    type : String,
    required: false,
    default : "--",
},
Egy_Special_Needs_Ticket : {
    type : String,
    required: false,
    default : "--",
},
Non_Egy_Special_Needs_Ticket : {
    type : String,
    required: false,
    default : "--",
},
Opening_Hours : {
    type : String,
    required: false,
    default : "",
},
place_website : {
    type : String,
    required: false,
    default : "None",
},

}, { timestamps:true});
export default model('Places',Places);