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
        
    
        
        
        // await Places.create({
        //     governorate: the_governorate._id,
        //     name: "Library of Alexandria",
        //     description: "The Great Library of Alexandria in Alexandria, Egypt, was one of the largest and most significant libraries of the ancient world. The library was part of a larger research institution called the Mouseion, which was dedicated to the Muses, the nine goddesses of the arts.[10] The idea of a universal library in Alexandria may have been proposed by Demetrius of Phalerum, an exiled Athenian statesman living in Alexandria, to Ptolemy I Soter, who may have established plans for the Library, but the Library itself was probably not built until the reign of his son Ptolemy II Philadelphus. The Library quickly acquired many papyrus scrolls, owing largely to the Ptolemaic kings' aggressive and well-funded policies for procuring texts. It is unknown precisely how many scrolls were housed at any given time, but estimates range from 40,000 to 400,000 at its height.",
        //     rate :"4.8",
        //     type : "Tourism",
        //     video_link:"https://www.youtube.com/embed/nbVShDVXtAM?si=PS6uchGav1DfJBM-",
        //     Wikipedia_link : "https://en.wikipedia.org/wiki/Library_of_Alexandria",
        //     location_link : "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13649.330254724362!2d29.9179497!3d31.2115145!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f5c38a0562fe85%3A0xa34cc632ec23e7!2sAlexandria%20Bibliotheca!5e0!3m2!1sen!2seg!4v1706619240888!5m2!1sen!2seg",
        //     main_image: "Library of Alexandria.jpg",
        //     image_1 : "Library of Alexandria 1.jpg",
        //     image_2 : "Library of Alexandria 2.jpg",
        //     image_3 : "Library of Alexandria 3.jpg",
        //     image_4 : "Library of Alexandria 4.jpg",
        //     image_5 : "Library of Alexandria 5.jpg",
        //     image_6 : "Library of Alexandria 6.jpg",
        //     Egy_Student_Ticket :"EGP 5",
        //     Non_Egy_Student_Ticket :"EGP 20",
        //     Egy_Adults_Ticket :"EGP 10",
        //     Non_Egy_Adults_Ticket :"EGP 150",
        //     Egy_Senior_Ticket :"EGP 5",
        //     Non_Egy_Senior_Ticket :"EGP 150",
        //     Egy_Special_Needs_Ticket :"Free",
        //     Non_Egy_Special_Needs_Ticket :"Free",
        //     Opening_Hours :"Main Library: Sun–Thu, 10:00 am –7:00 pm Sat, 10:00 am –2:00 pm <br>Children’s Library and Young People’s Library: Sun–Thu, from 9:30 am to 11:30 am, from 12:00 pm to 1:30 pm, and from 2:00 pm to 4:00 pm Sat, from 10:00 am to 2:00 pm <br> Taha Hussein Library: Sun–Thu, 9:30 am–4:00 pm <br> Special Needs Programs Unit: Sun–Thu, 9:30 am–4:00 pm",
        //     place_website : "https://www.bibalex.org/Libraries/Presentation/Static/15510.aspx?dummy=0",
        // }); 
        // await Places.create({
        //     governorate: the_governorate._id,
        //     name: "Citadel of Qaitbay",
        //     description: "The Qaitbay Citadel in Alexandria is considered one of the most important defensive strongholds, not only in Egypt, but also along the Mediterranean Sea coast. It formulated an important part of the fortification system of Alexandria in the 15th century AD.",
        //     rate :"4.5",
        //     type : "Tourism",
        //     video_link:"None",
        //     Wikipedia_link : "None",
        //     location_link : "None",
        //     main_image: "QaitbeyCitadel.jpg",
        //     image_1 : "",
        //     image_2 : "",
        //     image_3 : "",
        //     image_4 : "",
        //     image_5 : "",
        //     image_6 : "",
        //     Egy_Student_Ticket :"",
        //     Non_Egy_Student_Ticket :"",
        //     Egy_Adults_Ticket :"",
        //     Non_Egy_Adults_Ticket :"",
        //     Egy_Senior_Ticket :"",
        //     Non_Egy_Senior_Ticket :"",
        //     Egy_Special_Needs_Ticket :"",
        //     Non_Egy_Special_Needs_Ticket :"",
        //     Opening_Hours :"",
        //     place_website : "None",
    
        // }); 
        // await Places.create({
        //     governorate: the_governorate._id,
        //     name: "Royal Jewelry Museum",
        //     description: "The museum houses major jewelry pieces and art acquisitions of the dynasty of Muhammad Ali and his descendants, who ruled Egypt for nearly 150 years from 1805 until the 1952 movement. The mother of Princess Fatima had completed the construction of the western wing before her death, when her daughter had reached the age of eighteen. Princess Fatima added an eastern wing to the palace and linked the two wings with a beautiful corridor. The Palace remained in use for summer residence until July 1952. When the princess's property was confiscated, she was allowed to reside in the palace. This was until 1964, when Princess Fatima al-Zahra (ceded) the palace to the Egyptian government and left for Cairo. Princess Fatima al-Zahra died in 1983.",
        //     rate :"3.6",
        //     type : "Popularity",
        //     video_link:"None",
        //     Wikipedia_link : "None",
        //     location_link : "None",
        //     main_image: "AlexRoyalJewelleryMusLeft.jpg",
        //     image_1 : "",
        //     image_2 : "",
        //     image_3 : "",
        //     image_4 : "",
        //     image_5 : "Library of Alexandria 4.jpg",
        //     image_6 : "",
        //     Egy_Student_Ticket :"",
        //     Non_Egy_Student_Ticket :"",
        //     Egy_Adults_Ticket :"",
        //     Non_Egy_Adults_Ticket :"",
        //     Egy_Senior_Ticket :"",
        //     Non_Egy_Senior_Ticket :"",
        //     Egy_Special_Needs_Ticket :"",
        //     Non_Egy_Special_Needs_Ticket :"",
        //     Opening_Hours :"",
        //     place_website : "None",
        // }); 
        // await Places.create({
        //     governorate: the_governorate._id,
        //     name: "Montaza Palace",
        //     description: "The extensive Montaza Palace grounds first had the Salamlek Palace, built in 1892 by Khedive Abbas II, the last Muhammad Ali Dynasty ruler to hold the Khedive title over the Khedivate of Egypt and Sudan. It was used as a hunting lodge and residence for his companion , The larger El-Haramlek Palace and royal gardens were added to the Montaza Palace grounds, being built by King Fuad I in 1932, as a summer palace. It is in a mixture of Ottoman and Florentine styles, with two towers. One of these towers rises distinctively high above with elaborated Italian Renaissance design details. The palace has long open arcades facing the sea along each floor.President Anwar El-Sadat renovated the original Salamlek Palace as an official presidential residence. It was most recently used by former president Hosni Mubarak.",
        //     rate :"3.5",
        //     type : "Popularity",
        //     video_link:"None",
        //     Wikipedia_link : "None",
        //     location_link : "None",
        //     main_image: "Montaza_Palace.jpg",
        //     image_1 : "Library of Alexandria 2.jpg",
        //     image_2 : "",
        //     image_3 : "",
        //     image_4 : "",
        //     image_5 : "Library of Alexandria 5.jpg",
        //     image_6 : "",
        //     Egy_Student_Ticket :"",
        //     Non_Egy_Student_Ticket :"",
        //     Egy_Adults_Ticket :"",
        //     Non_Egy_Adults_Ticket :"",
        //     Egy_Senior_Ticket :"",
        //     Non_Egy_Senior_Ticket :"",
        //     Egy_Special_Needs_Ticket :"",
        //     Non_Egy_Special_Needs_Ticket :"",
        //     Opening_Hours :"",
        //     place_website : "None",
        // });
        
    
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