import Tourguides from "../DB Models/Tourguide_Acc.js";
import Tourists from "../DB Models/Tourists_Acc.js";
import Admin_Acc from "../DB Models/Admin_Acc.js"
import Tourist_Messages from "../DB Models/Tourist_Messages.js";
import Tourguide_Messages from "../DB Models/Tourguide_Messages.js";
import bills from "../DB Models/Bills.js"

import bcrypt from 'bcryptjs'
import  jwt  from "jsonwebtoken"

import { createRequire } from 'module';            //to creating a require for deletion
const require = createRequire(import.meta.url);    //to creating a require for deletion
    const fs = require('fs').promises;    // start of deletion
                // Asynchronously delete a file with async/await
            async function deleteFile(filePath) {
             try {
               await fs.unlink(filePath);
                  console.log('File deleted!');
                     } catch (err) {
                 // Handle specific error if any
             console.error(err.message);
                }
                    }

export const index = async (req, res) => { 
    const id = req.id
    const tourguide = await Tourguides.findOne({_id : id}).lean();
    const tourist = await Tourists.findOne({_id : id}).lean();
    if(tourguide!==null){
    const type = "Tour Guide"
    const user = tourguide
    const new_messages = await Tourist_Messages.find({receiver : id , replay :"None"}).populate("sender").lean();
    const all_messages = await Tourist_Messages.find({receiver : id , replay:{$nin:"None"}}).populate("sender").lean();
    const new_messages_Number = new_messages.length;
    // await Tourguides.findByIdAndUpdate(id, { $set: { languages : ["Arabic","English","French"] } })

        res.render('Profile/index',{user , type , new_messages , all_messages , new_messages_Number})
    }
    if(tourist!==null){
    const type = "Tourist"
    const user = tourist
    const new_messages = await Tourguide_Messages.find({receiver : id , replay :"None"}).populate("sender").lean();
    const all_messages = await Tourguide_Messages.find({receiver : id,replay:{$nin:"None"}}).populate("sender").lean();
    const Reservations = await bills.find({user_id : id}).populate("user_id").lean();
    const old_messages = all_messages-new_messages;
    const new_messages_Number = new_messages.length
        res.render('Profile/index',{user , type , new_messages , all_messages , new_messages_Number ,Reservations})
    }
    
};
export const edit = async (req, res) => { 
    const {_id , type} = req.body
    if(type == "Tour Guide" ){
        const tourguide = await Tourguides.findOne({_id : _id}).lean();
        const user = tourguide
        res.render('Profile/edit_tourguide',{user ,type })
    }
    if(type == "Tourist" ){
        const tourist = await Tourists.findOne({_id : _id}).lean();
        const user = tourist
        res.render('Profile/edit_tourist',{user , type})
    }
};

export const edit_tourguide = async (req, res) => { 
    const {id,name,governorate,username,phone,password,Bio} = req.body;
    const the_Tourguide = await Tourguides.findOne({_id:id}).lean();

    if(the_Tourguide.username == username){
        await Tourguides.findByIdAndUpdate(id, { $set: {name} })
        await Tourguides.findByIdAndUpdate(id, { $set: {governorate} })
        await Tourguides.findByIdAndUpdate(id, { $set: {username} })
        await Tourguides.findByIdAndUpdate(id, { $set: {phone} })
        await Tourguides.findByIdAndUpdate(id, { $set: {Bio} })
        if(password!=""){
            var salt = bcrypt.genSaltSync(10);                                  // To Decrypt password
            var encryotedPassword = bcrypt.hashSync(password, salt);            // To Decrypt password
            await Tourguides.findByIdAndUpdate(id, { $set: {password : encryotedPassword} })
        }
        if(req.file!==undefined){
            console.log(req.file)
            const {filename} = req.file;
            deleteFile("Upload\\img\\Tour Guides\\"+the_Tourguide.image);
            await Tourguides.findByIdAndUpdate(id, { $set: {image :filename } });
        }
        res.redirect("/Profile")
    }
    else{
        const Tourist = await Tourists.findOne({username }).lean();
        const Tourguide = await Tourguides.findOne({username }).lean();
        const Admins = await Admin_Acc.findOne({username }).lean();
        if(Tourist===null&&Tourguide===null&&Admins===null){
            await Tourguides.findByIdAndUpdate(id, { $set: {name} })
            await Tourguides.findByIdAndUpdate(id, { $set: {governorate} })
            await Tourguides.findByIdAndUpdate(id, { $set: {username} })
            await Tourguides.findByIdAndUpdate(id, { $set: {phone} })
            await Tourguides.findByIdAndUpdate(id, { $set: {Bio} })
            if(password!=""){
                var salt = bcrypt.genSaltSync(10);                                  // To Decrypt password
                var encryotedPassword = bcrypt.hashSync(password, salt);            // To Decrypt password
                await Tourguides.findByIdAndUpdate(id, { $set: {password : encryotedPassword} })
            }
            if(req.file!==undefined){
                console.log(req.file)
                const {filename} = req.file;
               deleteFile("Upload\\img\\Tour Guides\\"+the_Tourguide.image);
                await Tourguides.findByIdAndUpdate(id, { $set: {image :filename } });
            }
        }else{
            res.send("you can't use this username");
        }
    }

};

