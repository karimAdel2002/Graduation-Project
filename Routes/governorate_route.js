import { Router } from 'express';
import {  index , rate ,comments} from '../Controller/governorate.js';


const router = new Router();

router.get('/:name', index);
router.get('/:governorate/:place/:rate', rate);
router.post('/comments',comments)




export default router;