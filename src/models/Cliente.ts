import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

export interface ClienteInstance extends Model {
    id: number;
    cpf: string;
    nome: string;
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