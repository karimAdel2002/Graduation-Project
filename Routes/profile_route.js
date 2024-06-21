import { Router } from 'express';
import { index , edit ,edit_tourguide ,edit_tourguide_social , edit_tourist ,edit_tourist_social,message} from '../Controller/profile.js';
import multer from "multer";



var Tourguide_storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'Upload/img/Tour Guides')
    },
    filename: function (req, file, cb) { 
      cb(null, Date.now()+ '-'+file.originalname)
    }
  })
  var Tourist_storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'Upload/img/Tourists')
    },
    filename: function (req, file, cb) { 
      cb(null, Date.now()+ '-'+file.originalname)
    }
  })
  var upload = multer({ storage: Tourguide_storage })
  var upload2 = multer({ storage: Tourist_storage })

const router = new Router();
router.get('/', index);
router.post('/edit', edit);
router.post('/edit_tourguide',upload.single('new_image') , edit_tourguide);
router.post('/edit_tourist',upload2.single('new_image') , edit_tourist);
router.post('/edit_tourguide_social', edit_tourguide_social);
router.post('/edit_tourist_social', edit_tourist_social);
router.post('/message', message);


export default router;