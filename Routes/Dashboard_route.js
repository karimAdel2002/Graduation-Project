import { Router } from 'express';
import { index, Admin, Admin_Add, Admin_Delete, Tourist, Tourist_Add, Tourist_Delete, 
    Tourist_Edit, Admin_Edit, Governorate, Governorate_Add, Governorate_Delete, Governorate_Edit,
    Trip,Trip_Add,Trip_Delete,Trip_Edit,Trip_Details,Trip_Details_Add,Trip_Details_Delete,Trip_Details_Edit,
    Company,Company_Add,Company_Delete,Company_Edit,Embassy,Embassy_Add,Embassy_Delete,Embassy_Edit,
    Food,Food_Add,Food_Delete,Food_Edit,Place,Place_Add,Place_Delete,Place_Edit,
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
        cb(null, Date.now() + '-' + file.originalname)
    }
})
var Place_upload = multer({ storage: Place_storage })
// ---------------------------------------------------------------

// --------------------Index------------------------
router.get('/', index);
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
router.post('/Place/Add', Place_upload.array('Place_image',7) , Place_Add);
router.get('/Place/Delete/:id', Place_Delete);
router.post('/Place/Edit', Place_upload.array('Place_image',7), Place_Edit);

export default router;