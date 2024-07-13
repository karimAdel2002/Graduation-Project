import { Router } from 'express';
import { index} from '../Controller/Currency_Converter.js';

const router = new Router();

router.get('/', index);


export default router;