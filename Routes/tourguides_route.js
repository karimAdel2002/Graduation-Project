import { Router } from 'express';
import { index ,comments , rate ,messages ,view_profile} from '../Controller/tourguide.js';


const router = new Router();

router.get('/', index);
router.get('/:tourguide/:rate', rate);
router.post('/comments',comments)
router.post('/message',messages)
router.get('/:id',view_profile)




export default router;