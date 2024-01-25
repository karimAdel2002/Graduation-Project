import  express from 'express';
import { engine } from 'express-handlebars';
import dotenv from 'dotenv';
dotenv.config();
import login_route from './Routes/login_route.js'
import home_route from './Routes/home_route.js'
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { authentication } from './middleware/authentication.js';
mongoose.connect(process.env.mongooconectionurl)
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



app.listen(process.env.port, () => {
    
    console.log('started the application on http://localhost:' + process.env.port)
})