import http from "../../http-common";


const getAll = (id) => {
    return http.get(`/myanimes/${id}`);
}

const get = (id) => {
    return http.get(`/myanimes/${id}`);
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

const findByTitle = (title) => {
    return http.get(`/myanimes?title=${title}`);
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