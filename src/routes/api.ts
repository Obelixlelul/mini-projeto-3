import {Router} from 'express';
import * as ApiController from '../controllers/apiController';
import * as ClienteController from '../controllers/clienteController';
import * as ProdutoController from '../controllers/produtoController';
import * as PedidoController from '../controllers/pedidoController';
import * as EstoqueController from '../controllers/estoqueController';
import { Estoque } from '../models/Estoque';

const router = Router();

router.get('/ping', ApiController.ping);


// Rotas Clientes
router.get('/cliente/select/:id', ClienteController.select);
router.post('/cliente/create', ClienteController.create);
router.patch('/cliente/update/:id', ClienteController.update);

// Rotas Produtos
router.get('/produto/read', ProdutoController.read);
router.post('/produto/create', ProdutoController.create);
router.patch('/produto/update/:id', ProdutoController.update);

// Rotas Pedidos
router.post('/pedido/create', PedidoController.create);

// Rotas Estoque
router.get('/estoque/read', EstoqueController.read);
router.post('/estoque/update/:id', EstoqueController.update);
router.delete('/estoque/del/:id', EstoqueController.del);

export default router;