export const edit_tourguide_social = async (req, res) => { 
    const {id,facebook_link,instagram_link,linkedin_link} = req.body;
    await Tourguides.findByIdAndUpdate(id, { $set: {facebook_link} })
    await Tourguides.findByIdAndUpdate(id, { $set: {instagram_link} })
    await Tourguides.findByIdAndUpdate(id, { $set: {linkedin_link} })
    res.status(204).send()
};

export const edit_tourist = async (req, res) => { 
    const {id,name,country,username,phone,password,Bio} = req.body;
    const the_Tourist = await Tourists.findOne({_id:id}).lean();

    if(the_Tourist.username == username){
        await Tourists.findByIdAndUpdate(id, { $set: {name} })
        await Tourists.findByIdAndUpdate(id, { $set: {country} })
        await Tourists.findByIdAndUpdate(id, { $set: {username} })
        await Tourists.findByIdAndUpdate(id, { $set: {phone} })
        await Tourists.findByIdAndUpdate(id, { $set: {Bio} })
        if(password!=""){
            var salt = bcrypt.genSaltSync(10);                                  // To Decrypt password
            var encryotedPassword = bcrypt.hashSync(password, salt);            // To Decrypt password
            await Tourists.findByIdAndUpdate(id, { $set: {password : encryotedPassword} })
        }
        if(req.file!==undefined){
            const {filename} = req.file;
            deleteFile("Upload\\img\\Tourists\\"+the_Tourist.image);
            await Tourists.findByIdAndUpdate(id, { $set: {image :filename } });
        }
        res.redirect("/Profile")
    }
    else{
        const Tourist = await Tourists.findOne({username }).lean();
        const Tourguide = await Tourguides.findOne({username }).lean();
        const Admins = await Admin_Acc.findOne({username }).lean();
        if(Tourist===null&&Tourguide===null&&Admins===null){
            await Tourists.findByIdAndUpdate(id, { $set: {name} })
            await Tourists.findByIdAndUpdate(id, { $set: {country} })
            await Tourists.findByIdAndUpdate(id, { $set: {username} })
            await Tourists.findByIdAndUpdate(id, { $set: {phone} })
            await Tourists.findByIdAndUpdate(id, { $set: {Bio} })
            if(password!=""){
                var salt = bcrypt.genSaltSync(10);                                  // To Decrypt password
                var encryotedPassword = bcrypt.hashSync(password, salt);            // To Decrypt password
                await Tourists.findByIdAndUpdate(id, { $set: {password : encryotedPassword} })
            }
            if(req.file!==undefined){
                console.log(req.file)
                const {filename} = req.file;
               deleteFile("Upload\\img\\Tourists\\"+the_Tourist.image);
                await Tourists.findByIdAndUpdate(id, { $set: {image :filename } });
            }
        }else{
            res.send("you can't use this username");
        }
    }

};

export const edit_tourist_social = async (req, res) => { 
    const {id,facebook_link,instagram_link} = req.body;
    await Tourists.findByIdAndUpdate(id, { $set: {facebook_link} })
    await Tourists.findByIdAndUpdate(id, { $set: {instagram_link} })
    res.status(204).send()
};

export const message = async (req, res) => { 
    let {msg ,mail ,replay } = req.body
    const id = req.id
    const tourguide = await Tourguides.findOne({_id : id}).lean();
    const tourist = await Tourists.findOne({_id : id}).lean();
    if(tourguide!==null){
        await Tourist_Messages.findByIdAndUpdate(replay, { $set: {replay:msg} }) // add the message in replay
        const the_receiver_id = await Tourists.findOne({username : mail }).lean();
        await Tourguide_Messages.create({
            sender: req.id,  
            receiver:the_receiver_id._id,
            message : msg,
        }); 
        res.status(204).send()
    }
    if(tourist!==null){
        const the_receiver_id = await Tourguides.findOne({username : mail }).lean();
        await Tourguide_Messages.findByIdAndUpdate(replay, { $set: {replay:msg} }) // add the message in replay
        await Tourist_Messages.create({
            sender: req.id,  
            receiver:the_receiver_id._id,
            message : msg,
        }); 
        res.status(204).send()
    }
    
    
   
};

export const  Reservations = async (req, res) => { 
   const {_id} = req.params;
   const bill = await bills.findOne({_id}).populate("user_id").lean();
   const amount = bill.amount_cents/100;
   res.render('Bill/bill' , {bill ,amount})
};