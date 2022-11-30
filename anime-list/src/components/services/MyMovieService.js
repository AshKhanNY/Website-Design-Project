import http from "../../http-common";


const getAll = (id) => {
    return http.get(`/mymovies/${id}`);
}

const get = (id) => {
    return http.get(`/mymovies/by/${id}`);
};

const create = (data) => {
    return http.post("/mymovies", data);
};

const update = (id, data) => {
    return http.put(`/mymovies/${id}`, data);
};

const remove = (id) => {
    return http.delete(`/mymovies/${id}`);
};

const removeAll = () => {
    return http.delete(`/mymovies`);
};

const findByTitle = (id) => {
    return http.get(`/mymovies/${id}/bytitle`);
};

const MyMovieService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle
};


export default MyMovieService;