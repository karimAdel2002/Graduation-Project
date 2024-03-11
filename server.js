import  express from 'express';
import { engine } from 'express-handlebars';
import dotenv from 'dotenv';
dotenv.config();
import login_route from './Routes/login_route.js'
import home_route from './Routes/home_route.js'
import governorate_route from './Routes/governorate_route.js'
import food_route from './Routes/food_route.js'
import contact_route from './Routes/contact_route.js'
import about_route from './Routes/about_route.js'
import travel_tips_route from './Routes/travel_tips_route.js'
import travel_visa_route from './Routes/travel_visa_route.js'
import weather_route from './Routes/weather_route.js'
import trip_route from './Routes/trip_route.js'
import language_route from './Routes/language_route.js'
import companies_route from './Routes/companies_route.js'
import tourguides_route from './Routes/tourguides_route.js'
import music_route from './Routes/music_route.js'
import astro_tourism_route from './Routes/astro_tourism_route.js'
import embassies_route from './Routes/embassies_route.js'







import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { authentication } from './middleware/authentication.js';
mongoose.connect(process.env.mongooconectionurl);
// mongoose.connect(process.env.mongooconectionurl, {
//   userNewUrlPaser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
// })
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((e) => {
//     console.log('not connected');
//   });
  
const app = express();
app.use(cookieParser())


app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './Templates');

app.use(express.static("Templates"));
app.use(express.static("Upload"));

app.use('/sign_in',login_route);
app.use('/Home',authentication,home_route);
app.use('/Governorates',authentication,governorate_route);
app.use('/Food',authentication,food_route);
app.use('/Contact',authentication,contact_route);
app.use('/About',authentication,about_route);
app.use('/Travel_Tips',authentication,travel_tips_route);
app.use('/Travel_Visa',authentication,travel_visa_route);
app.use('/Weather',authentication,weather_route);
app.use('/Trip',authentication,trip_route);
app.use('/Language',authentication,language_route);
app.use('/Companies',authentication,companies_route);
app.use('/Tourguides',authentication,tourguides_route);
app.use('/Music',authentication,music_route);
app.use('/Astro_Tourism',authentication,astro_tourism_route);
app.use('/Embassies',authentication,embassies_route);







app.listen(process.env.port, () => {
    
    console.log('started the application on http://localhost:' + process.env.port)
})