import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import usuariosRoutes from './routes/usuarios.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/', usuariosRoutes);

async function conectarDB(maxIntentos = 5, intervalo = 3000) {
  let intentos = 0;
  while (intentos < maxIntentos) {
    try {
      await sequelize.authenticate();
      console.log("✅ Conectado a MySQL");
      return;
    } catch (err) {
      intentos++;
      console.log(`⏳ Intento ${intentos} de conexión a MySQL fallido. Reintentando en ${intervalo / 1000}s...`);
      console.log(`🔍 Detalle: ${err.message}`);
      await new Promise(res => setTimeout(res, intervalo));
    }
  }
  console.error("❌ No se pudo conectar a MySQL luego de varios intentos. Terminando ejecución.");
  process.exit(1); // termina la app para que Azure pueda reiniciarla o alertar
}

await conectarDB();

sequelize.sync().then(() => {
  const port = process.env.PORT || 3001;
  app.listen(port, () => console.log(`🚀 Usuarios API corriendo en puerto ${port}`));
});

