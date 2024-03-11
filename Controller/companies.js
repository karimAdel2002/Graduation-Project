import comp from "../DB Models/Companies.js"
export const index = async (req, res) => { 
    const comps = await comp.find({}).lean();
    // await comp.create({
    //     name: "TaNefer Tours",
    //     description: "TaNefer Tours, is a Full -Service Travel Agency which has transformed the concept of merely traveling for leisure or business to a self-discovering journey.",
    //     image: "1.png",
    //     link : "None",
    // }); 
    // await comp.create({
    //     name: "Egypt Tours",
    //     description: "Book tours & travel in top destinations around the world. Great itineraries, great prices. See the best attractions and find vacation packages that include hotels.",
    //     image: "2.png",
    //     link : "None",
    // }); 
    // await comp.create({
    //     name: "Egypt Direct Tours",
    //     description: "Egypt Direct Tours travel agency based in Egypt since 2012 and organize and handling: - sightseeing - Travel packages for more than 1 day. -Pick up & drop off from Cairo Airport. ",
    //     image: "3.png",
    //     link : "None",
    // }); 
    // await comp.create({
    //     name: "iEgypt Tours & Travels",
    //     description: "Egypt is a travel agency founded in 2020 with a vision of creating a unique experience for each and every traveler we work withFounded by 3 Egyptian.",
    //     image: "6.png",
    //     link : "None",
    // }); 
    // await comp.create({
    //     name: "Memphis Tours",
    //     description: "Some of us travel for inspiration or relaxation. Some of us travel to learn about culture or history. All of us travel for fun. The Memphis team creates custom.",
    //     image: "4.png",
    //     link : "None",
    // }); 
    // await comp.create({
    //     name: "FTS Travels",
    //     description: "We offer vacation packages to Egypt to go Egypt pyramid tour packages. We have travel packages to Egypt from USA. Enjoy your Egypt vacation packages .",
    //     image: "7.png",
    //     link : "None",
    // }); 
    
    res.render('Companies/index' ,{comps})
};