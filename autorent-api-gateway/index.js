const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

app.use(cors());

// Log para ver qué está pasando
app.use((req, res, next) => {
  console.log(`[GATEWAY] ${req.method} ${req.originalUrl}`);
  next();
});

// Proxy a microservicio de usuarios
app.use('/usuarios', createProxyMiddleware({
  target: 'http://usuarios:3001',
  changeOrigin: true
}));

app.use('/vehiculos', createProxyMiddleware({
  target: 'http://vehiculos:3002',
  changeOrigin: true
}));


// Ruta por defecto para evitar el "Cannot GET /"
app.get('/', (req, res) => {
  res.send('API Gateway activo. Usa /usuarios');
});

app.listen(3000, () => {
  console.log('API Gateway escuchando en http://localhost:3000');
});
