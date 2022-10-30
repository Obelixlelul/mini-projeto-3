import {Router} from 'express';
import * as ApiController from '../controllers/apiController';
import * as ClienteController from '../controllers/clienteController';
import * as ProdutoController from '../controllers/produtoController';

const router = Router();

router.get('/ping', ApiController.ping);


// Rotas Clientes
router.post('/cliente/create', ClienteController.create);
router.patch('/cliente/update/:id', ClienteController.update);

// Rotas Produtos
router.post('/produto/create', ProdutoController.create);
router.patch('/produto/update/:id', ProdutoController.update);

export default router;