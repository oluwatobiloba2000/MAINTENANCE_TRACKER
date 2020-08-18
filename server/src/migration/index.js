import migrate from './migration';
import pool from '../models';

const migrateDB = async () =>{
    try{
        await migrate(pool);
        console.log('database migrate successfully');
        process.exit();
    }catch(e){
        console.log('error', e)
    }
}

migrateDB();