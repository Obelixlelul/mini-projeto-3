import {Router} from 'express';
import * as ApiController from '../controllers/apiController';
import * as ClienteController from '../controllers/clienteController';

const router = Router();

router.get('/ping', ApiController.ping);
 
router.post('/cliente/create', ClienteController.create);

export default router;