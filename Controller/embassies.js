import embassies from "../DB Models/Embassies.js";
export const index = async (req, res) => { 
    const the_Embassies = await embassies.find({}).lean();
    let sec1_length = Math.round(the_Embassies.length/2);
    let Embassies_sec1 = the_Embassies.slice(0,sec1_length)
    let Embassies_sec2 = the_Embassies.slice(sec1_length,the_Embassies.length)
    // await embassies.create({
    //     name: "Albania",
    //     image: "Flag_of_Albania.svg.png",
    //     address: "59 El-orouba,Almazah,Heleopolos,Cairo,Egypt",
    //     telephone : "+ 000 000 000",
    //     email : "Albania@email.com",
    //     office_Hours : "Sunday to Thursday 12:PM - 3:PM",
    // }); 
    // await embassies.create({
    //     name: "India",
    //     image: "Flag_of_India.png",
    //     address: "5, Aziz Abaza Street, Zamalek, Cairo , Egypt",
    //     telephone : "(+202) 2736-0052 / 2736-3051",
    //     email : "www.eoicairo.gov.in",
    //     office_Hours : "09:00 AM to 05:30 PM",
    // }); 
    res.render('Embassies/index' ,{the_Embassies ,Embassies_sec1 ,Embassies_sec2 })
};