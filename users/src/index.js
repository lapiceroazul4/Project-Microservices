const express = require('express');
const userController = require('./userController');

const app = express();

app.use(express.json());

// Rutas
app.get('/users', userController.getAllUsers);
app.get('/users/:id', userController.getUserById);
app.post('/users', userController.createUser);
app.put('/users/:id', userController.updateUser);
app.delete('/users/:id', userController.deleteUser);

// Puerto de escucha
const port = 3000;
app.listen(port, () => {
    console.log(`Microservicio de usuarios escuchando en el puerto ${port}`);
});
