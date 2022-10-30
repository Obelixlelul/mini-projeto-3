import {Request, Response} from 'express';
import { request } from 'http';
import { Cliente } from '../models/Cliente'


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