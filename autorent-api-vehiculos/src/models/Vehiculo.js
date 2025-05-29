import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Vehiculo = sequelize.define('Vehiculo', {
  marca: DataTypes.STRING,
  modelo: DataTypes.STRING,
  anio: DataTypes.INTEGER,
  disponible: DataTypes.BOOLEAN
});

export default Vehiculo;
