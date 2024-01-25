import governorates from "../DB Models/governorates.js"


export const index = async (req, res) => { 
    
    const governorate = await governorates.find({}).lean();
    // await governorate.create({
    //     name: "Alexandria",
    //     description: "Once among the greatest cities of the Mediterranean world and a centre of Hellenic scholarship and science, Alexandria was the capital of Egypt from its founding by Alexander the Great in 332 BCE until its surrender to the Arab forces led by ʿAmr ibn al-ʿĀṣ in 642 CE. One of Egypt’s largest cities, Alexandria is also its principal seaport and a major industrial centre. The city lies on the Mediterranean Sea at the western edge of the Nile River delta, about 114 miles (183 km) northwest of Cairo in Lower Egypt. Area city, 116 square miles (300 square km). Pop. (2006) city, 4,110,015.",
    //     image: "Alex.jpg",
    // }); 
    // await governorate.create({
    //     name: "Giza",
    //     description:  "is the third-largest city in Egypt by area after Cairo and Alexandria; and fourth-largest city in Africa by population after Kinshasa, Lagos, and Cairo. It is the capital of Giza Governorate with a total population of 4,872,448 in the 2017 census.[5] It is located on the west bank of the Nile opposite central Cairo, and is a part of the Greater Cairo metropolis. Giza lies less than 30 km (18.64 mi) north of Memphis (Men-nefer, today the village of Mit Rahina), which was the capital city of the unified Egyptian state during the reign of pharaoh Narmer, roughly 3100 BC.",
    //     image: "Giza.jpg",
    // }); 
    // await governorate.create({
    //     name: "Sharm El Sheikh",
    //     description: "is an Egyptian city on the southern tip of the Sinai Peninsula, in South Sinai Governorate, on the coastal strip along the Red Sea. Its population is approximately 73,000 as of 2023. Sharm El Sheikh is the administrative hub of Egypt's South Sinai Governorate, which includes the smaller coastal towns of Dahab and Nuweiba as well as the mountainous interior, St. Catherine and Mount Sinai. The city and holiday resort is a significant centre for tourism in Egypt, while also attracting many international conferences and diplomatic meetings. Sharm El Sheikh is one of the Asian cities of Egypt.",
    //     image: "Sharm.jpg",
    // }); 
    // console.log(governorate)
    console.log(req.id)

    res.render('Home/index',{ governorates :governorate })
};