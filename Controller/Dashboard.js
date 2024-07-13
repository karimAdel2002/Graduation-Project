import Admins from "../DB Models/Admin_Acc.js"
import Tourists from "../DB Models/Tourists_Acc.js"
import Tourguides from "../DB Models/Tourguide_Acc.js"
import Governorates from "../DB Models/governorates.js"
import Trips from "../DB Models/Trips.js"
import Trip_Detailss from "../DB Models/Trip_details.js"
import Places from "../DB Models/Places.js"
import Companies from "../DB Models/Companies.js"
import Embassies from "../DB Models/Embassies.js"
import Foods from "../DB Models/Food.js"
import Musics from "../DB Models/Music.js"
import Bills from "../DB Models/Bills.js"
import Contacts from "../DB Models/Contact.js"


import bcrypt from 'bcryptjs'
import notifier from 'node-notifier'
let contact_Messages = [];
let contact_Messages_Number = 0;
let Activation_number = 0;
let Bills_number = 0;
let tourguides_contact_number =0;


 const get_contact_Messages = async () => {
     contact_Messages = await Contacts.find({reply:"None"}).lean();
    for(let i = 0 ; i <4 ; i++){
        const contact_Messages_tourist = await Tourists.findOne({_id :contact_Messages[i].user_id }).lean();
        const contact_Messages_tourguide = await Tourguides.findOne({_id :contact_Messages[i].user_id }).lean();

        if(contact_Messages[i].type == "Tourist" && contact_Messages_tourist !== null){
            contact_Messages[i].name = contact_Messages_tourist.name
            contact_Messages[i].username = contact_Messages_tourist.username
            contact_Messages[i].image = contact_Messages_tourist.image
        }
        if(contact_Messages[i].type == "Tourguide" && contact_Messages_tourguide !== null){
            contact_Messages[i].name = contact_Messages_tourguide.name
            contact_Messages[i].username = contact_Messages_tourguide.username
            contact_Messages[i].image = contact_Messages_tourguide.image
            tourguides_contact_number++;
        }
    }
    contact_Messages_Number = contact_Messages.length;
    const tourguides = await Tourguides.find({state:"Blocked"}).lean();
    Activation_number = tourguides.length;
    const bills = await Bills.find().lean();
    Bills_number = bills.length;
    
};
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

// --------------------index------------------------
export const index = async (req, res) => {
    contact_Messages = [];
    Activation_number = 0;
    Bills_number = 0;
    tourguides_contact_number =0;
    await get_contact_Messages();
    res.render('Dashboard/index' ,{contact_Messages,contact_Messages_Number,Activation_number,Bills_number,tourguides_contact_number})
};
// --------------------index------------------------
export const show_404 = async (req, res) => {
    
    res.render('Dashboard/404')
};
// --------------------Admin------------------------
export const Admin = async (req, res) => {
    const admins = await Admins.find().lean();
    res.render('Dashboard/Admin', { admins,contact_Messages,contact_Messages_Number,Activation_number,Bills_number,tourguides_contact_number })
};
export const Admin_Add = async (req, res) => {
    const { fname, lname, username, password } = req.body;
    var salt = bcrypt.genSaltSync(10);
    var encryotedPassword = bcrypt.hashSync(password, salt);
    const check_Tourists = await Tourists.findOne({ username }).lean();    // To ensure there are no duplicate emails
    const check_Tourguides = await Tourguides.findOne({ username }).lean(); // To ensure there are no duplicate emails
    const check_Admins = await Admins.findOne({ username }).lean();         // To ensure there are no duplicate emails
    if (check_Tourists === null && check_Tourguides === null && check_Admins === null) {              // To ensure there are no duplicate emails
        await Admins.create({
            fname,
            lname,
            username,
            password: encryotedPassword,

        });
        res.redirect('/Dashboard/Admin')
    } else {
        notifier.notify({
            title: 'Warning!',
            message: 'you cannot use this UserName',
            sound: true,
            wait: true
        })
        res.status(204).send()
    }

};
export const Admin_Delete = async (req, res) => {
    const { id } = req.params
    await Admins.findByIdAndDelete(id);
    res.redirect('/Dashboard/Admin')
};
export const Admin_Edit = async (req, res) => {
    const { id, fname, lname, username, password } = req.body;
    const the_Admins = await Admins.findOne({ _id: id }).lean();
    if (the_Admins.username == username) {
        await Admins.findByIdAndUpdate(id, { $set: { fname } })
        await Admins.findByIdAndUpdate(id, { $set: { lname } })
        if (password != "") {
            var salt = bcrypt.genSaltSync(10);                                  // To Decrypt password
            var encryotedPassword = bcrypt.hashSync(password, salt);            // To Decrypt password
            await Admins.findByIdAndUpdate(id, { $set: { password: encryotedPassword } })
        }
        res.redirect('/Dashboard/Admin')
    }
    else {
        const Tourist = await Tourists.findOne({ username }).lean();
        const Tourguide = await Tourguides.findOne({ username }).lean();
        const Admin = await Admins.findOne({ username }).lean();
        if (Tourist === null && Tourguide === null && Admin === null) {
            await Admins.findByIdAndUpdate(id, { $set: { fname } })
            await Admins.findByIdAndUpdate(id, { $set: { lname } })
            await Admins.findByIdAndUpdate(id, { $set: { username } })
            if (password != "") {
                var salt = bcrypt.genSaltSync(10);                                  // To Decrypt password
                var encryotedPassword = bcrypt.hashSync(password, salt);            // To Decrypt password
                await Admins.findByIdAndUpdate(id, { $set: { password: encryotedPassword } })
            }
            res.redirect('/Dashboard/Admin')
        } else {
            notifier.notify({
                title: 'Warning!',
                message: 'you cannot use this UserName',
                sound: true,
                wait: true
            })
            res.status(204).send()
        }
    }
};

