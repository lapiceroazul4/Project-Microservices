const { Pool } = require('pg');
const dbCredentials = require('/credentials/db.json');

// Configurar la conexión a la base de datos
const pool = new Pool(dbCredentials);

// Función para obtener todos los valores de la tabla micro_transactions
async function getAllTransactions() {
    try {
        const query = 'SELECT * FROM micro_transactions';
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error al obtener las transacciones:', error);
        throw error;
    }
}

// Función para obtener una transacción por su id
async function getTransactionById(id) {
    try {
        const query = 'SELECT * FROM micro_transactions WHERE id = $1';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error al obtener la transacción por id:', error);
        throw error;
    }
}

// Función para obtener todas las transacciones de un "role" específico
async function getTransactionsByRole(role) {
    try {
        const query = 'SELECT * FROM micro_transactions WHERE role = $1';
        const result = await pool.query(query, [role]);
        return result.rows;
    } catch (error) {
        console.error('Error al obtener las transacciones por role:', error);
        throw error;
    }
}

// Función para crear una transacción
async function createTransaction(transaction) {
    try {
        const { booking_id, user_id, airbnb_id, date, status } = transaction;
        const query = 'INSERT INTO micro_transactions (booking_id, user_id, airbnb_id, date, status) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const result = await pool.query(query, [booking_id, user_id, airbnb_id, date, status]);
        return result.rows[0];
    } catch (error) {
        console.error('Error al crear la transacción:', error);
        throw error;
    }
}

// Función para actualizar el estado de una transacción
async function updateTransactionStatus(id, status) {
    try {
        const query = 'UPDATE micro_transactions SET status = $1 WHERE id = $2 RETURNING *';
        const result = await pool.query(query, [status, id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error al actualizar el estado de la transacción:', error);
        throw error;
    }
}

module.exports = {
    getAllTransactions,
    getTransactionById,
    getTransactionsByRole,
    createTransaction,
    updateTransactionStatus
};