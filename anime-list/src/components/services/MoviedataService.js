import http from "../../http-common";


const getAll = () => {
    return http.get("/moviedata");
};

const MoviedataService = {
    getAll
};


export default MoviedataService;