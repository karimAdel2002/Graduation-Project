import governorates from "../DB Models/governorates.js"
import Places from "../DB Models/Places.js"
import Rate from "../DB Models/Rate.js"
import Comments from "../DB Models/Comments.js";
import Tourists_Acc from "../DB Models/Tourists_Acc.js";



export const index = async (req, res) => { 
    const { name } = req.params;
    const the_governorate = await governorates.findOne({name}).lean()
    if(the_governorate==null){
        res.send("There is no Governorate with this name")
    }
    else{
        const theTourist_Places = await Places.find({governorate:the_governorate._id ,type:"Tourism"}).populate('governorate').lean();
        const thePopular_places = await Places.find({governorate:the_governorate._id ,type:"Popularity"}).populate('governorate').lean();
        const comments = await Comments.find({id :the_governorate._id}).populate('user').lean();
        const tourist = await Tourists_Acc.findOne({_id : req.id}).lean();
        
    
        
        
                                  
        // await Popular_places.create({
        //     governorate: the_governorate._id,
        //     name: "Popular_places 1",
        //     description: "The Qaitbay Citadel in Alexandria is considered one of the most important defensive strongholds, not only in Egypt, but also along the Mediterranean Sea coast. It formulated an important part of the fortification system of Alexandria in the 15th century AD.",
        //     rate :"4.5",
        //     image: "QaitbeyCitadel.jpg",
        // }); 
        // await Popular_places.create({
        //     governorate: the_governorate._id,
        //     name: "Popular_places 2",
        //     description: "The museum houses major jewelry pieces and art acquisitions of the dynasty of Muhammad Ali and his descendants, who ruled Egypt for nearly 150 years from 1805 until the 1952 movement. The mother of Princess Fatima had completed the construction of the western wing before her death, when her daughter had reached the age of eighteen. Princess Fatima added an eastern wing to the palace and linked the two wings with a beautiful corridor. The Palace remained in use for summer residence until July 1952. When the princess's property was confiscated, she was allowed to reside in the palace. This was until 1964, when Princess Fatima al-Zahra (ceded) the palace to the Egyptian government and left for Cairo. Princess Fatima al-Zahra died in 1983.",
        //     rate :"3.6",
        //     image: "AlexRoyalJewelleryMusLeft.jpg",
        // }); 
        // await Popular_places.create({
        //     governorate: the_governorate._id,
        //     name: "Popular_places 3",
        //     description: "The extensive Montaza Palace grounds first had the Salamlek Palace, built in 1892 by Khedive Abbas II, the last Muhammad Ali Dynasty ruler to hold the Khedive title over the Khedivate of Egypt and Sudan. It was used as a hunting lodge and residence for his companion , The larger El-Haramlek Palace and royal gardens were added to the Montaza Palace grounds, being built by King Fuad I in 1932, as a summer palace. It is in a mixture of Ottoman and Florentine styles, with two towers. One of these towers rises distinctively high above with elaborated Italian Renaissance design details. The palace has long open arcades facing the sea along each floor.President Anwar El-Sadat renovated the original Salamlek Palace as an official presidential residence. It was most recently used by former president Hosni Mubarak.",
        //     rate :"3.5",
        //     image: "Montaza_Palace.jpg",
        // });
        // await Popular_places.create({
        //     governorate: the_governorate._id,
        //     name: "Popular_places 4",
        //     description: "The idea of reviving the old legendary library dates back to 1974 when a committee set up by Alexandria University selected a plot of land for its new library between the campus and the seafront, close to where the ancient library once stood. The recreation of the renowned ancient library was not only adopted by other individuals and agencies, it garnered support from various Egyptian politicians. One leading supporter of the project was former Egyptian President, Hosni Mubarak; along with a partnership with the United Nations Educational, Scientific, and Cultural Organization (UNESCO), (headquartered in Paris, France) was also quick to embrace the concept of endowing the Mediterranean region with a center of cultural and scientific excellence and restoring a cultural legend of the Ancient World.",
        //     rate :"4.8",
        //     image: "300px-Alexandria's_Bibliotheca.jpg",
        // }); 
        
        // await governorates.findByIdAndUpdate(id, { $set: { places_number : 8} })
        res.render('Governorates/index',{Tourist_Places:theTourist_Places ,Popular_places:thePopular_places,the_governorate ,comments,tourist})
    }
    
};


export const rate = async (req, res) => { 
    let { place , rate} = req.params
    rate = Number(rate)
    const place_rate = await Rate.findOne({id:place , user:req.id}).lean();
    if(place_rate===null){
        await Rate.create({
            id: place ,
            user: req.id,
            rate : rate,
        }); 
    }
    if(place_rate!==null){
        await Rate.findByIdAndUpdate(place_rate._id , { $set: { rate : rate} })
    }

    let sum = 0;
    const place_rates = await Rate.find({id:place}).lean();
    for(let i = 0 ; i < place_rates.length ; i++ ){
     sum = sum + place_rates[i].rate ;   
    }
    let total_rate = sum / place_rates.length ;
    await Places.findByIdAndUpdate(place, { $set: { rate : total_rate} })
    res.status(204).send()
};


export const comments = async (req, res) => { 
    console.log(req.body)
    let {comment , id} = req.body
    await Comments.create({
        id: id ,
        user: req.id,
        type: "Place",
        comment : comment,
    }); 
    res.status(204).send()
};