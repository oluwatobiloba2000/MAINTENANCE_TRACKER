import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectDatabase = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE
}

const pool = new pg.Pool(connectDatabase);

pool.on("connect", ()=>{})

const requestTable = async () =>{
    const queryRequest = `CREATE TABLE IF NOT EXISTS
        request(id SERIAL PRIMARY KEY,
               title VARCHAR(128) NOT NULL,
               category VARCHAR(100) NOT NULL,
               description VARCHAR(6000) NOT NULL,
               time VARCHAR(128) NOT NULL,
               status VARCHAR(120) DEFAULT 'pending',
               userId INT NOT NULL,
               userName VARCHAR(128) NOT NULL)`;
            try {
             await pool.query(queryRequest);
            console.log('request table created !!')
        }catch (e){
            console.log(e);
        }
};

const userTable = async () =>{
    const queryUser = `CREATE TABLE IF NOT EXISTS
    users(userId SERIAL PRIMARY KEY,
        username VARCHAR(128) NOT NULL,
        password VARCHAR(128) NOT NULL
        )`;
    try{
         await pool.query(queryUser);
        console.log('user table created !!')
    }catch(e){
        console.log(e);
    }
};
const dropTable = async () => {
  try {
    const query = "DROP TABLE IF EXISTS users";
    await pool.query(query);
    console.log("Table dropped");
  } catch (e) {
    pool.end();
  }
};
// createTable();
// dropTable();
  // createTable();
  // dropTable();

userTable();
requestTable();

export default pool;