import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Crear el pool de conexiones
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'articulos_regionales',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // Eliminamos acquireTimeout y timeout que causan warnings
});

// Función para probar la conexión
export const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Conexión a MySQL exitosa');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Error de conexión a MySQL:', error.message);
    return false;
  }
};

// Función para ejecutar queries
export const query = async (sql, params) => {
  try {
    const [rows] = await pool.execute(sql, params);
    return [rows];
  } catch (error) {
    console.error('Error en query:', error);
    throw error;
  }
};

// Exportar el pool por defecto
export default pool;