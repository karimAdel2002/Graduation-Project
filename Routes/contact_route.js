import { Router } from 'express';
import { index,send} from '../Controller/contact.js';


const router = new Router();

router.get('/', index);
router.post('/send', send);


export default router;