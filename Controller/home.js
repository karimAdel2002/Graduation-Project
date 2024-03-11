import governorates from "../DB Models/governorates.js"
import trip from "../DB Models/Trips.js"



export const index = async (req, res) => { 
    
    const popular_governorate = await governorates.find({popular : true}).lean();
    const non_popular_governorate = await governorates.find({popular : false}).lean();

    // await governorates.create({
    //     name: "Alexandria",
    //     description: "Once among the greatest cities of the Mediterranean world and a centre of Hellenic scholarship and science, Alexandria was the capital of Egypt from its founding by Alexander the Great in 332 BCE until its surrender to the Arab forces led by ʿAmr ibn al-ʿĀṣ in 642 CE. One of Egypt’s largest cities, Alexandria is also its principal seaport and a major industrial centre. The city lies on the Mediterranean Sea at the western edge of the Nile River delta, about 114 miles (183 km) northwest of Cairo in Lower Egypt. Area city, 116 square miles (300 square km). Pop. (2006) city, 4,110,015.",
    //     Wikipedia_link : "https://en.wikipedia.org/wiki/Alexandria",
    //     weather_link:"https://forecast7.com/en/31d2029d92/alexandria/",
    //     video_link : "https://www.youtube.com/embed/XPYxYp4UYdg?si=Zxhr7BfizO6jbuuc",
    //     image: "Alexandria.png",
    //     popular : "true",
    //     places_number : 4 ,
    // }); 
    // await governorates.create({
    //     name: "Giza",
    //     description:  "is the third-largest city in Egypt by area after Cairo and Alexandria; and fourth-largest city in Africa by population after Kinshasa, Lagos, and Cairo. It is the capital of Giza Governorate with a total population of 4,872,448 in the 2017 census.[5] It is located on the west bank of the Nile opposite central Cairo, and is a part of the Greater Cairo metropolis. Giza lies less than 30 km (18.64 mi) north of Memphis (Men-nefer, today the village of Mit Rahina), which was the capital city of the unified Egyptian state during the reign of pharaoh Narmer, roughly 3100 BC.",
    //     Wikipedia_link : "https://en.wikipedia.org/wiki/Giza",
    //     weather_link:"https://forecast7.com/en/28d7729d23/giza-governorate/",
    //     video_link : "https://www.youtube.com/embed/dz8qoMeNlBs?si=92KndkVEIGoz7Pit",
    //     image: "Giza.jpg",
    //     popular : "true",
    //     places_number : 0 ,
    // }); 
    // await governorates.create({
    //     name: "Cairo",
    //     description: "Cairo is associated with ancient Egypt, as the Giza pyramid complex and the ancient cities of Memphis and Heliopolis are located in its geographical area. Located near the Nile Delta,[7][8] the city first developed as Fustat following the Muslim conquest of Egypt in 641 next to an existing ancient Roman fortress, Babylon. Cairo was founded by the Fatimid dynasty in 969. It later superseded Fustat as the main urban centre during the Ayyubid and Mamluk periods (12th-16th centuries).[9] Cairo has long been a centre of the region's political and cultural life, and is titled (the city of a thousand minarets) for its preponderance of Islamic architecture. Cairo's historic center was awarded World Heritage Site status in 1979.",
    //     Wikipedia_link : "https://en.wikipedia.org/wiki/Cairo",
    //     weather_link:"https://forecast7.com/en/30d0431d24/cairo/",
    //     video_link :"https://www.youtube.com/embed/RKzeyrlzwt4?si=EI7ebX0UuQWTgR8F",
    //     image: "Cairo.jpg",
    //     popular : "true" ,
    //     places_number : 0 ,
    // }); 
    // await governorates.create({
    //     name: "Luxor",
    //     description: "Luxor was the ancient city of Thebes, the capital of Upper Egypt during the New Kingdom, and the city of Amun, later to become the god Amun-Ra.",
    //     Wikipedia_link : "https://en.wikipedia.org/wiki/Luxor",
    //     weather_link:"https://forecast7.com/en/25d6932d64/luxor/",
    //     video_link : "https://www.youtube.com/embed/jA5oSNsty2Y?si=ZrON5r6UatLpSoCI",
    //     image: "Luxur.png",
    //     popular : "true",
    //     places_number : 0 ,
    // }); 
    // await governorates.create({
    //     name: "Aswan",
    //     description: "Aswan is a busy market and tourist centre located just north of the Aswan Dam on the east bank of the Nile at the first cataract. The modern city has expanded and includes the formerly separate community on the island of Elephantine.",
    //     Wikipedia_link : "https://en.wikipedia.org/wiki/Aswan",
    //     weather_link:"https://forecast7.com/en/24d0932d90/aswan/",
    //     video_link :"https://www.youtube.com/embed/8J4lBbiHiro?si=lV6KfsWvMQYAxZjC",
    //     image: "Aswan.jpg",
    //     popular : "true" ,
    //     places_number : 0 ,
    // });
    // await governorates.create({
    //     name: "Port Said",
    //     description: "Port Said was founded by Sa'id of Egypt on Easter Monday, April 25, 1859, when Ferdinand de Lesseps gave the first symbolic swing of the pickaxe to signal the beginning of construction. The first problem encountered was the difficulty for ships to drop anchor nearby. Luckily, a single rocky outcrop flush with the shoreline was discovered a few hundred meters away. Equipped with a wooden wharf, it served as a mooring berth for the boats. Soon after, a wooden jetty was built, connecting the departure islet, as it quickly became known, to the beach. This rock could be considered the heart of the developing city, and it was on this highly symbolic site, forty years later, that a monument to de Lesseps was erected.",
    //     Wikipedia_link : "https://en.wikipedia.org/wiki/Port_Said",
    //     weather_link:"https://forecast7.com/en/31d0832d27/port-said-governorate/",
    //     video_link :"https://www.youtube.com/embed/jaxs4jgC0V0?si=v5obS0SqaPQlQIXl",
    //     image: "port said.png",
    //     popular : "false" ,
    //     places_number : 0 ,
    // }); 
    // await governorates.create({
    //     name: "Marsa Matruh",
    //     description: "Mersa Matruh (Arabic: مرسى مطروح, romanized: Marsā Maṭrūḥ, also transliterated as Marsa Matruh, is a port in Egypt and the capital of Matrouh Governorate. It is located 240 km (150 mi) west of Alexandria and 222 km (138 mi) east of Sallum on the main highway from the Nile Delta to the Libyan border. The city is also accessible from the south via another highway running through the Western Desert towards Siwa Oasis and Bahariya Oasis.",
    //     Wikipedia_link : "https://en.wikipedia.org/wiki/Mersa_Matruh",
    //     weather_link:"https://forecast7.com/en/29d5726d42/matrouh-governorate/",
    //     video_link :"https://www.youtube.com/embed/Y-Z4WoSiQhM?si=q7Kaxak5b8YNisWT",
    //     image: "Mersa Matruh.png",
    //     popular :"false" ,
    //     places_number : 0 ,
    // }); 
    // await governorates.create({
    //     name: "South Sinai",
    //     description: "South Sinai Governorate (Arabic: محافظة جنوب سيناء Muḥāfaẓah Ganūb Sīnā) is the least populated governorate of Egypt. It is located in the east of the country, encompassing the southern half of the Sinai Peninsula. Saint Catherine's Monastery, an Eastern Orthodox Church monastery and UNESCO World Heritage Site of world renown, is located in the central part of the governorate.",
    //     Wikipedia_link : "https://en.wikipedia.org/wiki/South_Sinai_Governorate",
    //     weather_link:"https://forecast7.com/en/28d5134d51/dahab/",
    //     video_link :"https://www.youtube.com/embed/rCed6foQkIw?si=UqKFTExNei3m-8wm",
    //     image: "South Sinai.png",
    //     popular : "false" ,
    //     places_number : 0 ,
    // }); 
    // await governorates.create({
    //     name: "Faiyum",
    //     description: "Faiyum (Arabic: الفيوم el-Fayyūm ) is a city in Middle Egypt. Located 100 kilometres (62 miles) southwest of Cairo, in the Faiyum Oasis, it is the capital of the modern Faiyum Governorate. Originally called Shedet in Egyptian, the Greeks called it in Koinē Greek: Κροκοδειλόπολις, romanized: Krokodilópolis, and later Medieval Greek: Ἀρσινόη, romanized: Arsinoë.It is one of Egypt's oldest cities due to its strategic location.",
    //     Wikipedia_link : "https://en.wikipedia.org/wiki/Faiyum",
    //     weather_link:"https://www.accuweather.com/en/eg/faiyum/126919/weather-forecast/126919",
    //     video_link :"https://www.youtube.com/embed/DDljNWP6b8E?si=4UzyO0i9YyEKgcA3",
    //     image: "Faiyum.png",
    //     popular : "false" ,
    //     places_number : 0 ,
    // });  

    // await governorates.create({
    //     name: "",
    //     description: "",
    //     weather:"",
    //     image: "",
    //     popular : ,
    // }); 

    const trips = await trip.find({}).lean();


    // await trip.create({
    //     name: "cairo stopover tour",
    //     description: "You will visit the Museum of Egyptian Antiquities, the Pyramids of Giza, the museums of Abdeen Palace, Muhammad Ali Palace, Bab Zewail, the Old City, the River Nile, the National Museum of Egyptian Civilization",
    //     price:"From$500",
    //     rate: "3.9",
    //     image : "1.jpg",
    // }); 
    // await trip.create({
    //     name: "Islamic trip",
    //     description: "You will visit Al-Azhar Al-Sharif, Muhammad Ali Mosque, Ibn Tulun Mosque, Sultan Hassan Mosque and School, Al-Muizz Lidin Allah Al-Fatimi Street, Al-Sayyid Zainab Mosque, and Al-Sayyida Aisha Mosque..",
    //     price:"From$300",
    //     rate: "4.1",
    //     image : "2.png",
    // }); 
    // await trip.create({
    //     name: "Sea trip",
    //     description: "The most beautiful trips to discover the Red Sea, spend the most beautiful time with the family, and photograph colorful fish 🐠🐟🐬 and coral reefs through huge panoramic glass windows.",
    //     price:"From$600",
    //     rate: "4.6",
    //     image : "3.png",
    // }); 
    

    res.render('Home/index',{ popular_governorate ,non_popular_governorate ,trips})
};
