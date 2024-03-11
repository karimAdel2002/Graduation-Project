import { Router } from 'express';
import {  go_trip_page} from '../Controller/trip.js';


const router = new Router();

router.get('/:name', go_trip_page);


export default router;