import { Router } from 'express';
import { index , bill} from '../Controller/done.js';


const router = new Router();

router.get('/', index);
router.get('/bill', bill);


export default router;