// --------------------Tourist------------------------
export const Tourist = async (req, res) => {
    const tourists = await Tourists.find().lean();
    res.render('Dashboard/Tourist', { tourists ,contact_Messages,contact_Messages_Number,Activation_number,Bills_number,tourguides_contact_number })
};
export const Tourist_Add = async (req, res) => {
    const { name, username, password, country, gender, phone, facebook_link, instagram_link, Bio } = req.body;
    var salt = bcrypt.genSaltSync(10);
    var encryotedPassword = bcrypt.hashSync(password, salt);
    const check_Tourists = await Tourists.findOne({ username }).lean();    // To ensure there are no duplicate emails
    const check_Tourguides = await Tourguides.findOne({ username }).lean(); // To ensure there are no duplicate emails
    const check_Admins = await Admins.findOne({ username }).lean();         // To ensure there are no duplicate emails
    if (check_Tourists === null && check_Tourguides === null && check_Admins === null) {              // To ensure there are no duplicate emails
        if (req.file == undefined) {
            const filename = "Avatar.png";
            await Tourists.create({
                name,
                username,
                password: encryotedPassword,
                country,
                gender,
                phone,
                facebook_link,
                instagram_link,
                Bio,
                image: filename
            });
            res.redirect('/Dashboard/Tourist')
        } else {
            const { filename } = req.file;
            await Tourists.create({
                name,
                username,
                password: encryotedPassword,
                country,
                gender,
                phone,
                facebook_link,
                instagram_link,
                Bio,
                image: filename
            });
            res.redirect('/Dashboard/Tourist')
        }
    }
    else {
        notifier.notify({
            title: 'Warning!',
            message: 'you cannot use this UserName',
            sound: true,
            wait: true
        })
        res.status(204).send()
    }
};
export const Tourist_Delete = async (req, res) => {
    const { id } = req.params
    const the_Tourist = await Tourists.findOne({ _id: id }).lean();  // get the toutist
    deleteFile("Upload\\img\\Tourists\\" + the_Tourist.image);          // delete the tourist image from the folder
    await Tourists.findByIdAndDelete(id);                             // delete the tourist
    res.redirect('/Dashboard/Tourist')
};
export const Tourist_Edit = async (req, res) => {
    const { id, name, username, password, country, phone, facebook_link, instagram_link, Bio } = req.body;
    const the_Tourist = await Tourists.findOne({ _id: id }).lean();
    if (the_Tourist.username == username) {
        await Tourists.findByIdAndUpdate(id, { $set: { name } })
        await Tourists.findByIdAndUpdate(id, { $set: { country } })
        await Tourists.findByIdAndUpdate(id, { $set: { username } })
        await Tourists.findByIdAndUpdate(id, { $set: { phone } })
        await Tourists.findByIdAndUpdate(id, { $set: { Bio } })
        await Tourists.findByIdAndUpdate(id, { $set: { facebook_link } })
        await Tourists.findByIdAndUpdate(id, { $set: { instagram_link } })
        if (password != "") {
            var salt = bcrypt.genSaltSync(10);                                  // To Decrypt password
            var encryotedPassword = bcrypt.hashSync(password, salt);            // To Decrypt password
            await Tourists.findByIdAndUpdate(id, { $set: { password: encryotedPassword } })
        }
        if (req.file !== undefined) {
            const { filename } = req.file;
            deleteFile("Upload\\img\\Tourists\\" + the_Tourist.image);
            await Tourists.findByIdAndUpdate(id, { $set: { image: filename } });
        }
        res.redirect('/Dashboard/Tourist')
    }
    else {
        const Tourist = await Tourists.findOne({ username }).lean();
        const Tourguide = await Tourguides.findOne({ username }).lean();
        const Admin = await Admins.findOne({ username }).lean();
        if (Tourist === null && Tourguide === null && Admin === null) {
            await Tourists.findByIdAndUpdate(id, { $set: { name } })
            await Tourists.findByIdAndUpdate(id, { $set: { country } })
            await Tourists.findByIdAndUpdate(id, { $set: { username } })
            await Tourists.findByIdAndUpdate(id, { $set: { phone } })
            await Tourists.findByIdAndUpdate(id, { $set: { Bio } })
            await Tourists.findByIdAndUpdate(id, { $set: { facebook_link } })
            await Tourists.findByIdAndUpdate(id, { $set: { instagram_link } })
            if (password != "") {
                var salt = bcrypt.genSaltSync(10);                                  // To Decrypt password
                var encryotedPassword = bcrypt.hashSync(password, salt);            // To Decrypt password
                await Tourists.findByIdAndUpdate(id, { $set: { password: encryotedPassword } })
            }
            if (req.file !== undefined) {
                console.log(req.file)
                const { filename } = req.file;
                deleteFile("Upload\\img\\Tourists\\" + the_Tourist.image);
                await Tourists.findByIdAndUpdate(id, { $set: { image: filename } });
            }
            res.redirect('/Dashboard/Tourist')
        } else {
            notifier.notify({
                title: 'Warning!',
                message: 'you cannot use this UserName',
                sound: true,
                wait: true
            })
            res.status(204).send()

        }
    }

};

// --------------------Governorate------------------------
export const Governorate = async (req, res) => {
    const governorates = await Governorates.find().lean();
    res.render('Dashboard/Governorate', { governorates ,contact_Messages,contact_Messages_Number,Activation_number,Bills_number,tourguides_contact_number})
};
export const Governorate_Add = async (req, res) => {
    const { name, description, Wikipedia_link, weather_link, video_link, popular } = req.body;
    const { filename } = req.file;
    await Governorates.create({
        name,
        description,
        Wikipedia_link,
        weather_link,
        video_link,
        image: filename,
        popular,
        places_number: 0,
    });
    res.redirect('/Dashboard/Governorate')
};
export const Governorate_Delete = async (req, res) => {
    console.log(req.params)
    const { id } = req.params
    const the_Governorate = await Governorates.findOne({ _id: id }).lean();  // get the toutist
    deleteFile("Upload\\img\\Governorates\\" + the_Governorate.image);          // delete the tourist image from the folder
    await Governorates.findByIdAndDelete(id);                             // delete the tourist
    res.redirect('/Dashboard/Governorate')
};
export const Governorate_Edit = async (req, res) => {
    const { id, name, description, Wikipedia_link, weather_link, video_link, popular } = req.body;
    await Governorates.findByIdAndUpdate(id, { $set: { name } })
    await Governorates.findByIdAndUpdate(id, { $set: { description } })
    await Governorates.findByIdAndUpdate(id, { $set: { Wikipedia_link } })
    await Governorates.findByIdAndUpdate(id, { $set: { weather_link } })
    await Governorates.findByIdAndUpdate(id, { $set: { video_link } })
    await Governorates.findByIdAndUpdate(id, { $set: { popular } })
    if (req.file !== undefined) {
        const { filename } = req.file;
        const the_Governorate = await Governorates.findOne({ _id: id }).lean();
        deleteFile("Upload\\img\\Governorates\\" + the_Governorate.image);
        await Governorates.findByIdAndUpdate(id, { $set: { image: filename } });
    }
    res.redirect('/Dashboard/Governorate')
};

