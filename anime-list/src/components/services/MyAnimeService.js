import http from "../../http-common";


const getAll = (id) => {
    return http.get(`/myanimes/${id}`);
}

const get = (id) => {
    return http.get(`/myanimes/by/${id}`);
};

const create = (data) => {
    return http.post("/myanimes", data);
};

const update = (id, data) => {
    return http.put(`/myanimes/${id}`, data);
};

const remove = (id) => {
    return http.delete(`/myanimes/${id}`);
};

const removeAll = () => {
    return http.delete(`/myanimes`);
};

const findByTitle = (id) => {
    return http.get(`/myanimes/${id}/bytitle`);
};

const MyAnimeService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle
};


export default MyAnimeService;