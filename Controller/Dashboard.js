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


import bcrypt from 'bcryptjs'
import notifier from 'node-notifier'



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
    res.render('Dashboard/index')
};
// --------------------Admin------------------------
export const Admin = async (req, res) => {
    const admins = await Admins.find().lean();
    res.render('Dashboard/Admin', { admins })
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
    res.render('Dashboard/Tourist', { tourists })
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
    res.render('Dashboard/Governorate', { governorates })
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
    res.render('Dashboard/Trip', { trips })
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

    res.render('Dashboard/Trip_Details', { trip_Details, trips, places })
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
    const the_destination1 = await Places.findOne({ name: destination_1 }).lean();
    await Trip_Detailss.findByIdAndUpdate(id, { $set: { destination_1: the_destination1._id } })
    if (destination_2 != "") {
        const the_destination_2 = await Places.findOne({ name: destination_2 }).lean();
        await Trip_Detailss.findByIdAndUpdate(id, { $set: { destination_2: the_destination_2._id } })
    }
    if (destination_3 != "") {
        const the_destination_3 = await Places.findOne({ name: destination_3 }).lean();
        await Trip_Detailss.findByIdAndUpdate(id, { $set: { destination_3: the_destination_3._id } })
    }
    if (destination_4 != "") {
        const the_destination_4 = await Places.findOne({ name: destination_4 }).lean();
        await Trip_Detailss.findByIdAndUpdate(id, { $set: { destination_4: the_destination_4._id } })
    }
    if (destination_5 != "") {
        const the_destination_5 = await Places.findOne({ name: destination_5 }).lean();
        await Trip_Detailss.findByIdAndUpdate(id, { $set: { destination_5: the_destination_5._id } })
    }
    if (destination_6 != "") {
        const the_destination_6 = await Places.findOne({ name: destination_6 }).lean();
        await Trip_Detailss.findByIdAndUpdate(id, { $set: { destination_6: the_destination_6._id } })
    }
    res.redirect('/Dashboard/Trip_Details')
};

// --------------------Company------------------------
export const Company = async (req, res) => {
    const companies = await Companies.find().lean();
    res.render('Dashboard/Company', { companies })
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
    res.render('Dashboard/Embassy', { embassies })
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
    res.render('Dashboard/Food', { foods })
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
    res.render('Dashboard/Place', { places, governorates })
};
export const Place_Add = async (req, res) => {
    const { governorate, name, description, type, video_link, Wikipedia_link, location_link, Egy_Student_Ticket, Non_Egy_Student_Ticket, Egy_Adults_Ticket,
        Non_Egy_Adults_Ticket, Egy_Senior_Ticket, Non_Egy_Senior_Ticket, Egy_Special_Needs_Ticket, Non_Egy_Special_Needs_Ticket, Opening_Hours, place_website } = req.body;
    console.log(req.body)
    console.log(req.files)
    if (req.files !== undefined) {
        let main_image = ""
        let image_1 = ""
        let image_2 = ""
        let image_3 = ""
        let image_4 = ""
        let image_5 = ""
        let image_6 = ""
        if (req.files.length >= 1) {
            main_image = req.files[0].filename;
        }
        if (req.files.length >= 2) {
            image_1 = req.files[1].filename;
        }
        if (req.files.length >= 3) {
            image_2 = req.files[2].filename;
        }
        if (req.files.length >= 4) {
            image_3 = req.files[3].filename;
        }
        if (req.files.length >= 5) {
            image_4 = req.files[4].filename;
        }
        if (req.files.length >= 6) {
            image_5 = req.files[5].filename;
        }
        if (req.files.length >= 7) {
            image_6 = req.files[6].filename;
        }
        await Places.create({
            governorate,
            name,
            description,
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
    deleteFile("Upload\\img\\Places\\" + the_Place.image);
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
        if (req.files.length >= 1) {
            const the_Place = await Places.findOne({ _id: id }).lean();
            deleteFile("Upload\\img\\Places\\" + the_Place.main_image);
            await Places.findByIdAndUpdate(id, { $set: { main_image : req.files[0].filename } })
        }
        if (req.files.length >= 2) {
            const the_Place = await Places.findOne({ _id: id }).lean();
            deleteFile("Upload\\img\\Places\\" + the_Place.image_1);
            await Places.findByIdAndUpdate(id, { $set: { image_1 : req.files[1].filename } })
        }
        if (req.files.length >= 3) {
            image_2 = req.files[2].filename;
            const the_Place = await Places.findOne({ _id: id }).lean();
            deleteFile("Upload\\img\\Places\\" + the_Place.image_2);
            await Places.findByIdAndUpdate(id, { $set: { image_2 } })
        }
        if (req.files.length >= 4) {
            image_3 = req.files[3].filename;
            const the_Place = await Places.findOne({ _id: id }).lean();
            deleteFile("Upload\\img\\Places\\" + the_Place.image_3);
            await Places.findByIdAndUpdate(id, { $set: { image_3 } })
        }
        if (req.files.length >= 5) {
            image_4 = req.files[4].filename;
            const the_Place = await Places.findOne({ _id: id }).lean();
            deleteFile("Upload\\img\\Places\\" + the_Place.image_4);
            await Places.findByIdAndUpdate(id, { $set: { image_4 } })
        }
        if (req.files.length >= 6) {
            image_5 = req.files[5].filename;
            const the_Place = await Places.findOne({ _id: id }).lean();
            deleteFile("Upload\\img\\Places\\" + the_Place.image_5);
            await Places.findByIdAndUpdate(id, { $set: { image_5 } })
        }
        if (req.files.length >= 7) {
            image_6 = req.files[6].filename;
            const the_Place = await Places.findOne({ _id: id }).lean();
            deleteFile("Upload\\img\\Places\\" + the_Place.image_6);
            await Places.findByIdAndUpdate(id, { $set: { image_6 } })
        }
    res.redirect('/Dashboard/Place')
    }
};
