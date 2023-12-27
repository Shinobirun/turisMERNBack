var express = require('express');
var router = express.Router();
const User = require('../models/user');

// Ruta para obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.render('users/index', { users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para mostrar el formulario de creación de usuarios
router.get('/new', (req, res) => {
  res.render('users/new');  
});

// Ruta para crear un nuevo usuario
router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.redirect('/users');
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ruta para mostrar los detalles de un usuario
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.render('users/show', { user });
  } catch (error) {
    res.status(404).json({ error: 'Usuario no encontrado' });
  }
});

// Ruta para mostrar el formulario de edición de un usuario
router.get('/:id/edit', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.render('users/edit', { user });
  } catch (error) {
    res.status(404).json({ error: 'Usuario no encontrado' });
  }
});

// Ruta para actualizar un usuario
router.put('/:id', async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/users/${req.params.id}`);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ruta para eliminar un usuario
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    res.redirect('/users');
  } catch (error) {
    res.status(404).json({ error: 'Usuario no encontrado' });
  }
});

module.exports = router;
