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

        const id = requestParsed.length + 1;
        const request = {
            id: id,
            title: title,
            category: category,
            description: description,
            time: newDate,
            status: "pending"
        }
        // push the new data into the database
        requestParsed.push(request);
        return res.json({
            message: `request posted !`,

            request
        })
    }

    // updating requests
    static updateRequest(req, res) {
        const id = req.params.id;
        const titleToUpdate = req.body.title;
        const categoryToUpdate = req.body.category;
        const descriptionToUpdate = req.body.description;
        const requestToUpdate = requestParsed.find(request => request.id == id);
        if (requestToUpdate) {
            let editedPost = requestParsed.map((request) => {
                if (request.id == id) {
                    return {
                        id: request.id,
                        title: titleToUpdate || request.title,
                        category: categoryToUpdate || request.category,
                        description: descriptionToUpdate || request.description,
                        time: newDate,
                        status: request.status
                    }
                }
                return request;
            });
            requestParsed = editedPost
            return res.json({
                message: `request updated !!`,
            })
        }
        return res.status(400).json({
            message: `cannot update request`
        })
    }
}

export default RequestControllers;