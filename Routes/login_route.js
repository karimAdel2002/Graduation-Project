import { Router } from 'express';
import { index, check,regisetr_tourguide,regisetr_tourist ,store_tourguide,store_tourist,register } from '../Controller/login.js';
import multer from "multer";

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'Upload/')
    },
    filename: function (req, file, cb) { 
      cb(null, file.fieldname + '-' +Date.now()+'.pdf')
    }
  })
  
  var upload = multer({ storage: storage })

const router = new Router();


router.get('/', index);
router.post('/check', check);

router.get('/regisetr_tourguide', regisetr_tourguide);
router.get('/regisetr_tourist', regisetr_tourist);
router.post('/regisetr_tourguide', store_tourguide);
router.post('/regisetr_tourist', store_tourist);
router.post('/register', upload.single('Tourguide_papers') , register);










export default router;