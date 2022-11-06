import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { Pedido } from '../models/Pedido';

export interface ItemPedidoInstance extends Model {
    pedido_id: number,
    produto_id: number,
    quantidade: number;
}

export const ItemPedido = sequelize.define<ItemPedidoInstance>('ItemPedido', {
    pedido_id: {
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    produto_id: DataTypes.INTEGER,
    quantidade: DataTypes.INTEGER
}, {
    tableName: 'item_pedido',
    timestamps: false,
})

Pedido.hasMany(ItemPedido, {
    foreignKey: 'pedido_id'
});

ItemPedido.belongsTo(Pedido, {
    foreignKey: 'pedido_id'
});