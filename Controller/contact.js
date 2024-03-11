import contact from "../DB Models/Contact.js"


export const index = async (req, res) => { 
    res.render('Contact/index')
};

export const send = async (req, res) => { 
    const { message, subject  } = req.body
    await contact.create({
        tourist_id: req.id ,
        subject:subject ,
        message:message ,
    }); 

    res.send('done')
};