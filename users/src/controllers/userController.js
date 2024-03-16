const express = require('express');
const userModel = require('../models/userModel');

const router = express.Router();

// Ruta para obtener todos los usuarios
router.get('/users', async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
});

// Ruta para obtener un usuario por su ID
router.get('/users/:id', async (req, res) => {
    try {
        const user = await userModel.getUserById(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
});

// Ruta para crear un nuevo usuario
router.post('/users', async (req, res) => {
    try {
        const newUser = await userModel.createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
});

// Ruta para actualizar un usuario existente
router.put('/users/:id', async (req, res) => {
    try {
        const updatedUser = await userModel.updateUser(req.params.id, req.body);
        if (updatedUser) {
            res.json(updatedUser);
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
});

// Ruta para eliminar un usuario
router.delete('/users/:id', async (req, res) => {
    try {
        const deletedUser = await userModel.deleteUser(req.params.id);
        if (deletedUser) {
            res.json({ message: 'Usuario eliminado correctamente' });
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
});

module.exports = router;