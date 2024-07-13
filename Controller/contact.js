import contact from "../DB Models/Contact.js"
import notifier from 'node-notifier'


export const index = async (req, res) => { 
    res.render('Contact/index')
};

export const send = async (req, res) => { 
    const { message, subject  } = req.body
    const type = req.cookies.UserType;
    await contact.create({
        user_id: req.id ,
        type,
        subject:subject ,
        message:message ,
    }); 
    notifier.notify({
        title: 'Alert!',
        message: 'Message Send',
        sound: true,
        wait: true
    })
    res.render("Contact/index");
};