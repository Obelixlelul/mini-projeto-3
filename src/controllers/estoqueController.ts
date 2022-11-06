import {Request, Response} from 'express';
import { Produto } from '../models/Produto';
import { Estoque } from '../models/Estoque';
import { where } from 'sequelize';

/**
 * Implemente as requisições de CRUD para Estoque
 * !!! - O produto é criado automaticamente no estoque quando criado
 * dentro do controler do produto 
 */
export const read = async (req: Request, res: Response) => {
    
    let descricao = req.query.descricao ?? null;
    let estoque;

    // Implemente requisição para filtrar estoque pelo nome do produto     
    if (descricao) {
        estoque = await Produto.findOne({
            where: {
                descricao
            },
            include: Estoque
        });
    } else {
        estoque = await Estoque.findAll();
    }
    
    res.status(200).json({
        estoque
    });

}

/**
 * Implemente requisição para atualizar apenas a quantidade relativa ao produto
 * no estoque (Patch)
 */
export const update = async (req: Request, res: Response) => {
    
    let { id } = req.params;
    let { qtd } = req.query!; 

    console.log(typeof(qtd));

    let produto = await Produto.findByPk(id, {
        include: Estoque
    });

    if ( produto ) {
        
        produto.Estoque.quantidade = qtd ?? produto.Estoque.quantidade;
        await produto.Estoque.save();
 
        res.status(200).json({
            produto,
            qtd
        });
    } else {
        res.status(404).json({
            error: "produto não encontrado"
        })
    }

}

export const del = async (req: Request, res: Response) => {
    let { id } = req.params;

    await Estoque.destroy({
        where: {produto_id: id}
    });

    await Produto.destroy({where: {id: id}});

    res.status(200).json({});

}