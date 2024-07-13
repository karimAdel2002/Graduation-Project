import food from "../DB Models/Food.js"


export const index = async (req, res) => { 
    const foods = await food.find({}).lean();
    res.render('Food/index',{the_foods : foods})
};