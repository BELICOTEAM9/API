// Importar el módulo de pool de la base de datos
const { Pool } = require('pg');

// Configurar la conexión a la base de datos
const pool = new Pool({
  user: 'postgres',
  host: 'db',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
});

// Definir el modelo de usuario
const userModel = {
  // Función para obtener todos los usuarios
  async getUsers() {
    // Intentar obtener una conexión del pool
    const client = await pool.connect();
    try {
      // Ejecutar la consulta SQL para obtener todos los usuarios
      const result = await client.query('SELECT * FROM users');
      // Devolver las filas de usuarios
      return result.rows;
    } finally {
      // Liberar la conexión del pool
      client.release();
    }
  },

  // Función para obtener un usuario por su ID
  async getUserById(id) {
    // Intentar obtener una conexión del pool
    const client = await pool.connect();
    try {
      // Ejecutar la consulta SQL para obtener el usuario con el ID especificado
      const result = await client.query('SELECT * FROM users WHERE id = $1', [id]);
      // Verificar si no se encontró ningún usuario con el ID especificado
      if (result.rows.length === 0) {
        return null; // Devolver nulo si no se encontró ningún usuario
      }
      // Devolver el primer usuario encontrado con el ID especificado
      return result.rows[0];
    } finally {
      // Liberar la conexión del pool
      client.release();
    }
  },

  // Agregar más funciones aquí para crear, actualizar y eliminar usuarios si es necesario
};

// Exportar el modelo de usuario
module.exports = userModel;
