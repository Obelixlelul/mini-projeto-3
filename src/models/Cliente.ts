import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { PedidoInstance } from '../models/Pedido';

export interface ClienteInstance extends Model {
    id: number;
    cpf: string;
    nome: string;
    pedido: PedidoInstance;
}

export const Cliente = sequelize.define<ClienteInstance>('Cliente', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    cpf: DataTypes.STRING,
    nome: DataTypes.STRING
}, {
    tableName: 'cliente',
    timestamps: false,
});