// --------------------Trip------------------------
export const Trip = async (req, res) => {
    const trips = await Trips.find().lean();
    res.render('Dashboard/Trip', { trips ,contact_Messages,contact_Messages_Number,Activation_number,Bills_number,tourguides_contact_number })
};
export const Trip_Add = async (req, res) => {
    const { name, description, price, rate } = req.body;
    const the_destination1 = await Places.findOne({ name: name }).lean();
    if (the_destination1 == null) {
        const { filename } = req.file;
        await Trips.create({
            name,
            description,
            price,
            rate,
            image: filename,
        });
        res.redirect('/Dashboard/Trip')
    } else {
        notifier.notify({
            title: 'NO Addition!',
            message: 'This trip Already have an Information',
            sound: true,
            wait: true
        })
        res.status(204).send()

    }

};
export const Trip_Delete = async (req, res) => {
    console.log(req.params)
    const { id } = req.params
    const the_Trip = await Trips.findOne({ _id: id }).lean();  // get the toutist
    deleteFile("Upload\\img\\Trip\\" + the_Trip.image);          // delete the tourist image from the folder
    await Trips.findByIdAndDelete(id);                             // delete the tourist
    res.redirect('/Dashboard/Trip')
};
export const Trip_Edit = async (req, res) => {
    const { id, name, description, price, rate } = req.body;
    await Trips.findByIdAndUpdate(id, { $set: { name } })
    await Trips.findByIdAndUpdate(id, { $set: { description } })
    await Trips.findByIdAndUpdate(id, { $set: { price } })
    await Trips.findByIdAndUpdate(id, { $set: { rate } })
    if (req.file !== undefined) {
        const { filename } = req.file;
        const the_Trip = await Trips.findOne({ _id: id }).lean();
        deleteFile("Upload\\img\\Trip\\" + the_Trip.image);
        await Trips.findByIdAndUpdate(id, { $set: { image: filename } });
    }
    res.redirect('/Dashboard/Trip')
};

// --------------------Trip_Details------------------------
export const Trip_Details = async (req, res) => {
    const trip_Details = await Trip_Detailss.find().populate('trip_id').populate('destination_1').populate('destination_2').populate('destination_3').populate('destination_4').populate('destination_5').populate('destination_6').lean();
    const trips = await Trips.find().lean();
    const places = await Places.find().lean();
    trip_Details.forEach((element) => {
        element.places = places
    });
    res.render('Dashboard/Trip_Details', { trip_Details, trips, places ,contact_Messages,contact_Messages_Number,Activation_number,Bills_number,tourguides_contact_number })
};
export const Trip_Details_Add = async (req, res) => {
    const { trip_id, title, duration, tour_location, tour_availability, Pickup_and_Drop_Off, tour_type, tour_description, lunch_time, tour_itinerary, destination_1, destination_2, destination_3, destination_4, destination_5, destination_6 } = req.body;
    const the_trip = await Trips.findOne({ _id: trip_id }).lean();
    const search_trip_details = await Trip_Detailss.findOne({ trip_id: trip_id }).lean();
    if (search_trip_details == null) {
        console.log("Yes IF")
        await Trip_Detailss.create({
            trip_id,
            name: the_trip.name,
            title,
            duration,
            tour_location,
            tour_availability,
            Pickup_and_Drop_Off,
            tour_type,
            tour_description,
            lunch_time,
            tour_itinerary,
            destination_1,
        });
        const the_trip_details = await Trip_Detailss.findOne({ trip_id: trip_id }).lean();
        if (destination_2 != "None") {
            await Trip_Detailss.findByIdAndUpdate(the_trip_details._id, { $set: { destination_2 } })
        }
        if (destination_3 != "None") {
            await Trip_Detailss.findByIdAndUpdate(the_trip_details._id, { $set: { destination_3 } })
        }
        if (destination_4 != "None") {
            await Trip_Detailss.findByIdAndUpdate(the_trip_details._id, { $set: { destination_4 } })
        }
        if (destination_5 != "None") {
            await Trip_Detailss.findByIdAndUpdate(the_trip_details._id, { $set: { destination_5 } })
        }
        if (destination_6 != "None") {
            await Trip_Detailss.findByIdAndUpdate(the_trip_details._id, { $set: { destination_6 } })
        }
        res.redirect('/Dashboard/Trip_Details')
    } else {
        notifier.notify({
            title: 'NO Addition!',
            message: 'This trip Already have an Information',
            sound: true,
            wait: true
        })
        res.status(204).send()
    }

};
export const Trip_Details_Delete = async (req, res) => {
    const { id } = req.params
    await Trip_Detailss.findByIdAndDelete(id);                             // delete the tourist
    res.redirect('/Dashboard/Trip_Details')
};
export const Trip_Details_Edit = async (req, res) => {
    const { id, title, duration, tour_location, tour_availability, Pickup_and_Drop_Off, tour_type, tour_description, lunch_time, tour_itinerary, destination_1, destination_2, destination_3, destination_4, destination_5, destination_6 } = req.body;
    await Trip_Detailss.findByIdAndUpdate(id, { $set: { title } })
    await Trip_Detailss.findByIdAndUpdate(id, { $set: { duration } })
    await Trip_Detailss.findByIdAndUpdate(id, { $set: { tour_location } })
    await Trip_Detailss.findByIdAndUpdate(id, { $set: { tour_availability } })
    await Trip_Detailss.findByIdAndUpdate(id, { $set: { Pickup_and_Drop_Off } })
    await Trip_Detailss.findByIdAndUpdate(id, { $set: { tour_type } })
    await Trip_Detailss.findByIdAndUpdate(id, { $set: { tour_description } })
    await Trip_Detailss.findByIdAndUpdate(id, { $set: { lunch_time } })
    await Trip_Detailss.findByIdAndUpdate(id, { $set: { tour_itinerary } })
    if (destination_1 != undefined ) {
        const the_destination1 = await Places.findOne({ name: destination_1 }).lean();
        await Trip_Detailss.findByIdAndUpdate(id, { $set: { destination_1: the_destination1._id } })
    }
    if (destination_2 != undefined ) {
        const the_destination_2 = await Places.findOne({ name: destination_2 }).lean();
        await Trip_Detailss.findByIdAndUpdate(id, { $set: { destination_2: the_destination_2._id } })
    }
    if (destination_3 != undefined ) {
        console.log(destination_3)
        const the_destination_3 = await Places.findOne({ name: destination_3 }).lean();
        await Trip_Detailss.findByIdAndUpdate(id, { $set: { destination_3: the_destination_3._id } })
    }
    if (destination_4 != undefined ) {
        const the_destination_4 = await Places.findOne({ name: destination_4 }).lean();
        await Trip_Detailss.findByIdAndUpdate(id, { $set: { destination_4: the_destination_4._id } })
    }
    if (destination_5 != undefined ) {
        const the_destination_5 = await Places.findOne({ name: destination_5 }).lean();
        await Trip_Detailss.findByIdAndUpdate(id, { $set: { destination_5: the_destination_5._id } })
    }
    if (destination_6 != undefined ) {
        const the_destination_6 = await Places.findOne({ name: destination_6 }).lean();
        await Trip_Detailss.findByIdAndUpdate(id, { $set: { destination_6: the_destination_6._id } })
    }
    res.redirect('/Dashboard/Trip_Details')
};

