import express from 'express';
import Vehiculo from '../models/Vehiculo.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const vehiculos = await Vehiculo.findAll();
  res.json(vehiculos);
});

router.post('/', async (req, res) => {
  const nuevo = await Vehiculo.create(req.body);
  res.json(nuevo);
});

export default router;
