import http from "../../http-common";


const getAll = () => {
    return http.get("/movies");
}

const get = (id) => {
    return http.get(`/movies/${id}`);
};

const create = (data) => {
    return http.post("/movies", data);
};


const update = (id, data) => {
    return http.put(`/movies/${id}`, data);
};

const remove = (id) => {
    return http.delete(`/movies/${id}`);
};

const removeAll = () => {
    return http.delete(`/movies`);
};

const findByTitle = (title) => {
    return http.get(`/movies?title=${title}`);
};

const MovieService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle
};


export default MovieService;