// --------------------Company------------------------
export const Company = async (req, res) => {
    const companies = await Companies.find().lean();
    res.render('Dashboard/Company', { companies ,contact_Messages,contact_Messages_Number,Activation_number,Bills_number,tourguides_contact_number})
};
export const Company_Add = async (req, res) => {
    const { name, description, link } = req.body;
    if (req.file !== undefined) {
        const { filename } = req.file;
        await Companies.create({
            name,
            description,
            link,
            image: filename,
        });
        res.redirect('/Dashboard/Company')
    }
}
export const Company_Delete = async (req, res) => {
    const { id } = req.params
    const the_Company = await Companies.findOne({ _id: id }).lean();
    deleteFile("Upload\\img\\Companies\\" + the_Company.image);
    await Companies.findByIdAndDelete(id);                             // delete the tourist
    res.redirect('/Dashboard/Company')
};
export const Company_Edit = async (req, res) => {
    const { id, name, description, link } = req.body;
    await Companies.findByIdAndUpdate(id, { $set: { name } })
    await Companies.findByIdAndUpdate(id, { $set: { description } })
    await Companies.findByIdAndUpdate(id, { $set: { link } })
    if (req.file !== undefined) {
        const { filename } = req.file;
        const the_Company = await Companies.findOne({ _id: id }).lean();
        deleteFile("Upload\\img\\Companies\\" + the_Company.image);
        await Companies.findByIdAndUpdate(id, { $set: { image: filename } });
    };
    res.redirect('/Dashboard/Company')
};

// --------------------Embassy------------------------
export const Embassy = async (req, res) => {
    const embassies = await Embassies.find().lean();
    res.render('Dashboard/Embassy', { embassies ,contact_Messages,contact_Messages_Number,Activation_number,Bills_number,tourguides_contact_number})
};
export const Embassy_Add = async (req, res) => {
    const { name, address, telephone, email, office_Hours } = req.body;
    if (req.file !== undefined) {
        const { filename } = req.file;
        await Embassies.create({
            name,
            address,
            telephone,
            email,
            office_Hours,
            image: filename,
        });
        res.redirect('/Dashboard/Embassy')
    }
}
export const Embassy_Delete = async (req, res) => {
    const { id } = req.params
    const the_Embassy = await Embassies.findOne({ _id: id }).lean();
    deleteFile("Upload\\img\\Embassies\\" + the_Embassy.image);
    await Embassies.findByIdAndDelete(id);
    res.redirect('/Dashboard/Embassy')
};
export const Embassy_Edit = async (req, res) => {
    const { id, name, address, telephone, email, office_Hours } = req.body;
    await Embassies.findByIdAndUpdate(id, { $set: { name } })
    await Embassies.findByIdAndUpdate(id, { $set: { address } })
    await Embassies.findByIdAndUpdate(id, { $set: { telephone } })
    await Embassies.findByIdAndUpdate(id, { $set: { email } })
    await Embassies.findByIdAndUpdate(id, { $set: { office_Hours } })
    if (req.file !== undefined) {
        const { filename } = req.file;
        const the_Embassy = await Embassies.findOne({ _id: id }).lean();
        deleteFile("Upload\\img\\Embassies\\" + the_Embassy.image);
        await Embassies.findByIdAndUpdate(id, { $set: { image: filename } });
    };
    res.redirect('/Dashboard/Embassy')
};

// --------------------Food------------------------
export const Food = async (req, res) => {
    const foods = await Foods.find().lean();
    res.render('Dashboard/Food', { foods ,contact_Messages,contact_Messages_Number,Activation_number,Bills_number,tourguides_contact_number})
};
export const Food_Add = async (req, res) => {
    const { name, description } = req.body;
    if (req.file !== undefined) {
        const { filename } = req.file;
        await Foods.create({
            name,
            description,
            image: filename,
        });
        res.redirect('/Dashboard/Food')
    }
}
export const Food_Delete = async (req, res) => {
    const { id } = req.params
    const the_Food = await Foods.findOne({ _id: id }).lean();
    deleteFile("Upload\\img\\Food\\" + the_Food.image);
    await Foods.findByIdAndDelete(id);
    res.redirect('/Dashboard/Food')
};
export const Food_Edit = async (req, res) => {
    const { id, name, description } = req.body;
    await Foods.findByIdAndUpdate(id, { $set: { name } })
    await Foods.findByIdAndUpdate(id, { $set: { description } })
    if (req.file !== undefined) {
        const { filename } = req.file;
        const the_Food = await Foods.findOne({ _id: id }).lean();
        deleteFile("Upload\\img\\Food\\" + the_Food.image);
        await Foods.findByIdAndUpdate(id, { $set: { image: filename } });
    };
    res.redirect('/Dashboard/Food')
};

