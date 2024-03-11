import { Schema,model } from "mongoose";
const trip_details = new Schema(
    {
trip_id : {
    type : Schema.Types.ObjectId,
    required: true,
    ref : 'trip',
},
name : {
    type : String,
    required: true,
},
title : {
    type : String,
    required: true,
},
duration : {
    type : String,
    required: true,
},
tour_location : {
    type : String,
    required: true,
},
tour_availability : {
    type : String,
    required: true,
},
Pickup_and_Drop_Off : {
    type : String,
    required: true,
},
tour_type : {
    type : String,
    required: true,
},
tour_description : {
    type : String,
    required: true,
},
lunch_time : {
    type : String,
    required: false,
    default : "None"
},
tour_itinerary : {
    type : String,
    required: true,
},
destination_1 : {
    type : Schema.Types.ObjectId,
    required: false,
    ref : 'Places',
},
destination_2 : {
    type : Schema.Types.ObjectId,
    required: false,
    ref : 'Places',
},
destination_3 : {
    type : Schema.Types.ObjectId,
    required: false,
    ref : 'Places',
},
destination_4 : {
    type : Schema.Types.ObjectId,
    required: false,
    ref : 'Places',
},
destination_5 : {
    type : Schema.Types.ObjectId,
    required: false,
    ref : 'Places',
},
destination_6 : {
    type : Schema.Types.ObjectId,
    required: false,
    ref : 'Places',
},

}, { timestamps:true});
export default model('trip_details',trip_details);