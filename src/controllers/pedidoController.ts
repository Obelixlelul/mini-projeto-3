import {Request, Response} from 'express';
import { Pedido } from '../models/Pedido';
import { Produto, ProdutoInstance } from '../models/Produto';
import { ItemPedido } from '../models/ItemPedido';
import { Estoque } from '../models/Estoque';

function pad2(number: any, length: any) {
   
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
   
    return str;
}

interface produto {
    id: number,
    qtd: number
}

export const create = async (req: Request, res: Response) => {
    
    // Recebe id por sessão
    let cliente_id = req.headers.id;
    
    const date = new Date();
    let data_pedido = date.getFullYear()
    + '-' + pad2(date.getMonth()+1, 2)
    + '-' + pad2(date.getDate(), 2);
    
    let status = 'pendente';

    let total = 0;
    
    let { produtos } = req.body;

    let allProducts = await Produto.findAll({
        raw: true    
    });

    // Para atualizar o valor total

    let filteredProducts = allProducts.filter((el) => {
        return produtos.some((fil: ProdutoInstance) => {
            return fil.id == el.id
        })
    });

    filteredProducts.forEach((item: ProdutoInstance) => {
        let produto = produtos.find((element: ProdutoInstance) => element.id == item.id)
        total += (item.preco * produto.qtd);
    });

    let lastId;

    await Pedido.create({
        cliente_id,
        data_pedido,
        status,
        total
    }).then(result => lastId = result.id);
    


    for (const item of produtos) {
            await ItemPedido.create({
                pedido_id: lastId,
                produto_id: item.id,
                quantidade: item.qtd 
            });
    }
    // Atualizando os itens pedidos


    res.json({
        cliente_id,
        data_pedido,
        status,
        total,
        req: filteredProducts
    });
}
