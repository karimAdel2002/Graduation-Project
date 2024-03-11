import { Router } from 'express';
import { index} from '../Controller/travel_tips.js';


const router = new Router();

router.get('/', index);


export default router;