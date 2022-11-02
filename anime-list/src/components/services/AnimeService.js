import http from "../../http-common";


const getAll = () => {
    return http.get("/animes");
}

const get = (id) => {
    return http.get(`/animes/${id}`);
};

const create = (data) => {
    console.log("about t send post")
    console.log(data)
    return http.post("/animes", data);
};
// const create = (data) => {
//     return (async() => {
//         const raw = await fetch('http://localhost:8080/api/animes', {
//             method: 'POST',
//             headers: {
//                 'Accpet': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body: data
//         });
//         const content = await raw.json();
//         return content;
//     })();
// };

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