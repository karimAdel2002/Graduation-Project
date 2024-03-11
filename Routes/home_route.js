import { Router } from 'express';
import {  index  } from '../Controller/home.js';


const router = new Router();


router.get('/', index);



export default router;