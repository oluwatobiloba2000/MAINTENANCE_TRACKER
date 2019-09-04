import jwt from "jsonwebtoken";
import pool from '../models/index';
import dotenv from 'dotenv';
dotenv.config();

class RequestControllers {

    // getting all requests
    static allRequests(req, res) {
        jwt.verify(req.token, process.env.KEY , async (err, authorizedData) => {
            if (err) {
                res.json(err);
            } else {
                try {
                    const query = "SELECT * FROM request"
                    const requests = await pool.query(query);
                    if (!requests.rows.length) return res.status(200).send("NO REQUEST");
                    return res.status(200).json({
                        request: requests.rows
                    })
                } catch (error) {
                    console.log(error)
                }
            }
        })
    }

    //GET /requests/:<request id>
    static getRequestById(req, res) {
        jwt.verify(req.token, process.env.KEY, async (err, authorizedData) => {
            if (err) {
                res.json(err)
            } else {
                const id = req.params.id;
                const query = "SELECT * FROM request WHERE id=$1"
                const value = [id];
                const request = await pool.query(query, value);
                if (!request.rows.length) {
                    res.status(404).json("FILE NOT FOUND");
                }
                res.status(200).json({
                    request: request.rows[0]
                });
            }
        })

    }

    //sending a post request
    static createRequest(req, res) {
        jwt.verify(req.token, process.env.KEY, async (err, authorizedData) => {
            if (err) {
                res.json(err)
            } else {
                const title = req.body.title;
                const category = req.body.category;
                const description = req.body.description;
                if (!title || !category || !description) {
                    return res.status(400).json({
                        message: `request must have a title , post category and post description`
                    });
                }
                try {
                    const query = `INSERT INTO request(title, category, description, time) VALUES($1, $2, $3, CURRENT_DATE) RETURNING *`;
                    const value = [title, category, description];
                    const newRequest = await pool.query(query, value);
                    return res.json({
                        message: `request posted !`,
                        request : newRequest.rows
                    })
                } catch (e) {
                    console.log(e);
                }
            }
        })
}

// updating requests
static updateRequest(req, res) {
    jwt.verify(req.token, process.env.KEY, async (err, authorizedData) => {
        if (err) {
            res.json(err)
        } else {
            const id = req.params.id;
            try {
              const queryText = "SELECT * FROM request WHERE id=$1";
              const value = [id];
              const request = await pool.query(queryText, value);
              if (!request.rows.length){
                  return res.status(404).json("Awwwwn snap ID not found");
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
                "UPDATE request SET title=$1, category=$2, description=$3 WHERE id=$4 RETURNING *";
              const values = [title, category, description, id];
              const updatedRequest = await pool.query(query, values);
              return res.json({
                message: "request updated successfully",
                request: updatedRequest.rows
              });
            } catch (e) {
                console.log(e);
              return res.status(400).send({
                message: "Awwwwn snap, ERROR !!"
              });
            }
        }
    })
}

// GETTING ALL REQUEST FOR THE ADMIN
static allRequestsAdmin(req, res) {
    jwt.verify(req.token, process.env.ADMINKEY, async (err, authorizedData) => {
        if (err) {
            res.json(err);
        } else {
            try {
                const query = "SELECT * FROM request"
                const requests = await pool.query(query);
                if (!requests.rows.length) return res.status(200).send("NO REQUEST");
                return res.status(200).json({
                    request: requests.rows
                })
            } catch (error) {
                console.log(error)
            }
        }
    })
}

    //approving a request
    static approveRequest(req, res) {
        jwt.verify(req.token, process.env.ADMINKEY, async (err, authorizedData) => {
            if (err) {
                res.json(err)
            } else {
                const id = req.params.id;
                try {
                  const queryText = "SELECT * FROM request WHERE id=$1";
                  const value = [id];
                  const request = await pool.query(queryText, value);
                  if (!request.rows.length){
                      return res.status(404).json("Cannot approve request");
                  }
                  const result = request.rows[0];
                  if(result.status == "pending"){
                  const title = result.title;
                  const category = result.category;
                  const description = result.description;
                  const time = result.time;
                  const status = "Approved"
                  const query =
                    "UPDATE request SET title=$1, category=$2, description=$3, time=$4, status=$5 WHERE id=$6 RETURNING *";
                  const values = [title, category, description, time, status, id];
                  const approvedRequest = await pool.query(query, values);
                  return res.json({
                    message: "request approved successfully",
                    request: approvedRequest.rows
                  })}else{
                      return res.json({
                         message : "Request can only be approved when they are pending"
                      })
                  };
                } catch (e) {
                  return res.status(400).send({
                    message: `cannot approve request [id] does not exist`
                  });
                }
            }
     })
}

    //resolving a request
    static resolveRequest(req, res) {
        jwt.verify(req.token, process.env.ADMINKEY, async (err, authorizedData) => {
            if (err) {
                res.json(err)
            } else {
                const id = req.params.id;
                try {
                  const queryText = "SELECT * FROM request WHERE id=$1";
                  const value = [id];
                  const request = await pool.query(queryText, value);
                  if (!request.rows.length){
                      return res.status(404).json("Cannot resolve request");
                  }
                  const result = request.rows[0];
                  if(result.status == 'Resolved'){
                    return res.json({
                        message : "Request has been resolved"
                     })
                  }
                      const title = result.title;
                      const category = result.category;
                      const description = result.description;
                      const time = result.time;
                      const status = "Resolved"
                      const query =
                        "UPDATE request SET title=$1, category=$2, description=$3, time=$4, status=$5 WHERE id=$6 RETURNING *";
                      const values = [title, category, description, time, status, id];
                      const resolvedRequest = await pool.query(query, values);
                      return res.json({
                        message: "request resolved successfully",
                        request: resolvedRequest.rows
                  });
                } catch (e) {
                  return res.status(400).send({
                    message: `Aww snapp cannot resolve request id does not exist`
                  });
                }
            }
        })
}

   //resolving a request
   static disapproveRequest(req, res) {
    jwt.verify(req.token, process.env.ADMINKEY, async (err, authorizedData) => {
        if (err) {
            res.json(err)
        } else {
            const id = req.params.id;
            try {
              const queryText = "SELECT * FROM request WHERE id=$1";
              const value = [id];
              const request = await pool.query(queryText, value);
              if (!request.rows.length){
                  return res.status(404).json("Cannot resolve request");
              }
              const result = request.rows[0];
              const title = result.title;
              const category = result.category;
              const description = result.description;
              const time = result.time;
              const status = "Disapproved"
              const query =
                "UPDATE request SET title=$1, category=$2, description=$3, time=$4, status=$5 WHERE id=$6 RETURNING *";
              const values = [title, category, description, time, status, id];
              const disapprovedRequest = await pool.query(query, values);
              return res.json({
                message: "request disapproved successfully",
                request: disapprovedRequest.rows
              });
            } catch (e) {
                console.log(e);
              return res.status(400).send({
                message: `Aww snapp cannot resolve request id does not exist`
              });
            }
        }
    })
}

}

export default RequestControllers;