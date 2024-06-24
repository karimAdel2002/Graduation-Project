import { Router } from 'express';
import {  go_trip_page} from '../Controller/trip.js';
import { checkout} from'../API files/paymob.js';


const router = new Router();
router.post('/pay',checkout);
router.get('/:name', go_trip_page);



export default router;