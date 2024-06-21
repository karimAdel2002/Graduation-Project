import { Router } from 'express';
import {  go_trip_page ,billing_data,payment} from '../Controller/trip.js';
import { checkout} from'../API files/paymob.js';


const router = new Router();
router.post('/pay',checkout);
router.get('/billing_data',billing_data);
router.get('/:name', go_trip_page);



export default router;