/*
We can add animes or movies depending on
Whether the user indicated that the object is a 
movie or not
*/
import React, { useState } from "react";
import AnimeService from "../services/AnimeService";
import MovieService from "../services/MovieService";


const AddAnime = () => {
    const initialAnimeState = {
        id: null,
        title: "",
        genre: "",
        image: "",
        score: "",
        published: false
    };

    const [anime, setAnime] = useState(initialAnimeState);
    const [submitted, setSubmitted] = useState(false);
    const [checkVal, setCheckVal] = useState(false); // This is use to determine whether to create a movie or not

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAnime({ ...anime, [name]: value});
    };

    const handleCheckbox = (e) => {
        if (e.target.checked){
            setCheckVal(true);
        } else {
            setCheckVal(false);
        }
    }

    const saveAnime = () => {
        var data = {
            title: anime.title,
            genre: anime.genre,
            image: anime.image,
            score: anime.score
        };

        if(checkVal){
            MovieService.create(JSON.stringify(data))
            .then(response => {
                setAnime({
                    title: anime.title,
                    genre: anime.genre,
                    image: anime.image,
                    score: anime.score,
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(err => {
                console.log(err);
            });
        } else {
            AnimeService.create(JSON.stringify(data))
            .then(response => {
                setAnime({
                    title: anime.title,
                    genre: anime.genre,
                    image: anime.image,
                    score: anime.score,
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(err => {
                console.log(err);
            });
        }
    };

    const newAnime = () => {
        setAnime(initialAnimeState);
        setSubmitted(false);
        setCheckVal(false);
    };

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully</h4>
                    <button className="btn btn-success" onClick={newAnime}>
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input 
                            type="text"
                            name="title"
                            className="form-control"
                            id="title"
                            required
                            value={anime.title}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="genre">Genre</label>
                        <input 
                            type="text"
                            className="form-control"
                            id="genre"
                            required
                            value={anime.genre}
                            onChange={handleInputChange}
                            name="genre"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Image url</label>
                        <input 
                            type="text"
                            className="form-control"
                            id="image"
                            required
                            value={anime.image}
                            onChange={handleInputChange}
                            name="image"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="score">Score</label>
                        <input 
                            type="text"
                            className="form-control"
                            id="score"
                            required
                            value={anime.score}
                            onChange={handleInputChange}
                            name="score"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="movie">
                            <input 
                                type="checkbox"
                                className="form-control"
                                id="movie"
                                required
                                value={checkVal}
                                onChange={handleCheckbox}
                                name="movie"
                            />
                          Is this a movie?
                        </label>
                    </div>
                    <button onClick={saveAnime} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );

};

export default AddAnime;