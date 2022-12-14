import React, { useState, useEffect } from "react";
import MyAnimeService from "../services/MyAnimeService";
import MyMovieService from "../services/MyMovieService";
import AnimevoteService from "../services/AnimevoteService";
import MovievoteService from "../services/MovievoteService";
import { Link, useParams } from "react-router-dom";
import Movie from "./Movie";

const MyAnimeList = (props) => {
    const [animes, setAnimes] = useState([]);
    const [currentAnime, setCurrentAnime] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState("");
    const [movie, setMovie] = useState(false);
    const [header, setHeader] = useState("Anime")
    const [upvoted, setUpvoted] = useState({voted: false, notvoted: false});
    //const [animeId, setAnimeId] = useState(-1);

    //let nav = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        retrieveAnimes(id);
    }, [movie]);

    useEffect(() => {
        if(!movie){
            fetchAnimeVotes()
                .then(res => {
                    if (res){
                        setUpvoted({...upvoted, voted: res.voted});
                    } else {
                        setUpvoted({voted: false, notvoted: false});
                    }
                    console.log(upvoted)
                    console.log("useEffect ran")
                })
                .catch(err => {
                    console.log(err)
                });
        } else {
            fetchMovieVotes()
                .then(res => {
                    if (res){
                        setUpvoted({...upvoted, voted: res.voted});
                    } else {
                        setUpvoted({voted: false, notvoted: false});
                    }
                    console.log(upvoted)
                    console.log("useEffect ran")
                })
                .catch(err => {
                    console.log(err)
                });
        }
    },[currentIndex]);

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

    const retrieveAnimes = (id) => {
        
        if(movie){
            MyMovieService.getAll(id)
                .then(response => {
                    setAnimes(response.data);
                    console.log(response.data);
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            MyAnimeService.getAll(id)
                .then(response => {
                    setAnimes(response.data);
                    console.log(response.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }

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

        if(movie){
            MyMovieService.removeAll()
                .then(response => {
                    console.log(response.data);
                    refreshList(id);
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            MyAnimeService.removeAll()
                .then(response => {
                    console.log(response.data);
                    refreshList(id);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };

    const findByTitle = () => {
        if(movie){
            MyMovieService.findByTitle(searchTitle, id)
                .then(response => {
                    setAnimes(response.data);
                    console.log(response.data);
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            MyAnimeService.findByTitle(searchTitle, id)
                .then(response => {
                    setAnimes(response.data);
                    console.log(response.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };

    const fetchAnimeVotes = async () => {
        console.log("Fetiching votes for id: " + id + "and aid: "  + currentAnime.id);
        const res = await AnimevoteService.getAll(id, currentAnime.id)
            .then(response => {
                console.log(response.data)
                return response.data[0];
            })
            .catch(err => {
                console.log(err)
            });
        
        return res;
    }

    const fetchMovieVotes = async () => {
        console.log("Fetiching votes for movies id: " + id + "and aid: "  + currentAnime.id);
        const res = await MovievoteService.getAll(id, currentAnime.id)
            .then(response => {
                console.log(response.data)
                return response.data[0];
            })
            .catch(err => {
                console.log(err)
            });
        
        return res;
    }

    const upVote = () => {


        if(upvoted.voted){
            return;
        } else {

            if(movie) {
                const data = {
                    userId: id,
                    movieId: currentAnime.id,
                    voted: true,
                    unvoted: false
                }


                MovievoteService.create(data)
                    .then(response => {
                        console.log(response.data);
                        setUpvoted({voted: true, notvoted: false});
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                const data = {
                    userId: id,
                    animeId: currentAnime.id,
                    voted: true,
                    unvoted: false
                }

                AnimevoteService.create(data)
                    .then(response => {
                        console.log(response.data);
                        setUpvoted({voted: true, notvoted: false});
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }    
        currentAnime.votes = (parseInt(currentAnime.votes) + 1).toString();
        if(movie){

            MyMovieService.update(currentAnime.id, currentAnime)
                .then(response => {
                console.log(response.data);
                })
                .catch(err => {
                console.log(err);
                });

            retrieveAnimes(id);
            setActiveAnnime(currentAnime, currentIndex);
        } else {

            MyAnimeService.update(currentAnime.id, currentAnime)
                .then(response => {
                console.log(response.data);
                })
                .catch(err => {
                console.log(err);
                });

            retrieveAnimes(id);
            setActiveAnnime(currentAnime, currentIndex);
        }
    };

    const downVote = () => {

        AnimevoteService.getAll(id, currentAnime.id)
            .then(response => {
                setUpvoted(response.data[0])
            })
            .catch(err => {
                console.log(err)
            });

        if(upvoted.unvoted === true && upvoted === false){
            return;
        }
        if(parseInt(currentAnime.votes) < 1){
            return;
        }

        if(movie){
            currentAnime.votes = (parseInt(currentAnime.votes) - 1).toString();

            MyMovieService.update(currentAnime.id, currentAnime)
                .then(response => {
                console.log(response.data);
                })
                .catch(err => {
                console.log(err);
                });

            retrieveAnimes(id);
            setActiveAnnime(currentAnime, currentIndex);
        } else {

            // data = {
            //     id: 
            // }

            //AnimevoteService.update
            currentAnime.votes = (parseInt(currentAnime.votes) - 1).toString();

            MyAnimeService.update(currentAnime.id, currentAnime)
                .then(response => {
                console.log(response.data);
                })
                .catch(err => {
                console.log(err);
                });

            retrieveAnimes(id);
            setActiveAnnime(currentAnime, currentIndex);
        }
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
                            {currentAnime.description}
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
                        {props.showAdminBoard ? (
                            <>
                                {movie ? (
                                    <>
                                        <Link to={"/my-movies/" + currentAnime.id} className="badge badge-warning">
                                            Edit
                                        </Link>
                                    </>
                                ): (
                                    <>

                                        <Link to={"/my-animes/" + currentAnime.id} className="badge badge-warning">
                                            Edit
                                        </Link>
                                    </>
                                )}
                                
                            </> ):(
                                    <>

                                    </>
   
                            )}
                    </div>
                ):(
                    <div>
                        <br />
                        <p>Please click on an {header} </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyAnimeList;