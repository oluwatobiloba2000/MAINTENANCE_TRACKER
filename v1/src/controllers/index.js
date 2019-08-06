import uuid from "uuid/v1";
import {
    requests,
    newDate
} from "../data/data";
let requestParsed = JSON.parse(requests);
class RequestControllers {

    // getting all requests
    static allRequests(req, res) {
        return res.status(200).json(requestParsed);
    }

    //GET /requests/:<request id>
    static getRequestById(req, res) {
        const id = req.params.id;
        const request = requestParsed.find(each =>
            each.id == id
        )
        if (!request) {
            res.status(404).json({
                message: `request with id: ${id} not found`
            });
        }
        res.status(200).json({
            request
        });

    }

    //sending a post request
    static createRequest(req, res) {
        const title = req.body.title;
        const category = req.body.category;
        const description = req.body.description;

        if (!title || !category || !description) {
            return res.status(400).json({
                message: `request must have a title , post category and post description`
            });
        }

        const id = uuid();
        const request = {
            id: id,
            title: title,
            category: category,
            description: description,
            time: newDate,
            status: pending
        }
        // push the new data into the database
        requestPased.push(request);
        return res.json({
            message: `request posted !`,

            request
        })
    }
}

export default RequestControllers;