// --------------------Place------------------------
export const Place = async (req, res) => {
    const places = await Places.find().populate('governorate').lean();
    const governorates = await Governorates.find().lean();
    const arr = []
    governorates.forEach((element) => {
        arr.push(element.name)
    });
    places.forEach((element) => {
        element.The_Governorates = arr
    });
    res.render('Dashboard/Place', { places, governorates ,contact_Messages,contact_Messages_Number,Activation_number,Bills_number,tourguides_contact_number})
};
export const Place_Add = async (req, res) => {
    const { governorate, name, description, type, video_link, Wikipedia_link, location_link, Egy_Student_Ticket, Non_Egy_Student_Ticket, Egy_Adults_Ticket,
        Non_Egy_Adults_Ticket, Egy_Senior_Ticket, Non_Egy_Senior_Ticket, Egy_Special_Needs_Ticket, Non_Egy_Special_Needs_Ticket, Opening_Hours, place_website } = req.body;
    console.log(req.files)
    if (req.files !== undefined) {
        let main_image = ""
        let image_1 = ""
        let image_2 = ""
        let image_3 = ""
        let image_4 = ""
        let image_5 = ""
        let image_6 = ""


        if (req.files.main_image !== undefined) {
            console.log(req.files.main_image[0].filename)
            main_image = req.files.main_image[0].filename
        }
        if (req.files.image_1 !== undefined) {
            console.log(req.files.image_1[0].filename)
            image_1 = req.files.image_1[0].filename
        }
        if (req.files.image_2 !== undefined) {
            console.log(req.files.image_2[0].filename)
            image_2 = req.files.image_2[0].filename
        }
        if (req.files.image_3 !== undefined) {
            console.log(req.files.image_3[0].filename)
            image_3 = req.files.image_3[0].filename
        }
        if (req.files.image_4 !== undefined) {
            console.log(req.files.image_4[0].filename)
            image_4 = req.files.image_4[0].filename
        }
        if (req.files.image_5 !== undefined) {
            console.log(req.files.image_5[0].filename)
            image_5 = req.files.image_5[0].filename
        }
        if (req.files.image_6 !== undefined) {
            console.log(req.files.image_6[0].filename)
            image_6 = req.files.image_6[0].filename
        }
        await Places.create({
            governorate,
            name,
            description,
            rate:"0",
            type,
            video_link,
            Wikipedia_link,
            location_link,
            main_image,
            image_1,
            image_2,
            image_3,
            image_4,
            image_5,
            image_6,
            Egy_Student_Ticket,
            Non_Egy_Student_Ticket,
            Egy_Adults_Ticket,
            Non_Egy_Adults_Ticket,
            Egy_Senior_Ticket,
            Non_Egy_Senior_Ticket,
            Egy_Special_Needs_Ticket,
            Non_Egy_Special_Needs_Ticket,
            Opening_Hours,
            place_website
        });
        res.redirect('/Dashboard/Place')
    }
}
export const Place_Delete = async (req, res) => {
    const { id } = req.params
    const the_Place = await Places.findOne({ _id: id }).lean();
    deleteFile("Upload\\img\\Places\\" + the_Place.main_image);
    deleteFile("Upload\\img\\Places\\" + the_Place.image_1);
    deleteFile("Upload\\img\\Places\\" + the_Place.image_2);
    deleteFile("Upload\\img\\Places\\" + the_Place.image_3);
    deleteFile("Upload\\img\\Places\\" + the_Place.image_4);
    deleteFile("Upload\\img\\Places\\" + the_Place.image_5);
    deleteFile("Upload\\img\\Places\\" + the_Place.image_6);
    await Places.findByIdAndDelete(id);
    res.redirect('/Dashboard/Place')
};
export const Place_Edit = async (req, res) => {
    const { id, governorate, name, description, type, video_link, Wikipedia_link, location_link, Egy_Student_Ticket, Non_Egy_Student_Ticket, Egy_Adults_Ticket,
        Non_Egy_Adults_Ticket, Egy_Senior_Ticket, Non_Egy_Senior_Ticket, Egy_Special_Needs_Ticket, Non_Egy_Special_Needs_Ticket, Opening_Hours, place_website } = req.body;
    const the_gov = await Governorates.findOne({ name: governorate }).lean();
    await Places.findByIdAndUpdate(id, { $set: { governorate: the_gov._id } })
    await Places.findByIdAndUpdate(id, { $set: { name } })
    await Places.findByIdAndUpdate(id, { $set: { description } })
    await Places.findByIdAndUpdate(id, { $set: { type } })
    await Places.findByIdAndUpdate(id, { $set: { video_link } })
    await Places.findByIdAndUpdate(id, { $set: { Wikipedia_link } })
    await Places.findByIdAndUpdate(id, { $set: { location_link } })
    await Places.findByIdAndUpdate(id, { $set: { Egy_Student_Ticket } })
    await Places.findByIdAndUpdate(id, { $set: { Non_Egy_Student_Ticket } })
    await Places.findByIdAndUpdate(id, { $set: { Egy_Adults_Ticket } })
    await Places.findByIdAndUpdate(id, { $set: { Non_Egy_Adults_Ticket } })
    await Places.findByIdAndUpdate(id, { $set: { Egy_Senior_Ticket } })
    await Places.findByIdAndUpdate(id, { $set: { Non_Egy_Senior_Ticket } })
    await Places.findByIdAndUpdate(id, { $set: { Egy_Special_Needs_Ticket } })
    await Places.findByIdAndUpdate(id, { $set: { Non_Egy_Special_Needs_Ticket } })
    await Places.findByIdAndUpdate(id, { $set: { Opening_Hours } })
    await Places.findByIdAndUpdate(id, { $set: { place_website } })
    if (req.files !== undefined) {
        console.log(req.files)

        if (req.files !== undefined) {
            const the_Place = await Places.findOne({ _id: id }).lean();
            if (req.files.main_image !== undefined) {
                deleteFile("Upload\\img\\Places\\" + the_Place.main_image);
                await Places.findByIdAndUpdate(id, { $set: { main_image: req.files.main_image[0].filename } })
            }
            if (req.files.image_1 !== undefined) {
                deleteFile("Upload\\img\\Places\\" + the_Place.image_1);
                await Places.findByIdAndUpdate(id, { $set: { image_1: req.files.image_1[0].filename } })
            }
            if (req.files.image_2 !== undefined) {
                deleteFile("Upload\\img\\Places\\" + the_Place.image_2);
                await Places.findByIdAndUpdate(id, { $set: { image_2: req.files.image_2[0].filename } })
            }
            if (req.files.image_3 !== undefined) {
                deleteFile("Upload\\img\\Places\\" + the_Place.image_3);
                await Places.findByIdAndUpdate(id, { $set: { image_3: req.files.image_3[0].filename } })
            }
            if (req.files.image_4 !== undefined) {
                deleteFile("Upload\\img\\Places\\" + the_Place.image_4);
                await Places.findByIdAndUpdate(id, { $set: { image_4: req.files.image_4[0].filename } })
            }
            if (req.files.image_5 !== undefined) {
                deleteFile("Upload\\img\\Places\\" + the_Place.image_5);
                await Places.findByIdAndUpdate(id, { $set: { image_5: req.files.image_5[0].filename } })
            }
            if (req.files.image_6 !== undefined) {
                deleteFile("Upload\\img\\Places\\" + the_Place.image_6);
                await Places.findByIdAndUpdate(id, { $set: { image_6: req.files.image_6[0].filename } })
            }
        }
        res.redirect('/Dashboard/Place')
    }
};

