import uuid from "uuid/v1";
import {requests, newDate} from "../data/data";
let requestParsed = JSON.parse(requests);
class RequestControllers {
    // getting all requests
    static allRequests(req, res) {
       return res.status(200).json(requestParsed);
    }
}

export default RequestControllers;