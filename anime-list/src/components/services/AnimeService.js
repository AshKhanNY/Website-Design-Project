import http from "../../http-common";


const getAll = () => {
    return http.get("/animes");
}

const get = (id) => {
    return http.get(`/animes/${id}`);
};

const create = (data) => {
    return http.post("/animes", data);
};


const update = (id, data) => {
    return http.put(`/animes/${id}`, data);
};

const remove = (id) => {
    return http.delete(`/animes/${id}`);
};

const removeAll = () => {
    return http.delete(`/animes`);
};

const findByTitle = (title) => {
    return http.get(`/animes?title=${title}`);
};

const AnimeService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle
};


export default AnimeService;