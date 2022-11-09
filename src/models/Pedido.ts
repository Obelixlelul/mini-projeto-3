import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { Cliente } from '../models/Cliente'
import {ItemPedido, ItemPedidoInstance} from '../models/ItemPedido'
import { Produto } from './Produto';

export interface PedidoInstance extends Model {
    id: number,
    cliente_id: number,
    data_pedido: Date;
    status: string;
    total: number;
}

export const Pedido = sequelize.define<PedidoInstance>('Pedido', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    cliente_id: DataTypes.INTEGER,
    data_pedido: DataTypes.INTEGER,
    status: DataTypes.STRING,
    total: DataTypes.DECIMAL
}, {
    tableName: 'pedido',
    timestamps: false,
})



