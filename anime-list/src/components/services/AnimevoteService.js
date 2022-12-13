import http from "../../http-common";

const create = (data) => {
    return http.post("/animevote", data);
};

const getAll = (uid,aid) => {
    return http.get(`/animevote/${uid}/${aid}`);
}


const AnimevoteService = {
    getAll,
    create
};


export default AnimevoteService;