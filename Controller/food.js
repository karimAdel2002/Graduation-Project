import food from "../DB Models/Food.js"


export const index = async (req, res) => { 
    
    const foods = await food.find({}).lean();
    // await food.create({
    //     name: "Kushari",
    //     description: "Kushari is a very delicious vegan dish from the legendary Egyptian culinary dating back to the early days of the Islamic era in Egypt. It consists of food consists of rice, lentils, onions, garlic, chickpeas, and tomato sauce. It has four sources of carbohydrates made it the most popular lunch item in Egypt",
    //     image: "Egyptian_food_Koshary.jpg",
    // }); 
    // await food.create({
    //     name: "Falafel",
    //     description:"The most famous Egyptian fast food, they are the main fast food in the Egyptian breakfast. The full (pronounced: fool) is made of fava beans. The ta'meya or The falafel is legendary street food with ancient Egyptian roots, known to be a vegan food made of crushed fava beans mixed with spices then deep-fried in the shape of a flat disc then served with tahini, Egyptian bread, and salad",
    //     image: "Falafel-Sandwich-Recipe-SQ.jpg",
    // }); 
    // await food.create({
    //     name: "kofta",
    //     description: "is a family of meatball or meatloaf dishes found in Balkan, Middle Eastern, North African, South Caucasian, South Asian and Central Asian cuisines. In the simplest form, koftas consist of balls of minced meat - usually beef, chicken, pork, lamb or mutton, or a mixture : mixed with spices and sometimes other ingredients.[1] The earliest known recipes are found in early Arab cookbooks and call for ground lamb.",
    //     image: "Kofta.jpg",
    // }); 
    // console.log(governorates)
    // console.log(req.id)

    res.render('Food/index',{the_foods : foods})
};