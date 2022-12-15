import http from "../../http-common";

const create = async (data) => {
    return http.post("/movievote", data);
};

const getAll = async (uid,aid) => {
    return http.get(`/movievote/${uid}/${aid}`);
}

const update = async (id, data) => {
    console.log("executing update service")
    return http.put(`/movievote/${id}`, data);
};


const MovievoteService = {
    getAll,
    create,
    update
};


export default MovievoteService;