// --------------------Tourguide------------------------
export const Tourguide = async (req, res) => {
    const tourguides = await Tourguides.find().lean();
    const governorates = await Governorates.find().lean();
    let array = []
    governorates.forEach((the_governorate) => {
        array.push(the_governorate.name)
    });
    tourguides.forEach((the_tourguide) => {
        let arr = []
        governorates.forEach((the_governorate) => {
            if (the_governorate.Tourguides !== undefined) {
                the_governorate.Tourguides.forEach((the_governorate_tourguide) => {
                    let id = the_governorate_tourguide._id.toString()
                    if (id == the_tourguide._id) {
                        arr.push(the_governorate.name)
                    }
                });
            }
        });
        the_tourguide.work_governorates = arr
        the_tourguide.The_Governorates = array
        arr = []
    });


    res.render('Dashboard/Tourguide', { tourguides, governorates ,contact_Messages,contact_Messages_Number,Activation_number,Bills_number,tourguides_contact_number})
};
export const Tourguide_Add = async (req, res) => {
    console.log(req.body)
    const { name, username, password, governorate, work_gov_1, work_gov_2, work_gov_3, phone, Bio, facebook_link, instagram_link, linkedin_link, language, gender, image } = req.body;
    if (((work_gov_1 == work_gov_2) && (work_gov_1 != "None")) || ((work_gov_2 == work_gov_3) && (work_gov_2 != "None")) || ((work_gov_1 == work_gov_3) && (work_gov_1 != "None"))) {
        notifier.notify({
            title: ' Warning! ',
            message: 'you Cannot Choose the same Work Governorate More than Once ',
            sound: true,
            wait: true
        })
        res.status(204).send()
    } else {
        var salt = bcrypt.genSaltSync(10);
        var encryotedPassword = bcrypt.hashSync(password, salt);
        const check_Tourists = await Tourists.findOne({ username }).lean();    // To ensure there are no duplicate emails
        const check_Tourguides = await Tourguides.findOne({ username }).lean(); // To ensure there are no duplicate emails
        const check_Admins = await Admins.findOne({ username }).lean();         // To ensure there are no duplicate emails
        if (check_Tourists === null && check_Tourguides === null && check_Admins === null) {              // To ensure there are no duplicate emails
            let filename = "Avatar.png";
            if (req.file !== undefined) {
                filename = req.file.filename;
            }
            await Tourguides.create({
                name, username, password, governorate, work_gov_1,
                work_gov_2, work_gov_3, phone, Bio, facebook_link,
                instagram_link, linkedin_link, language, gender, image: filename,
                Tourguide_papers_new : "Created by Admin",
                Tourguide_papers_original :"Created by Admin"
            });
            // To Add the languages
            const the_added_tourguide = await Tourguides.findOne({ name, username }).lean();
            await Tourguides.findByIdAndUpdate(the_added_tourguide._id, { $set: { languages: [language] } })
            // To Add work_gov_1
            const the_governorate = await Governorates.findOne({ _id: work_gov_1 }).lean();
            let arr = the_governorate.Tourguides
            if (arr !== undefined) {
                arr.push(the_added_tourguide._id)
                await Governorates.findByIdAndUpdate(work_gov_1, { $set: { Tourguides: arr } })
            } else {
                await Governorates.findByIdAndUpdate(work_gov_1, { $set: { Tourguides: [the_added_tourguide._id] } })
            }
            if (work_gov_2 != "None") {
                // To Add work_gov_2
                const the_governorate = await Governorates.findOne({ _id: work_gov_2 }).lean();
                let arr = the_governorate.Tourguides
                if (arr !== undefined) {
                    arr.push(the_added_tourguide._id)
                    await Governorates.findByIdAndUpdate(work_gov_2, { $set: { Tourguides: arr } })
                } else {
                    await Governorates.findByIdAndUpdate(work_gov_2, { $set: { Tourguides: [the_added_tourguide._id] } })
                }
            }
            if (work_gov_3 != "None") {
                // To Add work_gov_3
                const the_governorate = await Governorates.findOne({ _id: work_gov_3 }).lean();
                let arr = the_governorate.Tourguides
                if (arr !== undefined) {
                    arr.push(the_added_tourguide._id)
                    await Governorates.findByIdAndUpdate(work_gov_3, { $set: { Tourguides: arr } })
                } else {
                    await Governorates.findByIdAndUpdate(work_gov_3, { $set: { Tourguides: [the_added_tourguide._id] } })
                }
            }
            res.redirect('/Dashboard/Tourguide')


        } else {
            notifier.notify({
                title: 'Warning!',
                message: 'you cannot use this UserName',
                sound: true,
                wait: true
            })
            res.status(204).send()
        }
    }
};
export const Tourguide_Delete = async (req, res) => {
    const { id } = req.params
    const the_Tourguide = await Tourguides.findOne({ _id: id }).lean();  // get the toutist
    const the_governorates = await Governorates.find({ Tourguides: id }).lean();
    for (let is = 0; is < the_governorates.length; is++) {
        let arr = the_governorates[is].Tourguides
        let arr_After_Delete = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i]._id.toString() !== id.toString()) {
                arr_After_Delete.push({ _id: arr[i]._id.toString() });
            }
        }
        await Governorates.findByIdAndUpdate(the_governorates[is]._id, { $set: { Tourguides: arr_After_Delete } })
    };
    deleteFile("Upload\\img\\Tour Guides\\" + the_Tourguide.image);          // delete the tourist image from the folder
    await Tourguides.findByIdAndDelete(id);                             // delete the tourist
    res.redirect('/Dashboard/Tourguide')
};
export const Tourguide_Edit = async (req, res) => {
    const { id, name, username, password, governorate, delete_work, add_work, phone, Bio, facebook_link, instagram_link, linkedin_link, delete_languages, Add_languages } = req.body;
    const the_Tourguide = await Tourguides.findOne({ _id: id }).lean()
    const lang_and_work = async () => {
        let check = ""
        if (add_work !== "None"){
            const the_govern = await Governorates.findOne({ name: add_work }).lean()
            the_govern.Tourguides.forEach((tourguide) => {
                if (tourguide._id.toString() == id) {
                    check = "work_notifier"
                }
            });
        }
        // delete work
        const arr = delete_work
        if (check == "work_notifier") {
            notifier.notify({
                title: 'Warning!',
                message: ' The Tourguide Already have this Governorate',
                sound: true,
                wait: true
            })
            res.status(204).send()
            return false;    // Stops further code execution in Tourguide_Edit
        } else {
            for (let i = 1; i < arr.length; i++) {
                const the_gov = await Governorates.findOne({ name: arr[i] }).lean()
                let array = the_gov.Tourguides
                let arr_After_Delete = [];
                for (let i = 0; i < array.length; i++) {
                    if (array[i]._id.toString() !== id.toString()) {
                        arr_After_Delete.push({ _id: array[i]._id.toString() });
                    }
                }
                await Governorates.findByIdAndUpdate(the_gov._id, { $set: { Tourguides: arr_After_Delete } })
            }
        }
        // Add work
        if (add_work !== "None") {
            if (check == "work_notifier") {
                notifier.notify({
                    title: 'Warning!',
                    message: ' The Tourguide Already have this Governorate',
                    sound: true,
                    wait: true
                })
                res.status(204).send()
                return false;    // Stops further code execution in Tourguide_Edit
            } else {
                const the_gov = await Governorates.findOne({ name: add_work }).lean()
                let addArrayWork = the_gov.Tourguides
                addArrayWork.push(the_Tourguide._id)
                await Governorates.findByIdAndUpdate(the_gov._id, { $set: { Tourguides: addArrayWork } })
            }
        }
        check = ""
        if (Add_languages !== "None"){
        const the_Toyrguide = await Tourguides.findOne({ _id: id }).lean()
        the_Toyrguide.languages.forEach((language) => {
            if (language == Add_languages) {
                check = "language_notifier"
            }
        });
        }
        // delete Languages 
        if (check == "language_notifier") {
            notifier.notify({
                title: 'Warning!',
                message: 'This Language is Added befor',
                sound: true,
                wait: true
            })
            res.status(204).send()
            return false;    // Stops further code execution in Tourguide_Edit
        } else {
            const arr2 = delete_languages
            for (let s = 1; s < arr2.length; s++) {
                const the_Toyrguide = await Tourguides.findOne({ _id: id }).lean()
                let array2 = the_Toyrguide.languages
                let arr_After_Delete = [];
                for (let i = 0; i < array2.length; i++) {
                    if (array2[i] !== arr2[s]) {
                        arr_After_Delete.push(array2[i]);
                    }
                }
                await Tourguides.findByIdAndUpdate(id, { $set: { languages: arr_After_Delete } })
                arr_After_Delete = []
            }
        }
        // Add languages
        if (Add_languages !== "None") {
            if (check == "language_notifier") {
                notifier.notify({
                    title: 'Warning!',
                    message: 'This Language is Added befor',
                    sound: true,
                    wait: true
                })
                res.status(204).send()
                return false;    // Stops further code execution in Tourguide_Edit
            } else {
                const the_Toyrguide = await Tourguides.findOne({ _id: id }).lean()
                let addArray = the_Toyrguide.languages
                addArray.push(Add_languages)
                await Tourguides.findByIdAndUpdate(id, { $set: { languages: addArray } })
            }
        }
        
        return true; // Indicates that everything went fine
    }
    const result = await lang_and_work();  // Correctly call the function
    if (!result){
        return; 
    }else{
        console.log("hereeeeeeeeeeeeeee")
        if (the_Tourguide.username == username) {
            await Tourguides.findByIdAndUpdate(id, { $set: { name } })
            await Tourguides.findByIdAndUpdate(id, { $set: { username } })
            await Tourguides.findByIdAndUpdate(id, { $set: { governorate } })
            await Tourguides.findByIdAndUpdate(id, { $set: { phone } })
            await Tourguides.findByIdAndUpdate(id, { $set: { Bio } })
            await Tourguides.findByIdAndUpdate(id, { $set: { facebook_link } })
            await Tourguides.findByIdAndUpdate(id, { $set: { instagram_link } })
            await Tourguides.findByIdAndUpdate(id, { $set: { linkedin_link } })
            if (password != "") {
                var salt = bcrypt.genSaltSync(10);                                  // To Decrypt password
                var encryotedPassword = bcrypt.hashSync(password, salt);            // To Decrypt password
                await Tourguides.findByIdAndUpdate(id, { $set: { password: encryotedPassword } })
            }
            if (req.file !== undefined) {
                const { filename } = req.file;
                deleteFile("Upload\\img\\Tour Guides\\" + Tourguides.image);
                await Tourguides.findByIdAndUpdate(id, { $set: { image: filename } });
            }
            res.redirect('/Dashboard/Tourguide')
        }
        else {
            const Tourist = await Tourists.findOne({ username }).lean();
            const Tourguide = await Tourguides.findOne({ username }).lean();
            const Admin = await Admins.findOne({ username }).lean();
            if (Tourist === null && Tourguide === null && Admin === null) {
                await Tourguides.findByIdAndUpdate(id, { $set: { name } })
                await Tourguides.findByIdAndUpdate(id, { $set: { username } })
                await Tourguides.findByIdAndUpdate(id, { $set: { governorate } })
                await Tourguides.findByIdAndUpdate(id, { $set: { phone } })
                await Tourguides.findByIdAndUpdate(id, { $set: { Bio } })
                await Tourguides.findByIdAndUpdate(id, { $set: { facebook_link } })
                await Tourguides.findByIdAndUpdate(id, { $set: { instagram_link } })
                await Tourguides.findByIdAndUpdate(id, { $set: { linkedin_link } })
                if (password != "") {
                    var salt = bcrypt.genSaltSync(10);                                  // To Decrypt password
                    var encryotedPassword = bcrypt.hashSync(password, salt);            // To Decrypt password
                    await Tourguides.findByIdAndUpdate(id, { $set: { password: encryotedPassword } })
                }
                if (req.file !== undefined) {
                    const { filename } = req.file;
                    deleteFile("Upload\\img\\Tour Guides\\" + Tourguides.image);
                    await Tourguides.findByIdAndUpdate(id, { $set: { image: filename } });
                }
                res.redirect('/Dashboard/Tourguide')
            } else {
                notifier.notify({
                    title: 'Warning!',
                    message: 'you cannot use this UserName',
                    sound: true,
                    wait: true
                })
                res.status(204).send()
    
            }
        }
    }
   

};

