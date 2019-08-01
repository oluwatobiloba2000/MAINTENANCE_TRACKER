import requests from "../data/data";
import uuid from "uuid/v1";


class RequestControllers {
    // getting all requests
    static allRequests(req, res) {
        res.status(200).json(requests);
    }

    //GET /requests/:<request id>
    static getRequestById(req, res) {
        const id = req.params.id;
        const request = requests.find(each =>
            each.id == id
        )
        if (!request) {
            res.status(404).json({
              message :  `request with id: ${id} not found`
            });
        }
        res.status(200).json({request});

    }

    //sending a post request
    static createRequest(req , res){
        const title = req.body.title;
        const postCategory = req.body.postCategory;
        const postDescription = req.body.postDescription;

        if(!title || !postCategory || !postDescription){
             return res.status(400).json({
                message : `request must have a title , post category and post description`
            });
        }

        const id = uuidv();
        const request = {
            id : id,
            title : title,
            postCategory : postCategory,
            postDescription : postDescription,
            time_requested : new Date()
        }
        // push the new data into the database
        requests.push(request);
        return res.json({
            success : `request posted !`,

            request
        })
    }
    

}

export default RequestControllers;