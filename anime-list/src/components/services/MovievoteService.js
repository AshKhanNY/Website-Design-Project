import http from "../../http-common";

const create = (data) => {
    return http.post("/movievote", data);
};

const getAll = (uid,aid) => {
    return http.get(`/movievote/${uid}/${aid}`);
}


const MovievoteService = {
    getAll,
    create
};


export default MovievoteService;