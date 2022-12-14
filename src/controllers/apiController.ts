import {Request, Response} from 'express';
import {Produto} from '../models/Produto';
import {Estoque} from '../models/Estoque';


export const ping = async (req: Request, res: Response) => {


    const produto = await Produto.findByPk(13, {
        include: Estoque
    })
    
    console.log("pingou");
    
    res.json({
        response: produto
    });
}