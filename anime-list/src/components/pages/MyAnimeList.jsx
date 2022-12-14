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
    const [upvoteData, setUpvoteData] = useState({voted: false, unvoted: false});
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
                        setUpvoted({ voted: res.voted, notvoted: res.unvoted });
                        setUpvoteData(res);
                    } else {
                        console.log("no response")
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
                        setUpvoteData(res);
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
    },[currentAnime]);

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

        console.log("retriebing")
        
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

    const setAni = async (ani) => {
        setCurrentAnime(ani);
    }

    const upVote = (currentAnime) => {
        setAni(currentAnime);
        console.log("upvoted: " + upvoted.voted)


        if(upvoted.voted){
            return;
        } else if(upvoted.voted === false && upvoted.notvoted === false) {

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
        } else {
            //if it is not a new entry
            if(movie){
                upvoteData.voted = !upvoteData.voted
                upvoteData.unvoted = !upvoteData.unvoted

                MovievoteService.update(upvoteData.id, upvoteData)
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                upvoteData.voted = !upvoteData.voted
                upvoteData.unvoted = !upvoteData.unvoted

                AnimevoteService.update(upvoteData.id, upvoteData)
                    .then(response => {
                        console.log(response.data);
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
            //setActiveAnnime(currentAnime, currentIndex);
        }
    };

    const downVote = (currentAnime) => {

        if(parseInt(currentAnime.votes) < 1){
            console.log("votes less than 1")
            return;
        }

        setAni(currentAnime);
        console.log(currentAnime);

        if(upvoted.notvoted === true && upvoted.voted === false){
            return;
        } else{
            if(movie){
                upvoteData.voted = !upvoteData.voted
                upvoteData.unvoted = !upvoteData.unvoted

                MovievoteService.update(upvoteData.id, upvoteData)
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                upvoteData.voted = !upvoteData.voted
                upvoteData.unvoted = !upvoteData.unvoted


                AnimevoteService.update(upvoteData.id, upvoteData)
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
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
            //setActiveAnnime(currentAnime, currentIndex);
        }
    };

    return (
        <div>
            {/* <div className="col-md-8">
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
            </div> */}
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
                                <div className="badge badge-success mr-2 votes" onClick={()=> upVote(anime)}>
                                    UPVOTE
                                </div>
                                <div className="badge badge-danger mr-2 votes" onClick={() => downVote(anime)}>
                                    DOWNVOTE
                                </div>
                                    {movie ? (
                                        <>
                                            <Link to={"/my-movies/" + anime.id} className="badge badge-warning">
                                                Edit
                                            </Link>
                                        </>
                                    ): (
                                        <>

                                            <Link to={"/my-animes/" + anime.id} className="badge badge-warning">
                                                Edit
                                            </Link>
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

export default MyAnimeList;