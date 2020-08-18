import pool from '../models/index';


class RequestControllers{

    // getting user current profile
         static async gettingProfile (req, res){

            const userid = req.user.id;
            if(!userid){
              return res.status(400).json({
                message: 'bad request',
                code: 400
              })
            }

            try{
                const query = `SELECT *, (SELECT COUNT(*) FROM request b WHERE b.userid = a.id) AS requestcount FROM users a WHERE id=$1`
                const value = [userid];
                const userProfile = await pool.query(query, value);
                if(!userProfile.rows.length){
                      return res.status(404).json({
                        status: 'error',
                        code: 404,
                        message: 'profile not found'
                      });
                }
                delete userProfile.rows[0].password;
                return res.status(200).json({
                  status: 'ok',
                  code: 200,
                  data: userProfile.rows
                });
            }catch(e){
              console.log(e)
               return res.status(500).json({
                 status: 'server error',
                 message: 'Internal server error',
                 code: 500
               })
            }
    }

    // updating profile
static async updateProfile(req, res){
      const  userid = req.user.id;

      if(!userid){
        return res.status(400).json({
          message: 'bad request',
          code: 400
        })
      }
              try{
                  const query = `SELECT * FROM users WHERE id=$1`
                  const value = [userid];
                  const formerProfile = await pool.query(query, value);
                  if(!formerProfile.rows.length){
                    return res.status(404).json({
                      status: 'error',
                      code: 404,
                      message: 'profile not found'
                    });
                  }
                  const formerProfileToUpdate = formerProfile.rows[0];
                  const profileimage = req.body.profileimage || formerProfileToUpdate.profileimage;
                  const username = req.body.username || formerProfileToUpdate.username;
                  const updatequery = `UPDATE users SET username=$1, profileimg=$2 WHERE id=$3 RETURNING *`
                  const values = [username, profileimage, userid];
                  const newProfle = await pool.query(updatequery, values);
                  return res.status(200).json({
                      status: 'ok',
                      code: 200,
                      data : newProfle.rows
                    });
    
              }catch(e){
                console.log(e)
              return res.status(500).json({
                status: 'server error',
                message: 'Internal server error',
                code: 500
              })
          }
    }
    
    // getting all requests
    static async allRequests(req, res) {
      const {id: userId} = req.user;
      const page = req.query.page || 1;
      const limit = req.query.limit || 20;

      const startIndex = (page - 1) * limit;
      const limitIndex = page * limit;

        if(!userId){
          return res.status(400).json({
            message: 'bad request',
            code: 400
          })
        }
        try {
            const query = "SELECT * FROM request WHERE userid=$1 OFFSET($2) LIMIT($3)"
            const value = [userId, startIndex, limitIndex]
            const requests = await pool.query(query, value);
            if (!requests.rows.length) return res.status(200).json({
              status: 'no request',
              message: 'requests not found',
              code: 200
            });
            return res.status(200).json({
                message: 'success',
                code: 200,
                data: requests.rows
            })
        } catch (error) {
          console.log(error)
          return res.status(500).json({
            status: 'server error',
            message: 'Internal server error',
            code: 500
          })
        }
    }
    
    //GET /requests/:<request id>
    static async getRequestById(req, res) {
              const id = req.params.id;
         
              try {
                const query = "SELECT * FROM request WHERE id=$1"
                const value = [id];
                const request = await pool.query(query, value);
                if (!request.rows.length) {
                    res.status(404).json({
                      status: 'not found',
                      code: 404,
                      message: 'request not found'
                    });
                }
                res.status(200).json({
                    status: 'success',
                    message: 'single request',
                    code: 200,
                    request: request.rows[0]
                });
              } catch (e) {
                return res.status(500).json({
                  status: 'server error',
                  message: 'Internal server error',
                  code: 500
                })
              }
    }

    //sending a post request
    static async createRequest(req, res) {
              const {id: userId} = req.user;
              const title = req.body.title;
              const category = req.body.category;
              const description = req.body.description;
              if (!title || !category || !description || !userId) {
                  return res.status(400).json({
                      message: `All fields required`,
                      code: 400,
                      status: 'bad request'
                  });
              }
              try {
                  const query = `INSERT INTO request(title, category, description, createdat, userid) VALUES($1, $2, $3, CURRENT_TIMESTAMP, $4) RETURNING *`;
                  const value = [title, category, description, userId];
                  const newRequest = await pool.query(query, value);
                  return res.status(200).json({
                      message: "request posted",
                      code: 200,
                      request : newRequest.rows
                  })
              } catch (e) {
                console.log(e)
                return res.status(500).json({
                  status: 'server error',
                  message: 'Internal server error',
                  code: 500
                })
              }
    }
    
    // updating requests
static async updateRequest(req, res) {
          const id = req.params.id;
          try {
            const queryText = "SELECT * FROM request WHERE id=$1";
            const value = [id];
            const request = await pool.query(queryText, value);
            if (!request.rows.length){
                return res.status(404).json({
                  status: 'not found',
                  code: 404,
                  message: "request not found"});
            }
            if(request.rows[0].status === "Approved"){
                 return res.json({
                    message : "request approved cannot be edited"
                })
            }
            const result = request.rows[0];
            const title = req.body.title || result.title;
            const category = req.body.category || result.category;
            const description = req.body.description || result.description;
            const query =
              "UPDATE request SET title=$1, category=$2, description=$3, editedat=CURRENT_TIMESTAMP WHERE id=$4 RETURNING *";
            const values = [title, category, description, id];
            const updatedRequest = await pool.query(query, values);
            return res.json({
              message: "request updated successfully",
              request: updatedRequest.rows
            })
          } catch (e) {
            return res.status(400).send({
              message: "Internal server error",
              code: 500
            });
          }
}


    // DELETING REQUESTS
    static async deleteRequests(req, res){
        const {id: userid} = req.user;
          const id = req.params.id;
          try{
            const requestQuery = `SELECT *  FROM request WHERE id=$1`
            const value = [id];
            const requestToDelete = await pool.query(requestQuery, value);
            if(requestToDelete.rows[0].userid !== userid ) return res.status(400).json({
              status: 'bad request',
              code: 400,
              message: 'this request is not owned by this user'
            })
            const query = `DELETE FROM request WHERE id=$1`
            const deletevalue = [id];
            const request = await pool.query(query, deletevalue);
            if(!request.rowCount){
              return  res.status(404).json({
                status: 'not found',
                code: 404,
                message: "No request associated with this id"});
            }
            return res.status(200).json({
              status: 'deleted',
              code: 200,
              message: 'request deleted'
            })
          }catch(e){
            return res.status(500).send({
              message: "Internal server error",
              code: 500
            });
          }
  }

}


export default RequestControllers;