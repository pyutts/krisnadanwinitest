import mysql from 'mysql2/promise';
import { RowDataPacket } from 'mysql2';

export interface Message {
  id: number;
  name: string;
  message: string;
  created_at: string;
}

export interface MessageResult {
  insertId: number;
  affectedRows: number;
}

const pool = mysql.createPool({
  host:'sql12.freesqldatabase.com',
  user:'sql12766739',
  password:'t5Qi7nhjDW',
  database:'sql12766739',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export async function getMessages(): Promise<Message[]> {
  try {
    const [rows] = await pool.execute<RowDataPacket[] & Message[]>(
      'SELECT * FROM messages ORDER BY created_at DESC'
    );
    return rows;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
}

export async function addMessage(name: string, message: string): Promise<MessageResult> {
  try {
    const [result] = await pool.execute<mysql.ResultSetHeader>(
      'INSERT INTO messages (name, message) VALUES (?, ?)',
      [name, message]
    );
    return { insertId: result.insertId, affectedRows: result.affectedRows };
  } catch (error) {
    console.error('Error adding message:', error);
    throw error;
  }
}

export default pool;
