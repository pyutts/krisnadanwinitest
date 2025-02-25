import mysql from 'mysql2/promise';
import { Message, MessageResult } from './types';

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'wedding_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Initialize database and tables
async function initDb() {
  try {
    const connection = await pool.getConnection();
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL COMMENT 'Name of the person sending the message',
        message TEXT NOT NULL COMMENT 'The message content',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Timestamp when the message was created'
      ) COMMENT 'Table storing wedding guest messages and wishes';
    `);
    connection.release();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

initDb().catch(console.error);

export async function getMessages(): Promise<Message[]> {
  try {
    const [rows] = await pool.execute<Message[]>('SELECT * FROM messages ORDER BY created_at DESC');
    return rows;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
}

export async function addMessage(name: string, message: string): Promise<MessageResult> {
  try {
    const [result] = await pool.execute<MessageResult>(
      'INSERT INTO messages (name, message) VALUES (?, ?)',
      [name, message]
    );
    return result;
  } catch (error) {
    console.error('Error adding message:', error);
    throw error;
  }
}

export default pool;