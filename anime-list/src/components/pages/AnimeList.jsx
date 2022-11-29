import React, { useState, useEffect } from "react";
import AnimeService from "../services/AnimeService";
import { Link } from "react-router-dom";
import MovieService from "../services/MovieService";


const AnimeList = () => {
    const [animes, setAnimes] = useState([]);
    const [currentAnime, setCurrentAnime] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState("");
    const [movie, setMovie] = useState(false);
    const [header, setHeader] = useState("Anime")

    useEffect(() => {
        retrieveAnimes();
    }, [movie]);

    const handleAnime = () => {
        if(movie){
            setHeader("Anime");
            setCurrentAnime(null);
            setCurrentIndex(-1)
            setMovie(false);
        }
    }

    const handleMovie = () => {
        if(!movie){
            setHeader("Movie");
            setCurrentAnime(null);
            setCurrentIndex(-1)
            setMovie(true);

        }
    }


    const onChangeSearchTitle = (e) => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };

    const retrieveAnimes = () => {
        if(movie) {
            MovieService.getAll()
            .then(response => {
                setAnimes(response.data);
                console.log(response.data);
            })
            .catch(err => {
                console.log(err);
            });
        } else {
            AnimeService.getAll()
            .then(response => {
                setAnimes(response.data);
                console.log(response.data);
            })
            .catch(err => {
                console.log(err);
            });
        }
    };

    const refreshList = () => {
        retrieveAnimes();
        setCurrentAnime(null);
        setCurrentIndex(-1)
    };

    const setActiveAnnime = (anime, index) => {
        setCurrentAnime(anime);
        setCurrentIndex(index);
    };

    const removeAllAnimes = () => {
        if(movie){
            MovieService.removeAll()
            .then(response => {
                console.log(response.data);
                refreshList();
            })
            .catch(err => {
                console.log(err);
            });
        } else {
            AnimeService.removeAll()
            .then(response => {
                console.log(response.data);
                refreshList();
            })
            .catch(err => {
                console.log(err);
            });
        }
    };

    const findByTitle = () => {
        if(movie) {
            MovieService.findByTitle(searchTitle)
            .then(response => {
                setAnimes(response.data);
                console.log(response.data);
            })
            .catch(err => {
                console.log(err);
            });
        } else {
            AnimeService.findByTitle(searchTitle)
            .then(response => {
                setAnimes(response.data);
                console.log(response.data);
            })
            .catch(err => {
                console.log(err);
            });
        }
    };

    const upVote = () => {
        if(movie){
            currentAnime.votes = (parseInt(currentAnime.votes) + 1).toString();

            MovieService.update(currentAnime.id, currentAnime)
            .then(response => {
            console.log(response.data);
            })
            .catch(err => {
            console.log(err);
            });

            retrieveAnimes();
            setActiveAnnime(currentAnime, currentIndex);
        } else {
            currentAnime.votes = (parseInt(currentAnime.votes) + 1).toString();

            AnimeService.update(currentAnime.id, currentAnime)
            .then(response => {
            console.log(response.data);
            })
            .catch(err => {
            console.log(err);
            });

            retrieveAnimes();
            setActiveAnnime(currentAnime, currentIndex);
        }
    }

    const downVote = () => {
        if(parseInt(currentAnime.votes) < 1){
            return;
        }

        if(movie){
            currentAnime.votes = (parseInt(currentAnime.votes) - 1).toString();

            AnimeService.update(currentAnime.id, currentAnime)
            .then(response => {
            console.log(response.data);
            })
            .catch(err => {
            console.log(err);
            });

            retrieveAnimes();
            setActiveAnnime(currentAnime, currentIndex);
        } else {
            currentAnime.votes = (parseInt(currentAnime.votes) - 1).toString();

            AnimeService.update(currentAnime.id, currentAnime)
            .then(response => {
            console.log(response.data);
            })
            .catch(err => {
            console.log(err);
            });

            retrieveAnimes();
            setActiveAnnime(currentAnime, currentIndex);
        }
    }

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
                <button className={`ml-5 ui button " + ${movie ? "" : "primary"}`} onClick={handleAnime}>
                    Animes
                </button>
                <button className={"ml-2 ui button " + (movie ? "primary" : "")} onClick={handleMovie}>
                    Movies
                </button>
                <h4 className="ml-5">{header + " List"}</h4>

                <ul>
                    {animes &&
                     animes.sort((el1,el2) => el2.votes.toString().localeCompare(el1.votes.toString(), undefined, {numeric: true})).map((anime, index) =>
                        <li key={index}
                          className={"list-group-item " + (index === currentIndex ? "active" : "")}
                          onClick={() => setActiveAnnime(anime,index)}
                          >
                            {anime.title}
                        </li>
                     )}
                </ul>

                <button className="m-3 btn btn-sm btn-danger" onClick={removeAllAnimes}>
                    Remove All
                </button>
            </div>
            <div className="col-md-6">
                {currentAnime ? (
                    <div>
                        <h4>{header}</h4>
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
                        <div>
                            <label>
                                <strong>Votes:</strong>
                            </label>{" "}
                            {currentAnime.votes}
                        </div>
                        <div className="badge badge-success mr-2 votes" onClick={upVote}>
                            UPVOTE
                        </div>
                        <div className="badge badge-danger mr-2 votes" onClick={downVote}>
                            DOWNVOTE
                        </div>
                        {movie ? (
                            <Link to={"/movies/" + currentAnime.id} className="badge badge-warning">
                            Edit
                        </Link>
                        ):(
                            <Link to={"/animes/" + currentAnime.id} className="badge badge-warning">
                            Edit
                        </Link>
                        )}
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

export default AnimeList;