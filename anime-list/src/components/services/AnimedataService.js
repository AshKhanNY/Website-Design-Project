import http from "../../http-common";


const getAll = () => {
    return http.get("/animedata");
};

const AnimedataService = {
    getAll
};


export default AnimedataService;