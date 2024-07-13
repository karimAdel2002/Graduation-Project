import { Router } from 'express';
import { index, check,register,log_out , google } from '../Controller/login.js';
import passport  from'passport';
import '../API files/passport.js';
import multer from "multer";
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'Upload/Tourguide_Doc')
    },
    filename: function (req, file, cb) { 
      cb(null, file.fieldname + '-' +Date.now()+'.pdf')
    }
  })
  
  var upload = multer({ storage: storage })

const router = new Router();


router.get('/', index);
router.get('/log_out', log_out);
router.get('/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/google/callback',passport.authenticate('google',{failureRedirect:"/failed"}),google);



router.post('/check', check);
router.post('/register', upload.single('Tourguide_papers') , register);











export default router;