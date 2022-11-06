import {Request, Response} from 'express';
import { Cliente } from '../models/Cliente'
import { ItemPedido } from '../models/ItemPedido';
import { Pedido } from '../models/Pedido'

/**
 * Implemente uma requisição que receba o id de um cliente e retorne os dados
 * do cliente, bem como a lista dos pedidos associados ao cliente: id do pedido,
 * lista dos itens de cada pedido com descrição do produto e quantidade dos
 * mesmos, e o total do pedido.
 */
export const select = async (req: Request, res: Response) => {
    let {id} = req.params;
    
    let cliente = await Cliente.findByPk(id, {
        include: {all: true, nested: true}
    });

    if(cliente)
    console.log(cliente.pedido);

    res.status(200).json({
        cliente
    });

}

export const create = async (req: Request, res: Response) => {
    
    let {cpf, nome} = req.body;
    let novoCliente = await Cliente.create({
        cpf, nome
    })

    res.json({
        id: novoCliente.id,
        cpf, 
        nome
    });
}

/**
 * Implemente uma requisição para que campos específicos do cliente possam ser
 * atualizados (Patch).
 */
export const update = async (req: Request, res: Response) => {

    let { id } = req.params;
    let {nome, cpf} = req.body;

    let cliente = await Cliente.findByPk(id);

    if (cliente) {

        cliente.nome = nome ?? cliente.nome;
        cliente.cpf = cpf ?? cliente.cpf;
        await cliente.save();
        
        res.json({
            cliente
        });

    } else {

        res.json({
            error: 'Cliente não encontrado'
        })
        
    } 

}