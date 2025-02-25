export interface Message {
  id: number;
  name: string;
  message: string;
  created_at: Date;
}

// Database result types
export interface MessageResult {
  insertId: number;
  affectedRows: number;
}