const { Pool } = require('pg');
const dbCredentials = require('../credentials/db.json');

// Configurar la conexión a la base de datos
const pool = new Pool(dbCredentials);

// Función para obtener todos los usuarios
async function getAllUsers() {
    try {
        const query = 'SELECT * FROM micro_users';
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        throw new Error('Error al obtener los usuarios');
    }
}

// Función para obtener un usuario por su id
async function getUserById(userId) {
    try {
        const query = 'SELECT * FROM micro_users WHERE user_id = $1';
        const values = [userId];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw new Error('Error al obtener el usuario');
    }
}

// Función para obtener todos los usuarios con un role específico
async function getUsersByRole(role) {
    try {
        const query = 'SELECT * FROM micro_users WHERE role = $1';
        const values = [role];
        const result = await pool.query(query, values);
        return result.rows;
    } catch (error) {
        throw new Error('Error al obtener los usuarios');
    }
}

// Función para crear un nuevo usuario
async function createUser(user) {
    try {
        const query = 'INSERT INTO micro_users (name, password, role) VALUES ($1, $2, $3) RETURNING *';
        const values = [user.name, user.password, user.role];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw new Error('Error al crear el usuario');
    }
}

// Función para actualizar un usuario existente
async function updateUser(userId, updatedUser) {
    try {
        const query = 'UPDATE micro_users SET name = $1, password = $2, role = $3 WHERE user_id = $4 RETURNING *';
        const values = [updatedUser.name, updatedUser.password, updatedUser.role, userId];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw new Error('Error al actualizar el usuario');
    }
}

// Función para validar las credenciales de inicio de sesión
async function validateCredentials(username, password) {
    try {
        const query = 'SELECT * FROM micro_users WHERE name = $1 AND password = $2';
        const values = [username, password];
        const result = await pool.query(query, values);
        return result.rows.length > 0;
    } catch (error) {
        throw new Error('Error al validar las credenciales');
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    getUsersByRole,
    createUser,
    updateUser,
    validateCredentials,
};