const express = require('express');
const userController = require('./userController');

const app = express();

app.use(express.json());

// Rutas
app.get('/airbnbs', userController.getAllUsers);
app.get('/airbnbs/:id', userController.getUserById);
app.post('/airbnbs', userController.createUser);
app.put('/airbnbs/:id', userController.updateUser);
app.delete('/airbnbs/:id', userController.deleteUser);

// Puerto de escucha
const port = 3001;
app.listen(port, () => {
    console.log(`Microservicio de Airbnbs escuchando en el puerto ${port}`);
});