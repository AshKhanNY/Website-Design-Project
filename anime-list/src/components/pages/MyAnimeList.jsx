import React, { useState, useEffect } from "react";
import MyAnimeService from "../services/MyAnimeService";
import { Link, useParams, useNavigate, createSearchParams } from "react-router-dom";

const MyAnimeList = () => {
    const [animes, setAnimes] = useState([]);
    const [currentAnime, setCurrentAnime] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState("");
    const [animeId, setAnimeId] = useState(-1);

    let nav = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        retrieveAnimes(id);
    }, []);


    const onChangeSearchTitle = (e) => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };

    const retrieveAnimes = (id) => {
        

        MyAnimeService.getAll(id)
            .then(response => {
                setAnimes(response.data);
                console.log(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const refreshList = (id) => {
        retrieveAnimes(id);
        setCurrentAnime(null);
        setCurrentIndex(-1)
    };

    const setActiveAnnime = (anime, index) => {
        setCurrentAnime(anime);
        setCurrentIndex(index);
        // nav({
        //     pathname: "",
        //     search: `?${createSearchParams({
        //         title: anime.title
        //     })}`
        // });
    };

    const removeAllAnimes = () => {
        MyAnimeService.removeAll()
            .then(response => {
                console.log(response.data);
                refreshList(id);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const findByTitle = () => {
        MyAnimeService.findByTitle(searchTitle, id)
            .then(response => {
                setAnimes(response.data);
                console.log(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="Search by title"
                        value={searchTitle}
                        onChange={onChangeSearchTitle}
                    />
                    <div>
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByTitle}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <h4>Anime List</h4>

                <ul>
                    {animes &&
                     animes.map((anime, index) => (
                        <li 
                          className={"list-group-item " + (index === currentIndex ? "active" : "")}
                          onClick={() => setActiveAnnime(anime,index)}
                          >
                            {anime.title}
                        </li>
                     ))}
                </ul>

                <button className="m-3 btn btn-sm btn-danger" onClick={removeAllAnimes}>
                    Remove All
                </button>
            </div>
            <div className="col-md-6">
                {currentAnime ? (
                    <div>
                        <h4>Anime</h4>
                        <div>
                            <label>
                                <strong>Title:</strong>
                            </label>{" "}
                            {currentAnime.title}
                        </div>
                        <div>
                            <label>
                                <strong>Description:</strong>
                            </label>{" "}
                            {currentAnime.title}
                        </div>
                        <div>
                            <label>
                                <strong>Status:</strong>
                            </label>{" "}
                            {currentAnime.published ? "Published": "Pending"}
                        </div>
                        <Link to={"/my-animes/" + currentAnime.id} className="badge badge-warning">
                            Edit
                        </Link>
                    </div>
                ):(
                    <div>
                        <br />
                        <p>Please click on an Anime </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyAnimeList;