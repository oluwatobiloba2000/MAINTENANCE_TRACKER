import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectDatabase = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port : process.env.DB_PORT,
    database: process.env.DB_DATABASE
}

const pool = new pg.Pool(connectDatabase);

pool.on("connect", ()=>{})


export default pool;