import Tourists_Acc from "../DB Models/Tourists_Acc.js"
import Tourguide_Acc from "../DB Models/Tourguide_Acc.js"
import Admin_Acc from "../DB Models/Admin_Acc.js"
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"


export const index = async (req, res) => {
    
    res.render('sign_in/login')
};
export const check = async (req, res) => {
    const { username, password } = req.body;
    const Tourists = await Tourists_Acc.findOne({ username }).lean();
    const Tourguides = await Tourguide_Acc.findOne({ username }).lean();
    const Admins = await Admin_Acc.findOne({ username }).lean();
    if (Admins !== null) {
        const isCorrectPassword = bcrypt.compareSync(password, Admins.password); //To Compare between the decrypted password in DB and entered password
        if (!isCorrectPassword) {                                                  //To Compare between the decrypted password in DB and entered password
            return res.send("wrong Username or Password")
        }
        const id = Admins._id
        const jwtToken = jwt.sign(id.toJSON(), process.env.JWT_SECRET);
        res.cookie('token', jwtToken)
        res.cookie('UserType', "Admin")
        res.redirect("/Home")
    }
    if (Tourguides !== null) {
        if (Tourguides.state == "Active") {                                          // Checking Account State
            const isCorrectPassword = bcrypt.compareSync(password, Tourguides.password);//To Compare between the decrypted password in DB and entered password
            if (!isCorrectPassword) {                                                     //To Compare between the decrypted password in DB and entered password
                return res.send("wrong Username or Password")
            }
            const id = Tourguides._id
            const jwtToken = jwt.sign(id.toJSON(), process.env.JWT_SECRET);
            res.cookie('token', jwtToken)
            res.cookie('UserType', "Tourguide")
            res.redirect("/Home")
        } else { res.send("Administrators have not yet activated your account ") }
    }
    if (Tourists !== null) {
        const isCorrectPassword = bcrypt.compareSync(password, Tourists.password);     //To Compare between the decrypted password in DB and entered password
        if (!isCorrectPassword) {                                                        //To Compare between the decrypted password in DB and entered password
            return res.send("wrong Username or Password")
        }
        const id = Tourists._id
        const jwtToken = jwt.sign(id.toJSON(), process.env.JWT_SECRET);
        res.cookie('token', jwtToken)
        res.cookie('UserType', "Tourist")
        res.redirect("/Home")

    }
    if (Tourists === null && Tourguides === null && Admins === null) {
        return res.send("Incorrect username or password")
    }
}
export const register = async (req, res) => {
    console.log(req.body)
    const { choice } = req.body;

    if (choice === undefined) {
        const { name, username, password, governorate, gender } = req.body;
        var salt = bcrypt.genSaltSync(10);                                  // To Decrypt password
        var encryotedPassword = bcrypt.hashSync(password, salt);            // To Decrypt password
        const Tourists = await Tourists_Acc.findOne({ username }).lean();    // To ensure there are no duplicate emails
        const Tourguides = await Tourguide_Acc.findOne({ username }).lean(); // To ensure there are no duplicate emails
        const Admins = await Admin_Acc.findOne({ username }).lean();         // To ensure there are no duplicate emails
        if (Tourists === null && Tourguides === null && Admins === null) {              // To ensure there are no duplicate emails
            await Tourguide_Acc.create({
                name,
                username,
                password: encryotedPassword,
                governorate,
                gender,
                Tourguide_papers_new: req.file.filename,
                Tourguide_papers_original: req.file.originalname,
            });
            res.redirect("/sign_in")
        }
        else { res.send("you can't sign this email") }
    }
    if (choice == "Tourist") {

        const { name, username, password, country, gender } = req.body;
        var salt = bcrypt.genSaltSync(10);                                  // To Decrypt password
        var encryotedPassword = bcrypt.hashSync(password, salt);            // To Decrypt password
        const Tourists = await Tourists_Acc.findOne({ username }).lean();    // To ensure there are no duplicate emails
        const Tourguides = await Tourguide_Acc.findOne({ username }).lean(); // To ensure there are no duplicate emails
        const Admins = await Admin_Acc.findOne({ username }).lean();         // To ensure there are no duplicate emails
        if (Tourists === null && Tourguides === null && Admins === null) {              // To ensure there are no duplicate emails
            await Tourists_Acc.create({
                name,
                username,
                password: encryotedPassword,
                country,
                gender,
            });
            res.redirect("/sign_in")
        }
        else { res.send("you can't sign this email") }
    }
};
export const log_out = async (req, res) => {
    res.clearCookie("token");
    res.redirect('/sign_in')
};
export const google = async (req, res) => {
    const user = req.user;
    const username = user.email
    const password = user.id
    const name = user.displayName

    const Tourists = await Tourists_Acc.findOne({ username }).lean();
    if (Tourists !== null) {
        const isCorrectPassword = bcrypt.compareSync(password, Tourists.password);     //To Compare between the decrypted password in DB and entered password
        if (!isCorrectPassword) {                                                        //To Compare between the decrypted password in DB and entered password
            return res.send("you cannot login with this email")
        }
        const id = Tourists._id
        const jwtToken = jwt.sign(id.toJSON(), process.env.JWT_SECRET);
        res.cookie('token', jwtToken)
        res.redirect("/Home")

    }
    if (Tourists === null) {
        var salt = bcrypt.genSaltSync(10);                                  // To Decrypt password
        var encryotedPassword = bcrypt.hashSync(password, salt);            // To Decrypt password
        const Tourists = await Tourists_Acc.findOne({ username }).lean();    // To ensure there are no duplicate emails
        const Tourguides = await Tourguide_Acc.findOne({ username }).lean(); // To ensure there are no duplicate emails
        const Admins = await Admin_Acc.findOne({ username }).lean();         // To ensure there are no duplicate emails
        if (Tourists === null && Tourguides === null && Admins === null) {              // To ensure there are no duplicate emails
            await Tourists_Acc.create({
                name,
                username,
                password: encryotedPassword,
            });
            const new_Tourists = await Tourists_Acc.findOne({ username }).lean();    // To get the id 
            const id = new_Tourists._id
            const jwtToken = jwt.sign(id.toJSON(), process.env.JWT_SECRET);
            res.cookie('token', jwtToken)

            res.redirect("/Home")
        }
        else { res.send("you can't sign this email") }
    }

};

