import governorates from "../DB Models/governorates.js";
import Comments from "../DB Models/Comments.js";
import Rate from "../DB Models/Rate.js";
import Tourguides from "../DB Models/Tourguide_Acc.js";
import all_messages from "../DB Models/Tourist_Messages.js";


export const index = async (req, res) => { 
    const all_Governorates = await governorates.find({}).populate("Tourguides").lean();
    const all_Comments = await Comments.find({type :"Tourguides"}).populate('user').lean();

    let the_governorates =[]
    for(let i =0 ; i<all_Governorates.length;i++ ){
        if(all_Governorates[i].Tourguides != undefined && all_Governorates[i].Tourguides.length !=0 ){
            the_governorates.push(all_Governorates[i])
        }
    }
    // console.log(the_governorates)
    let sec1_length = Math.round(the_governorates.length/2);
    let Governorates_sec1 = the_governorates.slice(0,sec1_length)
    let Governorates_sec2 = the_governorates.slice(sec1_length,the_governorates.length)
    
    // await governorates.findByIdAndUpdate("65bbec3bc5c6d24cb7f8087f", { $set: { Tourguides : ["65ca460e4f93c89536f35ef3","65785900c0b6e4eed63f91ed","65cb6e5b6bf8779fe9773fa9"] } })
    // await governorates.findByIdAndUpdate("65bbec3bc5c6d24cb7f80881", { $set: { Tourguides : ["65cb6e5b6bf8779fe9773fa9"] } })
    // await governorates.findByIdAndUpdate("65bbec3bc5c6d24cb7f80883", { $set: { Tourguides : [] } })
    res.render('Tourguides/index',{the_governorates, Governorates_sec1, Governorates_sec2 ,all_Comments})
};

export const rate = async (req, res) => { 
    let { tourguide , rate} = req.params
    console.log(req.params)
    rate = Number(rate)
    const tourguide_rate = await Rate.findOne({id:tourguide , user:req.id}).lean();
    if(tourguide_rate===null){
        await Rate.create({
            id: tourguide ,
            user: req.id,
            rate : rate,
        }); 
    }
    if(tourguide_rate!==null){
        await Rate.findByIdAndUpdate(tourguide_rate._id , { $set: { rate : rate} })
    }

    let sum = 0;
    const tourguide_rates = await Rate.find({id:tourguide}).lean();
    for(let i = 0 ; i < tourguide_rates.length ; i++ ){
     sum = sum + tourguide_rates[i].rate ;   
    }
    let total_rate = sum / tourguide_rates.length ;
    await Tourguides.findByIdAndUpdate(tourguide, { $set: { rate : total_rate} })
    res.status(204).send()
};

export const comments = async (req, res) => { 
    let {comment} = req.body
    await Comments.create({
        user: req.id,  
        type:"Tourguides",
        comment : comment,
    }); 

    const all_Governorates = await governorates.find({}).populate("Tourguides").lean();
    const all_Comments = await Comments.find({type :"Tourguides"}).populate('user').lean();

    let the_governorates =[]
    for(let i =0 ; i<all_Governorates.length;i++ ){
        if(all_Governorates[i].Tourguides != undefined && all_Governorates[i].Tourguides.length !=0 ){
            the_governorates.push(all_Governorates[i])
        }
    }
    let sec1_length = Math.round(the_governorates.length/2);
    let Governorates_sec1 = the_governorates.slice(0,sec1_length)
    let Governorates_sec2 = the_governorates.slice(sec1_length,the_governorates.length)
    res.render('Tourguides/index',{the_governorates, Governorates_sec1, Governorates_sec2 ,all_Comments})
};

export const messages = async (req, res) => { 
    let {msg ,mail } = req.body
    const the_receiver_id = await Tourguides.findOne({username : mail }).lean();
    await all_messages.create({
        sender: req.id,  
        receiver:the_receiver_id._id,
        message : msg,
    }); 

    res.status(204).send()
};
export const view_profile = async (req, res) => { 
    const { id } = req.params
    console.log(id)
    const the_Tourguide = await Tourguides.findOne({_id : id }).lean();
    console.log(the_Tourguide)

    res.render('Tourguides/view_profile',{the_Tourguide})
};
