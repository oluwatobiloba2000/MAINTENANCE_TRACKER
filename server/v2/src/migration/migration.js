const queryUser = `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS
      users(
            id UUID PRIMARY KEY NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
            profileimg VARCHAR(1000) NULL,
            email VARCHAR(120) DEFAULT NULL UNIQUE,
            admin BOOLEAN DEFAULT false,
            username VARCHAR(128) NOT NULL,
            password VARCHAR(128) NOT NULL,
            createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
         )`;

const queryRequest = `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS
        request(
            id UUID PRIMARY KEY NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
               title VARCHAR(128) NOT NULL,
               category VARCHAR(100) NOT NULL,
               description VARCHAR(6000) NOT NULL,
               status VARCHAR(120) DEFAULT 'pending',
               userid UUID NOT NULL,
               editedat TIMESTAMP NULL,
               createdat TIMESTAMP NOT NULL,
               FOREIGN KEY (userid) REFERENCES "users" (id) ON UPDATE CASCADE ON DELETE CASCADE
               )`;


const migrate = async (pool) =>{
    try{
        await pool.query(queryUser);
        await pool.query(queryRequest);
        return true;
    }catch(error){
        console.log(error)
        throw error
    }
}

export default migrate;