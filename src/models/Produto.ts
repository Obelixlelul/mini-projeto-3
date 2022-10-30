import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { Estoque, EstoqueInstance } from '../models/Estoque';

export interface ProdutoInstance extends Model {
    id: number;
    descricao: string;
    preco: number;
    Estoque: EstoqueInstance
}

const Produto = sequelize.define<ProdutoInstance>('Produto', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    descricao: DataTypes.STRING,
    preco: DataTypes.DECIMAL
}, {
    tableName: 'produto',
    timestamps: false
});

export {Produto};
