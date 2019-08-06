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
}

export default RequestControllers;