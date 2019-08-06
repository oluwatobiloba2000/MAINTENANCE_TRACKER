import uuid from "uuid/v1";
const newDate = new Date().toString();

let requests = JSON.stringify([{
        id: uuid(),
        title: "lorem 1",
        category: "maintenance",
        description: "lorem lorem lorem",
        time: newDate,
        status: "pending"
    },
    {
        id: uuid(),
        title: "lorem 2",
        category: "maintenance",
        description: "lorem lorem lorem",
        time: newDate,
        status: "pending"
    },
    {
        id: uuid(),
        title: "lorem 3",
        category: "maintenance",
        description: "lorem lorem lorem",
        time: newDate,
        status: "pending"
    },
    {
        id: uuid(),
        title: "lorem 4",
        category: "maintenance",
        description: "lorem lorem lorem",
        time: newDate,
        status: "pending"
    }
]);

export {
    requests,
    newDate
};
