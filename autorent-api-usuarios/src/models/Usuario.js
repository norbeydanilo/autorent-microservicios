import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Usuario = sequelize.define('Usuario', {
  nombre: DataTypes.STRING,
  correo: DataTypes.STRING,
  telefono: DataTypes.STRING
});

export default Usuario;
