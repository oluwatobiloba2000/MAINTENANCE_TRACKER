import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config();
import bcrypt from "bcryptjs";
import pool from '../models';
import checkAdmin from "../middlewares/checkAdmin";

class Authentication {

  /**
   * @static
   *
   * @param {object} request - {email, password} -> The request payload sent to the controller
   * @param {object} response - The response payload sent back from the controller
   *
   * @returns {object}
   *
   * @description This method is used to login in users
   * @memberOf Authentication
   *
   **/

  static async login(req, res) {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        return res.json('email and password are required');
      }

      // const responseValidation = validateLogin({email, password});
      
      // if(responseValidation.error){
      //   return res.status(400).json({Error: `${responseValidation.error}`});
      // }

      const checkEmail = `SELECT * FROM users WHERE email=$1`;
      const value = [email];
      const returnedEmail = await pool.query(checkEmail, value);
      if (!returnedEmail.rows[0]) {
        return res.status(400).json({
          code: 400,
          status: 'bad request',
          message: 'incorrect email or password',
        });
      }

      const match = await bcrypt.compare(
        password,
        returnedEmail.rows[0].password,
      );

      if (match) {
        //check if user is an admin and await the result
        const isAdmin = await checkAdmin(returnedEmail.rows[0]['email']);

        // if isAdmin id true give the user an admin token
        if(isAdmin === true){
          jwt.sign({ email, username: returnedEmail.rows[0].username, id: returnedEmail.rows[0].id, admin: returnedEmail.rows[0].admin },
            process.env.ADMINKEY, { expiresIn: '30d' }, (err, token) => {
              if (err) {
                return res.status(400).json(err);
              } else {
                return res.status(200).json({
                  status: 'ok',
                  code: 200,
                  message: 'admin login successful',
                  data: {
                      id : returnedEmail.rows[0].id,
                      profileimg: returnedEmail.rows[0].profileimg,
                      email: returnedEmail.rows[0].email,
                      username : returnedEmail.rows[0].username,
                      admin : returnedEmail.rows[0].admin,
                      createdat: returnedEmail.rows[0].createdat,
                  },
                  token: token,
                });
              }
            },
          );
        }

        // else give the user a user token
      jwt.sign({ email, username: returnedEmail.rows[0].username, id: returnedEmail.rows[0].id, admin: returnedEmail.rows[0].admin },
                process.env.AUTHKEY,
                { expiresIn: '30d' },
          (err, token) => {
            if (err) {
              return res.status(400).json(err);
            } else {
              return res.status(200).json({
                status: 'ok',
                code: 200,
                message: 'signed in successfully',
                data: {
                  id : returnedEmail.rows[0].id,
                  profileimg: returnedEmail.rows[0].profileimg,
                  email: returnedEmail.rows[0].email,
                  username : returnedEmail.rows[0].username,
                  admin : returnedEmail.rows[0].admin,
                  createdat: returnedEmail.rows[0].createdat,
                },
                token: token,
              });
            }
          },
        );
      } else {
       return res.status(400).json({
          code: 400,
          status: 'bad request',
          message: 'incorrect email or password',
        });
      }
    } catch (error) {
      return res.status(500).json({
        code: 500,
        status: 'Internal server error',
        message: error
      })
    }
  }


  
  /**
   * @static
   *
   * @param {object} request - {email, first_name, last_name, phonenumber, category, admin, password} -> The request payload sent to the controller
   * @param {object} response
   *
   * @returns {object} - status, message, id, email, first_name, last_name, phonenumber, category, createdat, auth_provider
   *
   * @description Sign up users
   * @memberOf Authentication
   *
   **/

  static async signup(req, res) {
    const { email,  username, password, adminSignature } = req.body;

    try {
      if ( !email ||  !username || !password || !password) {
        return res.status(400).json({
          status: 'bad request',
          code: 400,
          message: 'All fields are required'
        });
      }

      let admin;
      if(adminSignature){
          if(adminSignature === process.env.ADMIN_SIGNATURE){
            admin = 'true';
          }else{
            return res.status(400).json({
              code: 400,
              status: 'bad request',
              message: 'Incorrect Admin signature'
            })
          }
      }else{
         admin = 'false';
      }

      // const responseValidation = validateUserSignup({username, email, password, admin})
      // if(responseValidation.error){
      //   return res.status(400).json({Error: `${responseValidation.error}`});
      // }

      const confirmUniqueEmailQuery = `SELECT * FROM users WHERE email=$1`;
      const value = [email];
      const existedUser = await pool.query(confirmUniqueEmailQuery, value);

      if (existedUser.rows[0]){
        return res.status(400).json({
            status: 'bad request',
            code: 400,
            message: 'email has been taken',
          });

      }

      //  hash the incoming password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const userSignupQuery = `INSERT INTO users (email, username, admin, password, profileimg)
                  VALUES ($1, $2, $3, $4, $5) RETURNING *`;
      const values = [
        email,
        username,
        admin,
        hashedPassword,
        'https://res.cloudinary.com/bridgeng/image/upload/v1595808372/blank-profile-picture_ndet1v.png'
      ];
      const signedUser = await pool.query(userSignupQuery, values);
      if(admin === 'false'){
        // admin is false, signed up as user and recieved user token
        jwt.sign(
          { email, username, id: signedUser.rows[0].id , admin: signedUser.rows[0].admin},
          process.env.AUTHKEY,
          { expiresIn: '30d' },
          (err, token) => {
            if (err) {
              return res.status(400).json(err);
            } else {
              return res.status(200).json({
                status: 'ok',
                code: 200,
                message: 'Signed up successful',
                data: {
                  id : signedUser.rows[0].id,
                  username: signedUser.rows[0].username,
                  profileimg: signedUser.rows[0].profileimg,
                  admin : signedUser.rows[0].admin,
                  createdat: signedUser.rows[0].createdat
                },
                token: token,
              });
            }
          },
        );
      }else{
        // signed up as an admin and recieved an admin token
        jwt.sign(
          { email, password, id: signedUser.rows[0].id, admin: signedUser.rows[0].admin },
          process.env.ADMINKEY,
          { expiresIn: '72h' },
          (err, token) => {
            if (err) {
              return res.status(400).json(err);
            } else {
              return res.status(200).json({
                status: 'ok',
                code: 200,
                message: 'Admin Signed up successful',
                data: {
                  id : signedUser.rows[0].id,
                  username: signedUser.rows[0].username,
                  profileimg: signedUser.rows[0].profileimg,
                  admin : signedUser.rows[0].admin,
                  createdat: signedUser.rows[0].createdat
                },
                token: token
              });
            }
          },
        );
      }
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        code: 500,
        status: 'Internal server error'
      })
    }
  }
}



export default Authentication
