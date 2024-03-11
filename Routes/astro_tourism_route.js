import { Router } from 'express';
import { index} from '../Controller/astro_tourism.js';


const router = new Router();

router.get('/', index);


export default router;