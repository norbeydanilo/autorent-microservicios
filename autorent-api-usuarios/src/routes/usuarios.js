import express from 'express';
import Usuario from '../models/Usuario.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const usuarios = await Usuario.findAll();
  res.json(usuarios);
});

router.post('/', async (req, res) => {
  const nuevo = await Usuario.create(req.body);
  res.json(nuevo);
});

export default router;
