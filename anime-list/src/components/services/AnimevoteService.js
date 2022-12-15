import http from "../../http-common";

const create = async (data) => {
    return http.post("/animevote", data);
};

const getAll = async (uid,aid) => {
    return http.get(`/animevote/${uid}/${aid}`);
};

const update = async (id, data) => {
    console.log("Executing update service")
    return http.put(`/animevote/${id}`, data);
};


const AnimevoteService = {
    getAll,
    create,
    update
};


export default AnimevoteService;