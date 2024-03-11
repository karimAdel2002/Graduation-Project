import { Router } from 'express';
import { index ,comments , rate ,messages} from '../Controller/tourguide.js';


const router = new Router();

router.get('/', index);
router.get('/:tourguide/:rate', rate);
router.post('/comments',comments)
router.post('/message',messages)




export default router;