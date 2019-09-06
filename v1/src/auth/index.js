import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config();
import bcrypt from "bcrypt"
import pool from '../models';
import { sign } from 'crypto';

class Authentication {
    // loggining in users
    static async logInAuthUser(req ,res){
        const username = req.body.username;
        const password  = req.body.password;
        try{
         if(!username || !password){
        return res.json("Username and password are required")
           }else if(username == process.env.ADMINUSERNAME && password == process.env.ADMINPASSWORD ){
        jwt.sign({username , password}, process.env.ADMINKEY , {expiresIn : '7d'} , (err , token)=>{
          if(err){
             res.json(err)
            }

          res.status(200).json({
                 message: "sign in admin success",
                admintoken : token
            });
         })
     }else{
         const checkUserName = `SELECT * FROM users WHERE username=$1`
        const value = [username];
          const returnedUsername = await pool.query(checkUserName, value);
        if(!returnedUsername.rows[0]){
            return res.json("username does not exist on our server")
        }
        const match = await bcrypt.compare(password, returnedUsername.rows[0].password);
        if(match) {
         jwt.sign({username, password} , process.env.KEY, {expiresIn : '7d'} , (err, token)=>{
            if(err){
                console.log(err);
            }else{
                return res.status(200).json({
                    message: "sign in user success",
                    user: returnedUsername.rows[0]["username"],
                    Hashmatch : match,
                    userId : returnedUsername.rows[0]["userid"],
                    usertoken : token
                })
     }
    })
        }else{
         res.json("incorrect username or password")
     }
     }
    }catch(err){
            console.log(err)
        }
    }




//signing up users
   static async  signUp(req, res) {
       const username = req.body.username;
       const password  = req.body.password;

       try {
         const confirmUniqueUsernameQuery = `SELECT * FROM users WHERE username=$1`;
         const value = [username];
         const existedUser = await pool.query(confirmUniqueUsernameQuery , value);
         if(!username || !password){
             return res.json("Username and password required")
          }

         if(existedUser.rows[0]){
         return  res.json("username has been taken");
        }

        if(username === process.env.ADMINUSERNAME){
            return res.json("username has been taken")
        }
                //  hash the incoming password
           const salt = await bcrypt.genSalt(10);
           const passphase = await bcrypt.hash(password, salt);

                const userSignupQuery = `INSERT INTO users (username, password)
                  VALUES ($1, $2) RETURNING *`;
                const values = [username, passphase];
                const signedUser = await pool.query(userSignupQuery, values);
                jwt.sign({username, password} , process.env.KEY, {expiresIn : '7d'} , (err, token)=>{
                    if(err){
                        console.log(err);
                    }else{
                        return res.status(200).json({
                            message: "sign up success",
                            user: signedUser.rows[0]["username"],
                            userId : signedUser.rows[0]["userid"],
                            passphase,
                            usertoken : token
                        })
             }
         })
     }
    catch (err) {
        console.log(err);
        res.json(err)
    }}
}

// checking if header is not undefined, if request is undefined return (403) bad request
const checkToken = (req, res, next) =>{
    const header = req.headers['authorization'];
    if(typeof header !== 'undefined'){
        const bearer = header.split(' ');
        const token = bearer[1];

        req.token = token;

        next();
    }else{
        // if header is undefined , return bad request
        res.sendStatus(403)
    }
}

export {
    Authentication,
    checkToken
}