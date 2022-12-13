import http from "../../http-common";


const getAll = () => {
    return http.get("/moviedata");
};

const AnimedataService = {
    getAll
};


export default AnimedataService;