import {Request, Response} from 'express';
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