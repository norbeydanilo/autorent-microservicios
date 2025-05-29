import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import usuariosRoutes from './routes/usuarios.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/', usuariosRoutes);
app.get('/health', (_, res) => res.status(200).send('OK'));

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
  app.listen(3001, () => console.log('Usuarios API en puerto 3001'));
});
