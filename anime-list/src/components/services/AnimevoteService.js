import http from "../../http-common";

const create = (data) => {
    return http.post("/animevote", data);
};

const getAll = (uid,aid) => {
    return http.get(`/animevote/${uid}/${aid}`);
};

const update = (id, data) => {
    console.log("Executing update service")
    return http.put(`/animevote/${id}`, data);
};


const AnimevoteService = {
    getAll,
    create,
    update
};


export default AnimevoteService;