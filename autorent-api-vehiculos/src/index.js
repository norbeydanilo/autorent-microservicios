import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import vehiculosRoutes from './routes/vehiculos.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/', vehiculosRoutes);

async function conectarDB() {
  let connected = false;
  while (!connected) {
    try {
      await sequelize.authenticate();
      console.log("✅ Conectado a MySQL");
      connected = true;
    } catch (err) {
      console.log("⏳ Esperando MySQL...", err.message);
      await new Promise(res => setTimeout(res, 3000));
    }
  }
}

await conectarDB();
sequelize.sync().then(() => {
  app.listen(3002, () => console.log('Vehículos API en puerto 3002'));
});
