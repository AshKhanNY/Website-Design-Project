import React, { useState, useEffect } from "react";
import AnimeService from "../services/AnimeService";
import { Link } from "react-router-dom";
import MovieService from "../services/MovieService";


const AnimeList = (props) => {
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
    };

    const downVote = () => {
        if(parseInt(currentAnime.votes) < 1){
            return;
        }

        if(movie){
            currentAnime.votes = (parseInt(currentAnime.votes) - 1).toString();

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
    };

    return (
        <div>
            <div>
                <h4 className="ml-5">{header + " List"}</h4>
                <button className={`ml-5 ui button " + ${movie ? "" : "primary"}`} onClick={handleAnime}>
                    Animes
                </button>
                <button className={"ml-2 ui button " + (movie ? "primary" : "")} onClick={handleMovie}>
                    Movies
                </button>

                {props.currentUser? (
                <section className="my-sec">
                    <header className="t-header ">
                        <div className="col"><strong>Name</strong></div>
                        <div className="col"></div>
                        <div className="col"><strong>Genre</strong></div>
                        <div className="col"><strong>Rating</strong></div>
                        <div className="col"><strong>Details</strong></div>
                    </header>
                    {animes &&
                     animes.sort((el1,el2) => el2.score.toString().localeCompare(el1.score.toString(), undefined, {numeric: true})).map((anime, index) =>
                        <div className="row my-3 mx-1">
                            <div className="col">{anime.title}</div>
                            <div className="col"><img src={anime.image} width={200} height={230}/></div>
                            <div className="col">{anime.genre}</div>
                            <div className="col">{anime.score}</div>
                            <div className="col">
                                <h4>Anime</h4>
                                <div>
                                    <label>
                                        <strong>Title:</strong>
                                    </label>{" "}
                                    {anime.title}
                                </div>
                                <div>
                                    <label>
                                        <strong>Status:</strong>
                                    </label>{" "}
                                    {anime.published ? "Published": "Pending"}
                                </div>
                                <div>
                                    <label>
                                        <strong>Votes:</strong>
                                    </label>{" "}
                                    {anime.votes}
                                </div>
                                <div className="ui positive basic button mr-2 votes" onClick={()=> upVote(anime)}>
                                    UPVOTE
                                </div>
                                <div className="ui negative basic button mr-2 votes" onClick={() => downVote(anime)}>
                                    DOWNVOTE
                                </div>
                                    {props.showAdminBoard? (
                                        <>
                                            {movie ? (
                                                <>
                                                    <Link to={"/movies/" + anime.id} className="ui yellow basic button">
                                                        Edit
                                                    </Link>
                                                </>
                                            ): (
                                                <>

                                                    <Link to={"/animes/" + anime.id} className="ui yellow basic button">
                                                        Edit
                                                    </Link>
                                                </>
                                            )}

                                        </> ): (
                                            <>

                                            </>
                                    )}   
                                        
                                </div>
                        </div>
                    )}
                </section>
                ):(
                <h3>Please login to access media</h3>
                )}

                {/* <ul>
                    {animes &&
                     animes.sort((el1,el2) => el2.votes.toString().localeCompare(el1.votes.toString(), undefined, {numeric: true})).map((anime, index) =>
                        <li key={index}
                          className={"list-group-item " + (index === currentIndex ? "active" : "")}
                          onClick={() => setActiveAnnime(anime,index)}
                          >
                            {anime.title}
                        </li>
                     )}
                </ul> */}

                <button className="m-3 btn btn-sm btn-danger" onClick={removeAllAnimes}>
                    Remove All
                </button>
            </div>
        </div>
    );
};

export default AnimeList;