// --------------------Activation------------------------

export const Activation = async (req, res) => {
    const tourguides = await Tourguides.find({state:"Blocked"}).lean();
    res.render('Dashboard/Activation',{tourguides ,contact_Messages,contact_Messages_Number,Activation_number,Bills_number,tourguides_contact_number})
};
export const Activation_CV = async (req, res) => {
    const {id} = req.params
    const tourguides = await Tourguides.findOne({_id:id}).lean();
    const the_cv = tourguides.Tourguide_papers_new
    const downloadFileName = tourguides.Tourguide_papers_original
    const filePath = "./Upload/Tourguide_Doc/"+the_cv
    res.download(filePath, downloadFileName, (downloadErr) => {
        if (downloadErr) {
            res.status(500).send('Error downloading file');
        }
    });
};
export const Active = async (req, res) => {
    console.log(req.body)
    
    const {id,Experience, Hourly_Rate, Total_Tours, English_Level, Languages, Availability} = req.body;
    console.log(Languages)
    await Tourguides.findByIdAndUpdate(id, { $set: { Experience } })
    await Tourguides.findByIdAndUpdate(id, { $set: { Hourly_Rate } })
    await Tourguides.findByIdAndUpdate(id, { $set: { Total_Tours } })
    await Tourguides.findByIdAndUpdate(id, { $set: { English_Level } })
    await Tourguides.findByIdAndUpdate(id, { $set: { Availability } })
    if(Languages!==undefined){
    if (Array.isArray(Languages) && Languages.length > 0) {
        await Tourguides.findByIdAndUpdate(id, { $set: { languages: Languages } });
    }else{
        await Tourguides.findByIdAndUpdate(id, { $set: { languages: [Languages] } });
    }
}
await Tourguides.findByIdAndUpdate(id, { $set: { state: "Active" } });

    res.redirect('/Dashboard/Activation')
};
// --------------------Bills------------------------
export const Bill = async (req, res) => {
    const bills = await Bills.find().populate('user_id').lean();
    res.render('Dashboard/Bills', { bills ,contact_Messages,contact_Messages_Number,Activation_number,Bills_number,tourguides_contact_number})
};
export const Bills_Delete = async (req, res) => {
    const { id } = req.params
    await Bills.findByIdAndDelete(id);                             // delete the tourist
    res.redirect('/Dashboard/Bill')
};
export const Bill_Show = async (req, res) => {
    const {id} = req.params;
   const bill = await Bills.findOne({_id :id}).populate("user_id").lean();
   const amount = bill.amount_cents/100;
    res.render('Bill/bill' , {bill ,amount,check :"Admin"})
};

