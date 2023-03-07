import { Pool } from "pg";

const pool = new Pool({
  host: 'localhost',
  database: 'postgres',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

export const connectionDB = async (query: string) => {
  const client = await pool.connect();
  const product = await client.query(query);
  client.release();
  return await product.rows;
};