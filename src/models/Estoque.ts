import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { Produto, ProdutoInstance } from '../models/Produto';

export interface EstoqueInstance extends Model {
    produto_id: number;
    quantidade: number | any;
    Produto: ProdutoInstance
}

const Estoque = sequelize.define<EstoqueInstance>('Estoque', {
    produto_id: {
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    quantidade: DataTypes.DECIMAL
}, {
    tableName: 'estoque',
    timestamps: false
});

Produto.hasOne(Estoque, {
    foreignKey: 'produto_id',
});
Estoque.belongsTo(Produto, {
    foreignKey: 'produto_id',
});

export { Estoque };