// --------------------Contact------------------------
export const Contact = async (req, res) => {
    const contact = await Contacts.find({reply:"None"}).lean();
    for(let i = 0 ; i <contact.length ; i++){
        const tourist = await Tourists.findOne({_id :contact[i].user_id }).lean();
        const tourguide = await Tourguides.findOne({_id :contact[i].user_id }).lean();
        if(contact[i].type == "Tourist" && tourist !== null){
            contact[i].name = tourist.name
            contact[i].username = tourist.username
            contact[i].image = tourist.image
        }
        if(contact[i].type == "Tourguide" && tourguide !== null){
            contact[i].name = tourguide.name
            contact[i].username = tourguide.username
            contact[i].image = tourguide.image
        }
    }
  
    res.render('Dashboard/Contact', { contact ,contact_Messages,contact_Messages_Number,Activation_number,Bills_number,tourguides_contact_number})
};
export const Send = async (req, res) => {
    const { id ,message } = req.body
    await Contacts.findByIdAndUpdate(id, { $set: { reply: message } })
    res.redirect('/Dashboard/Contact')
};
export const Done = async (req, res) => {
    const { id } = req.params
    await Contacts.findByIdAndUpdate(id, { $set: { reply: "Done" } })
    res.redirect('/Dashboard/Contact')
};

// --------------------Music------------------------
export const Music = async (req, res) => {
    const musics = await Musics.find().lean();
    res.render('Dashboard/Music', { musics ,contact_Messages,contact_Messages_Number,Activation_number,Bills_number,tourguides_contact_number})
};
export const Music_Add = async (req, res) => {
    const { name, description,Facebook_link,Instagram_link,twitter_link,Google_link,
        Wikipedia_link,song_1_Name,song_1_Released,song_1_Album,song_1_Album_link,song_2_Name,
        song_2_Released,song_2_Album,song_2_Album_link} = req.body;
        const check = await Musics.findOne({name}).lean()
        if(check==undefined){
            await Musics.create({
                name, description,Facebook_link,Instagram_link,twitter_link,Google_link,
                Wikipedia_link,song_1_Name,song_1_Released,song_1_Album,song_1_Album_link,song_2_Name,
                song_2_Released,song_2_Album,song_2_Album_link,
                image : req.files.image[0].filename,
                song_1_Image : req.files.song_1_Image[0].filename,
                song_1 : req.files.song_1[0].filename,
                song_2_Image : req.files.song_2_Image[0].filename,
                song_2 : req.files.song_2[0].filename
            });
            const musics = await Musics.findOne({name}).lean();
            if(Facebook_link==""){await Musics.findByIdAndUpdate(musics._id, { $set: { Facebook_link: "None" } });}
            if(Instagram_link==""){await Musics.findByIdAndUpdate(musics._id, { $set: { Instagram_link: "None" } });}
            if(twitter_link==""){await Musics.findByIdAndUpdate(musics._id, { $set: { twitter_link: "None" } });}
            if(song_2_Album_link==""){await Musics.findByIdAndUpdate(musics._id, { $set: { song_2_Album_link: "None" } });}
            if(song_1_Album_link==""){await Musics.findByIdAndUpdate(musics._id, { $set: { song_1_Album_link: "None" } });}
            res.redirect('/Dashboard/Music')
        }else{
            notifier.notify({
                title: 'Warning!',
                message: 'We already have this singer',
                sound: true,
                wait: true
            })
            res.status(204).send()
        }
        

}
export const Music_Delete = async (req, res) => {
    const { id } = req.params
    const the_Music = await Musics.findOne({ _id: id }).lean();
    deleteFile("Upload\\img\\Music\\" + the_Music.image);
    deleteFile("Upload\\img\\Music\\" + the_Music.song_1_Image);
    deleteFile("Upload\\img\\Music\\" + the_Music.song_1);
    deleteFile("Upload\\img\\Music\\" + the_Music.song_2_Image);
    deleteFile("Upload\\img\\Music\\" + the_Music.song_2);
    await Musics.findByIdAndDelete(id);
    res.redirect('/Dashboard/Music')
};
export const Music_Edit = async (req, res) => {
    const { id,name, description,Facebook_link,Instagram_link,twitter_link,Google_link,
        Wikipedia_link,song_1_Name,song_1_Released,song_1_Album,song_1_Album_link,song_2_Name,
        song_2_Released,song_2_Album,song_2_Album_link} = req.body;
        await Musics.findByIdAndUpdate(id, { $set: { name } })
        await Musics.findByIdAndUpdate(id, { $set: { description } })
        await Musics.findByIdAndUpdate(id, { $set: { Facebook_link } })
        await Musics.findByIdAndUpdate(id, { $set: { Instagram_link } })
        await Musics.findByIdAndUpdate(id, { $set: { twitter_link } })
        await Musics.findByIdAndUpdate(id, { $set: { Google_link } })
        await Musics.findByIdAndUpdate(id, { $set: { Wikipedia_link } })
        await Musics.findByIdAndUpdate(id, { $set: { song_1_Name } })
        await Musics.findByIdAndUpdate(id, { $set: { song_1_Released } })
        await Musics.findByIdAndUpdate(id, { $set: { song_1_Album } })
        await Musics.findByIdAndUpdate(id, { $set: { song_1_Album_link } })
        await Musics.findByIdAndUpdate(id, { $set: { song_2_Name } })
        await Musics.findByIdAndUpdate(id, { $set: { song_2_Released } })
        await Musics.findByIdAndUpdate(id, { $set: { song_2_Album } })
        await Musics.findByIdAndUpdate(id, { $set: { song_2_Album_link } })
        if (req.files.image !== undefined) {
            const filename  = req.files.image[0].filename;
            const the_Music = await Musics.findOne({ _id: id }).lean();
            deleteFile("Upload\\img\\Music\\" + the_Music.image);
            await Musics.findByIdAndUpdate(id, { $set: { image: filename } });
        };
        if (req.files.song_1_Image !== undefined) {
            const filename  = req.files.song_1_Image[0].filename;
            const the_Music = await Musics.findOne({ _id: id }).lean();
            deleteFile("Upload\\img\\Music\\" + the_Music.song_1_Image);
            await Musics.findByIdAndUpdate(id, { $set: { song_1_Image: filename } });
        };
        if (req.files.song_1 !== undefined) {
            const filename  = req.files.song_1[0].filename;
            const the_Music = await Musics.findOne({ _id: id }).lean();
            deleteFile("Upload\\img\\Music\\" + the_Music.song_1);
            await Musics.findByIdAndUpdate(id, { $set: { song_1: filename } });
        };
        if (req.files.song_2_Image !== undefined) {
            const filename  = req.files.song_2_Image[0].filename;
            const the_Music = await Musics.findOne({ _id: id }).lean();
            deleteFile("Upload\\img\\Music\\" + the_Music.song_2_Image);
            await Musics.findByIdAndUpdate(id, { $set: { song_2_Image: filename } });
        };
        if (req.files.song_2 !== undefined) {
            const filename  = req.files.song_2[0].filename;
            const the_Music = await Musics.findOne({ _id: id }).lean();
            deleteFile("Upload\\img\\Music\\" + the_Music.song_2);
            await Musics.findByIdAndUpdate(id, { $set: { song_2: filename } });
        };
    res.redirect('/Dashboard/Music')
};
