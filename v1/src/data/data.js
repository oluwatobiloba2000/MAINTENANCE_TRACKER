const newDate = new Date().toString();

let requests = JSON.stringify([{
        id: 1,
        title: "lorem 1",
        category: "maintenance",
        description: "lorem lorem lorem",
        time: newDate,
        status: "pending"
    },
    {
        id: 2,
        title: "lorem 2",
        category: "maintenance",
        description: "lorem lorem lorem",
        time: newDate,
        status: "pending"
    },
    {
        id: 3,
        title: "lorem 3",
        category: "maintenance",
        description: "lorem lorem lorem",
        time: newDate,
        status: "pending"
    },
    {
        id: 4,
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
