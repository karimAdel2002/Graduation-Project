import { Router } from 'express';
import { index,show_404, Admin, Admin_Add, Admin_Delete, Tourist, Tourist_Add, Tourist_Delete, 
    Tourist_Edit, Admin_Edit, Governorate, Governorate_Add, Governorate_Delete, Governorate_Edit,
    Trip,Trip_Add,Trip_Delete,Trip_Edit,Trip_Details,Trip_Details_Add,Trip_Details_Delete,Trip_Details_Edit,
    Company,Company_Add,Company_Delete,Company_Edit,Embassy,Embassy_Add,Embassy_Delete,Embassy_Edit,
    Food,Food_Add,Food_Delete,Food_Edit,Place,Place_Add,Place_Delete,Place_Edit,Tourguide,Tourguide_Add,Tourguide_Delete,Tourguide_Edit,
    Activation,Activation_CV,Active,Bill,Bill_Show,Bills_Delete,Contact,Send,Done,Music,Music_Add,Music_Delete,Music_Edit
 } from '../Controller/Dashboard.js';
import multer from "multer";
const router = new Router();
// ---------------------------------------------------------------
var Tourist_storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Upload/img/Tourists')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
var Tourist_upload = multer({ storage: Tourist_storage })
// ---------------------------------------------------------------
var Governorate_storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Upload/img/Governorates')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
var Governorate_upload = multer({ storage: Governorate_storage })
// ---------------------------------------------------------------
var Trip_storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Upload/img/Trip')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
var Trip_upload = multer({ storage: Trip_storage })
// ---------------------------------------------------------------
var Company_storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Upload/img/Companies')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
var Company_upload = multer({ storage: Company_storage })
// ---------------------------------------------------------------
var Embassy_storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Upload/img/Embassies')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
var Embassy_upload = multer({ storage: Embassy_storage })
// ---------------------------------------------------------------
var Food_storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Upload/img/Food')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
var Food_upload = multer({ storage: Food_storage })
// ---------------------------------------------------------------
var Place_storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Upload/img/Places')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.fieldname + '-' + file.originalname)
    }
})
var Place_upload = multer({ storage: Place_storage }).fields([{name: "main_image"}, {name: "image_1"}, {name: "image_2"}, {name: "image_3"}, {name: "image_4"}, {name: "image_5"}, {name: "image_6"}]);
// ---------------------------------------------------------------
var Tourguide_Doc_storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'Upload/Tourguide_Doc')
    },
    filename: function (req, file, cb) { 
      cb(null, file.fieldname + '-' +Date.now()+'.pdf')
    }
  })
  var Tourguide_Doc_upload = multer({ storage: Tourguide_Doc_storage })
// ---------------------------------------------------------------
var Tourguide_image_storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Upload/img/Tour Guides')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
var Tourguide_image_upload = multer({ storage: Tourguide_image_storage })
// ---------------------------------------------------------------
var music_storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Upload/img/Music')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
var music_upload = multer({ storage: music_storage }).fields([{name: "image"}, {name: "song_1_Image"}, {name: "song_1"}, {name: "song_2_Image"}, {name: "song_2"}]);
// ---------------------------------------------------------------



// --------------------Index------------------------
router.get('/', index);
// --------------------404------------------------
router.get('/404', show_404);
// --------------------Admin------------------------
router.get('/Admin', Admin);
router.post('/Admin/Add', Admin_Add);
router.get('/Admin/Delete/:id', Admin_Delete);
router.post('/Admin/Edit', Admin_Edit);

// --------------------Tourist------------------------
router.get('/Tourist', Tourist);
router.post('/Tourist/Add', Tourist_upload.single('Tourist_image'), Tourist_Add);
router.get('/Tourist/Delete/:id', Tourist_Delete);
router.post('/Tourist/Edit', Tourist_upload.single('Tourist_image'), Tourist_Edit);

// --------------------Governorate------------------------
router.get('/Governorate', Governorate);
router.post('/Governorate/Add', Governorate_upload.single('Governorate_image'), Governorate_Add);
router.get('/Governorate/Delete/:id', Governorate_Delete);
router.post('/Governorate/Edit', Governorate_upload.single('Governorate_image'), Governorate_Edit);

// --------------------Trip------------------------
router.get('/Trip', Trip);
router.post('/Trip/Add', Trip_upload.single('Trip_image'), Trip_Add);
router.get('/Trip/Delete/:id', Trip_Delete);
router.post('/Trip/Edit', Trip_upload.single('Trip_image'), Trip_Edit);

// --------------------Trip_Details------------------------
router.get('/Trip_Details', Trip_Details);
router.post('/Trip_Details/Add', Trip_Details_Add);
router.get('/Trip_Details/Delete/:id', Trip_Details_Delete);
router.post('/Trip_Details/Edit', Trip_Details_Edit);

// --------------------Company------------------------
router.get('/Company', Company);
router.post('/Company/Add', Company_upload.single('Company_image'), Company_Add);
router.get('/Company/Delete/:id', Company_Delete);
router.post('/Company/Edit', Company_upload.single('Company_image'), Company_Edit);

// --------------------Embassy------------------------
router.get('/Embassy', Embassy);
router.post('/Embassy/Add', Embassy_upload.single('Embassy_image'), Embassy_Add);
router.get('/Embassy/Delete/:id', Embassy_Delete);
router.post('/Embassy/Edit', Embassy_upload.single('Embassy_image'), Embassy_Edit);

// --------------------Food------------------------
router.get('/Food', Food);
router.post('/Food/Add', Food_upload.single('Food_image'), Food_Add);
router.get('/Food/Delete/:id', Food_Delete);
router.post('/Food/Edit', Food_upload.single('Food_image'), Food_Edit);

// --------------------Place------------------------
router.get('/Place', Place);
router.post('/Place/Add', Place_upload, Place_Add);
router.get('/Place/Delete/:id', Place_Delete);
router.post('/Place/Edit', Place_upload, Place_Edit);

// --------------------Tourguide------------------------
router.get('/Tourguide', Tourguide);
router.post('/Tourguide/Add', Tourguide_image_upload.single('Tourguide_image'), Tourguide_Add);
router.get('/Tourguide/Delete/:id', Tourguide_Delete);
router.post('/Tourguide/Edit', Tourguide_image_upload.single('Tourguide_image'), Tourguide_Edit);
// --------------------Activation------------------------
router.get('/Activation', Activation);
router.get('/Activation/:id', Activation_CV);
router.post('/Activation/Active', Active);
// --------------------Bills------------------------
router.get('/Bill', Bill);
router.get('/Bill/Bill_Show/:id', Bill_Show);
router.get('/Bill/Delete/:id', Bills_Delete);

// --------------------Contact------------------------
router.get('/Contact', Contact);
router.post('/Contact/Send', Send);
router.get('/Contact/Done/:id', Done);

// --------------------Music------------------------
router.get('/Music', Music);
router.post('/Music/Add', music_upload, Music_Add);
router.get('/Music/Delete/:id', Music_Delete);
router.post('/Music/Edit', music_upload, Music_Edit);
export default router;