import { Schema,model } from "mongoose";
const music = new Schema(
    {
name : {
    type : String,
    required: true,
},
description : {
    type : String,
    required: true,
},
image : {
    type : String,
    required: true,
},
Facebook_link : {
    type : String,
    required: true,
    default:"None",
},
Instagram_link : {
    type : String,
    required: true,
    default:"None",
},
twitter_link : {
    type : String,
    required: true,
    default:"None",
},
Google_link : {
    type : String,
    required: true,
},
Wikipedia_link : {
    type : String,
    required: true,
},
song_1_Name : {
    type : String,
    required: true,
},
song_1_Released : {
    type : String,
    required: true,
},
song_1_Album : {
    type : String,
    required: true,
},
song_1_Album_link : {
    type : String,
    required: true,
    default:"None",
},
song_1_Image : {
    type : String,
    required: true,
},
song_1 : {
    type : String,
    required: true,
},
song_2_Name : {
    type : String,
    required: true,
},
song_2_Released : {
    type : String,
    required: true,
},
song_2_Album : {
    type : String,
    required: true,
},
song_2_Album_link : {
    type : String,
    required: true,
    default:"None",
},
song_2_Image : {
    type : String,
    required: true,
},
song_2 : {
    type : String,
    required: true,
},

}, { timestamps:true});
export default model('music',music);