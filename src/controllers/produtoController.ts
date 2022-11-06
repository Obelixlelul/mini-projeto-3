import {Request, Response} from 'express';
import { Produto } from '../models/Produto';
import { Estoque } from '../models/Estoque';

export const read = async (req: Request, res: Response) => {
    
    let produtos = await Produto.findAll({raw: true});
    
    if (produtos) {
        res.status(200).json({
            produtos
        });
    } else {
        res.status(404).json({
            error: "Não foi possível encontrar os produtos!"
        })
    }

}

export const create = async (req: Request, res: Response) => {
    
    let {descricao, preco} = req.body;
    
    let novoProduto = await Produto.create({
        descricao, preco
    })

    let existeNoEstoque = await Estoque.findOne({
        where: {produto_id: novoProduto.id}
    });

    if (!existeNoEstoque){
        let addEstoque = await Estoque.create({
            produto_id: novoProduto.id,
            quantidade: 0
        });
    }
    
    res.json({
        id: novoProduto.id,
        descricao,
        preco
    });
}

/**
 * Implemente uma requisição para que campos específicos do produto possam
 * ser atualizados (Patch).
 */
export const update = async (req: Request, res: Response) => {

    let { id } = req.params;
    let {preco, descricao} = req.body;

    let produto = await Produto.findByPk(id);

    if (produto) {

        produto.descricao = descricao ?? produto.descricao;
        produto.preco = preco ?? produto.preco;
        await produto.save();
        
        res.json({
            produto
        });

    } else {

        res.json({
            error: 'Produto não encontrado'
        })
        
    } 

}