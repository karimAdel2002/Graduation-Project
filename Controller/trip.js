import Trip_details from "../DB Models/Trip_details.js";
import Trips from "../DB Models/Trips.js";
import Places from "../DB Models/Places.js";
import axios from "axios";
import dotenv from "dotenv";
import bills from "../DB Models/Bills.js"
import tourist from "../DB Models/Tourists_Acc.js"
import tourguide from "../DB Models/Tourguide_Acc.js"
import admin from "../DB Models/Admin_Acc.js"

dotenv.config();

export const go_trip_page = async (req, res) => { 
    const {name} = req.params
    const trip = await Trip_details.findOne({name}).populate('trip_id').populate('destination_1').populate('destination_2').populate('destination_3').populate('destination_4').populate('destination_5').populate('destination_6').lean()
    const trip_price = await Trips.findOne({name}).lean()
    let idList = []
    if(trip==null){
        console.log("No information for this page")
    }else{
    if(trip.destination_1 != undefined){
        const des_1 = await Places.findOne({_id:trip.destination_1}).populate('governorate').lean();
        idList.push(des_1)
    }
    if(trip.destination_2 != undefined){
        const des_2 = await Places.findOne({_id:trip.destination_2}).populate('governorate').lean();
        idList.push(des_2)
    }
    if(trip.destination_3 != undefined){
        const des_3 = await Places.findOne({_id:trip.destination_3}).populate('governorate').lean();
        idList.push(des_3)
    }
    if(trip.destination_4 != undefined){
        const des_4 = await Places.findOne({_id:trip.destination_4}).populate('governorate').lean();
        idList.push(des_4)
    }
    if(trip.destination_5 != undefined){
        const des_5 = await Places.findOne({_id:trip.destination_5}).populate('governorate').lean();
        idList.push(des_5)
    }
    if(trip.destination_6 != undefined){
        const des_6 = await Places.findOne({_id:trip.destination_6}).populate('governorate').lean();
        idList.push(des_6)
    }
            
}
    // await Trip_details.create({
    //     trip_id :"65b7bc6bc342eef4d9aec6ed" ,
    //     name,
    //     title : "Day Tour in Cairo and the Pyramids" ,
    //     duration: "1 Day",
    //     tour_location: "Cairo / Giza",
    //     tour_availability: "Everyday",
    //     Pickup_and_Drop_Off: "Your Hotel in Cairo Downtown or Giza Area/Any Others, Extra Charge",
    //     tour_type: "Private",
    //     tour_description: "Day tour in Cairo and the Pyramids is a gift from the heavens to witness celestial pieces of art and glory that achieved immortality. Egypt Tours Portal will use its stature as the best and most trusted travel agency in Egypt to provide our guests with the most magical adventure. Our clients will be accompanied by a private air-conditioned vehicle and an expert private tour guide across Cairo to visit the Giza Pyramids, the Great Sphinx of (King Chephren), then move to explore ancient Egyptian artifacts in the Egyptian museum, then proceed to visit one of the most famous bazaars in the Middle East argetKhan EL Khalili Bazaar, then we drive you back to your hotel in Cairo. Book this tour as soon as possible and make every moment of your time in Egypt worthy of remembering.",
    //     lunch_time: "Lunch on Nile boats 2024 with artistic performances, a luxurious open buffet lunch. Matic offers in... A restaurant and café are available on the roof. There are places available in remote areas for those who love quiet.",
    //     tour_itinerary: "We will pick you up from your hotel in the morning in a private air-conditioned vehicle, joined by your tour guide to start the exploration of the day tour in one of the seven wonders of the world.",
    //     destination_1: "65bd863aac86aea7611880d8",
    //     description_1: "The Great Library of Alexandria in Alexandria, Egypt, was one of the largest and most significant libraries of the ancient world. The library was part of a larger research institution called the Mouseion, which was dedicated to the Muses, the nine goddesses of the arts.[10] The idea of a universal library in Alexandria may have been proposed by Demetrius of Phalerum, an exiled Athenian statesman living in Alexandria, to Ptolemy I Soter, who may have established plans for the Library, but the Library itself was probably not built until the reign of his son Ptolemy II Philadelphus.",
    //     destination_2: "65bd863aac86aea7611880da",
    //     description_2: "The Qaitbay Citadel in Alexandria is considered one of the most important defensive strongholds, not only in Egypt, but also along the Mediterranean Sea coast. It formulated an important part of the fortification system of Alexandria in the 15th century AD.",
    //     destination_3: "65bd863aac86aea7611880dc",
    //     description_3: "The museum houses major jewelry pieces and art acquisitions of the dynasty of Muhammad Ali and his descendants, who ruled Egypt for nearly 150 years from 1805 until the 1952 movement. The mother of Princess Fatima had completed the construction of the western wing before her death, when her daughter had reached the age of eighteen. Princess Fatima added an eastern wing to the palace and linked the two wings with a beautiful corridor. The Palace remained in use for summer residence until July 1952. When the princess's property was confiscated, she was allowed to reside in the palace. This was until 1964, when Princess Fatima al-Zahra (ceded) the palace to the Egyptian government and left for Cairo. Princess Fatima al-Zahra died in 1983.",
    //     destination_4: "65bd863aac86aea7611880de",
    //     description_4: "The extensive Montaza Palace grounds first had the Salamlek Palace, built in 1892 by Khedive Abbas II, the last Muhammad Ali Dynasty ruler to hold the Khedive title over the Khedivate of Egypt and Sudan. It was used as a hunting lodge and residence for his companion , The larger El-Haramlek Palace and royal gardens were added to the Montaza Palace grounds, being built by King Fuad I in 1932, as a summer palace. It is in a mixture of Ottoman and Florentine styles, with two towers. One of these towers rises distinctively high above with elaborated Italian Renaissance design details. The palace has long open arcades facing the sea along each floor.President Anwar El-Sadat renovated the original Salamlek Palace as an official presidential residence. It was most recently used by former president Hosni Mubarak.",
    // });
    res.cookie('trip_name',name)
    // Know the user type
    const {UserType} = req.cookies;
    console.log(UserType)
    res.render('Trip/index' , {trip ,trip_price : trip_price.price ,idList ,UserType})
};

export const payment = async (req,res) => { 
    
    res.render('Trip/payment')
}
