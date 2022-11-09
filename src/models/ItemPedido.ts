import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { Pedido } from '../models/Pedido';
import { Produto } from './Produto';

export interface ItemPedidoInstance extends Model {
    pedido_id: number,
    produto_id: number,
    quantidade: number;
}

export const ItemPedido = sequelize.define<ItemPedidoInstance>('ItemPedido', {
    pedido_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Pedido,
            key: "id"
        },
    },
    produto_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Produto,
            key: "id"
        }
    } ,
    quantidade: DataTypes.INTEGER
}, {
    tableName: 'item_pedido',
    timestamps: false,
})

Pedido.belongsToMany(Produto, {through: ItemPedido, foreignKey: "pedido_id"});
Produto.belongsToMany(Pedido, {through: ItemPedido, foreignKey: "produto_id"});


