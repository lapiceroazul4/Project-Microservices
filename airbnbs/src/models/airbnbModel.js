const { Pool } = require('pg');
const dbCredentials = require('/credentials/db.json');

// Configurar la conexión a la base de datos
const pool = new Pool(dbCredentials);

// Función para obtener todos los valores de la tabla micro_airbnbs
async function getAllAirbnbs() {
    try {
        const query = 'SELECT * FROM micro_airbnbs';
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error al obtener los airbnbs:', error);
        throw error;
    }
}

// Función para obtener un airbnb por su id
async function getAirbnbById(id) {
    try {
        const query = 'SELECT * FROM micro_airbnbs WHERE airbnb_id = $1';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error al obtener el airbnb por id:', error);
        throw error;
    }
}

// Función para obtener todos los airbnb con un room_type específico
async function getAirbnbsByRoomType(roomType) {
    try {
        const query = 'SELECT * FROM micro_airbnbs WHERE room_type = $1';
        const result = await pool.query(query, [roomType]);
        return result.rows;
    } catch (error) {
        console.error('Error al obtener los airbnbs por room_type:', error);
        throw error;
    }
}

// Función para crear un nuevo airbnb
async function createAirbnb(airbnbData) {
    try {
        const query = 'INSERT INTO micro_airbnbs (name, instant_bookable, cancellation_policy, room_type, construction_year, minimun_nights, nomber_of_reviews, last_review, reviews_per_month, house_rules) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *';
        const result = await pool.query(query, Object.values(airbnbData));
        return result.rows[0];
    } catch (error) {
        console.error('Error al crear el airbnb:', error);
        throw error;
    }
}

// Función para actualizar un airbnb existente
async function updateAirbnb(id, airbnbData) {
    try {
        const query = 'UPDATE micro_airbnbs SET name = $1, instant_bookable = $2, cancellation_policy = $3, room_type = $4, construction_year = $5, minimun_nights = $6, nomber_of_reviews = $7, last_review = $8, reviews_per_month = $9, house_rules = $10 WHERE airbnb_id = $11 RETURNING *';
        const result = await pool.query(query, [...Object.values(airbnbData), id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error al actualizar el airbnb:', error);
        throw error;
    }
}

// Función para eliminar un airbnb por su id
async function deleteAirbnbById(id) {
    try {
        const query = 'DELETE FROM micro_airbnbs WHERE airbnb_id = $1';
        await pool.query(query, [id]);
        console.log('Airbnb eliminado exitosamente');
    } catch (error) {
        console.error('Error al eliminar el airbnb por id:', error);
        throw error;
    }
}

module.exports = {
    getAllAirbnbs,
    getAirbnbById,
    getAirbnbsByRoomType,
    createAirbnb,
    updateAirbnb,
    deleteAirbnbById,
};