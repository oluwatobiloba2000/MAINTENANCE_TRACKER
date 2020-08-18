import pool from '../models/index';


class AdminControllers{

    // getting user current profile
         static async gettingProfile(req, res){

            const userid = req.user.id;
            if(!userid){
              return res.status(400).json({
                message: 'bad request',
                code: 400
              })
            }

            try{
                const query = `SELECT * FROM users WHERE id=$1`
                const value = [userid];
                const userProfile = await pool.query(query, value);
                if(!userProfile.rows.length){
                      return res.status(404).json({
                        status: 'error',
                        code: 404,
                        message: 'profile not found'
                      });
                }
                return res.status(200).json({
                  status: 'ok',
                  code: 200,
                  data: userProfile.rows
                });
            }catch(e){
               return res.status(500).json({
                 status: 'server error',
                 message: 'Internal server error',
                 code: 500
               })
            }
    }


    // GETTING ALL REQUEST FOR THE ADMIN
static async allRequestsAdmin(req, res) {
      const page = req.query.page || 1;
      const limit = req.query.limit || 20;

      const startIndex = (page - 1) * limit;
      const limitIndex = page * limit;

          try {
              const query = "SELECT * FROM request OFFSET($1) LIMIT($2)";
              const value = [startIndex, limitIndex]
              const requests = await pool.query(query, value);
              if (!requests.rows.length) return res.status(200).json({
                status: 'no record',
                message: 'no request in DB',
                code: 200
              });
              return res.status(200).json({
                 status: 'ok',
                 code: 200,
                 request: requests.rows
              })
          } catch (error) {
            console.log(error)
            return res.status(500).send({
              message: "Internal server error",
              code: 500
            });
          }
    }
    
    //approving a request
    static async approveRequest(req, res) {
   
              const id = req.params.id;
              try {
                const queryText = "SELECT * FROM request WHERE id=$1";
                const value = [id];
                const request = await pool.query(queryText, value);

                if (!request.rows.length){
                  return res.status(404).json({
                    code: 404,
                    status: 'not found',
                    message: "Cannot approve request"
                  });
                }

                if(request.rows[0].status == 'approved'){
                  return res.json({
                      message : "Request has been approved"
                   })
                }
                const result = request.rows[0];

                const title = result.title;
                const category = result.category;
                const description = result.description;
                const status = "approved"
                const query =
                  "UPDATE request SET title=$1, category=$2, description=$3, status=$4 WHERE id=$5 RETURNING *";
                const values = [title, category, description, status, id];
                const approvedRequest = await pool.query(query, values);
                return res.json({
                  message: "request approved successfully",
                  request: approvedRequest.rows
                })
              } catch (e) {
                console.log(e)
                return res.status(500).send({
                  message: "Internal server error",
                  code: 500
                });
              }
    }
    
    //resolving a request
    static async resolveRequest(req, res) {
              const id = req.params.id;
              try {
                const queryText = "SELECT * FROM request WHERE id=$1";
                const value = [id];
                const request = await pool.query(queryText, value);
                const result = request.rows[0];
                if (!request){
                  return res.status(404).json({
                    code: 404,
                    status: 'not found',
                    message: "cannot resolve request"
                  });
                }
                if(result.status == 'resolved'){
                  return res.status(200).json({
                    status: 'success',
                    code: 200,
                    message : "Request has been resolved"
                  })
                }
                    const title = result.title;
                    const category = result.category;
                    const description = result.description;
                    const status = "resolved"
                    const query =
                      "UPDATE request SET title=$1, category=$2, description=$3, status=$4 WHERE id=$5 RETURNING *";
                    const values = [title, category, description, status, id];
                    const resolvedRequest = await pool.query(query, values);
                    return res.json({
                      message: "request resolved successfully",
                      request: resolvedRequest.rows
                });
              } catch (e) {
                console.log(e)
                return res.status(500).send({
                  message: "Internal server error",
                  code: 500
                });
              }
    }
    
    //resolving a request
    static async disapproveRequest(req, res) {
          const id = req.params.id;

          try {
            const queryText = "SELECT * FROM request WHERE id=$1";
            const value = [id];
            const request = await pool.query(queryText, value);
            if (!request.rows[0]){
                return res.status(404).json({
                    message: 'request not found',
                    code: 404,
                    status: 'not found'
                  });
            }
            const result = request.rows[0];
            const title = result.title;
            const category = result.category;
            const description = result.description;
            const status = "disapproved"
            const query =
              "UPDATE request SET title=$1, category=$2, description=$3, editedat=CURRENT_TIMESTAMP, status=$4 WHERE id=$5 RETURNING *";
            const values = [title, category, description, status, id];
            const disapprovedRequest = await pool.query(query, values);
            return res.json({
              message: "request disapproved successfully",
              request: disapprovedRequest.rows
            });
          } catch (e) {
            return res.status(500).send({
              message: "Internal server error",
              code: 500
            });
          }
     }

         // GETTING ALL REQUEST FOR THE ADMIN
static async allUsers(req, res) {
  const page = req.query.page || 1;
  const limit = req.query.limit || 20;

  const startIndex = (page - 1) * limit;
  const limitIndex = page * limit;

      try {
          const query = "SELECT *, (SELECT COUNT(*) FROM request requestTable WHERE requestTable.userid = userTable.id) AS requestPosted FROM users userTable OFFSET($1) LIMIT($2)";
          const value = [startIndex, limitIndex]
          const users = await pool.query(query, value);
          if (!users.rows.length) return res.status(200).json({
            status: 'no record',
            message: 'no user in DB',
            code: 200
          });
          return res.status(200).json({
             status: 'ok',
             code: 200,
             users: users.rows
          })
      } catch (error) {
        return res.status(500).send({
          message: "Internal server error",
          code: 500
        });
      }
}

    // GETTING ALL REQUEST FOR THE ADMIN
    static async stats(req, res) {

          try {
              const query = "SELECT COUNT(*) AS usersCount, (SELECT COUNT(*) FROM request ) AS requestCount FROM users";
              const requests = await pool.query(query);
              return res.status(200).json({
                 status: 'ok',
                 code: 200,
                 request: requests.rows
              })
          } catch (error) {
            return res.status(500).send({
              message: "Internal server error",
              code: 500
            });
          }
    }
    

}


export default AdminControllers;