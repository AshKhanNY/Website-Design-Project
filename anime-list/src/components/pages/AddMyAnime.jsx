import React, { useState } from "react";
import MyAnimeService from "../services/MyAnimeService";
import MyMovieService from "../services/MyMovieService";
import AuthService from "../services/auth.service";

const AddMyAnime = () => {
    const user = AuthService.getCurrentUser();
    
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
    const [checkVal, setCheckVal] = useState(false);

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
            score: anime.score,
            userId: user.id
        };

        if (checkVal){
            MyMovieService.create(JSON.stringify(data))
                .then(response => {
                    setAnime({
                        id : response.data.id,
                        title: response.data.title,
                        genre: response.data.genre,
                        image: response.data.image,
                        score: response.data.score,
                        published: response.data.published
                    });
                    setSubmitted(true);
                    console.log(response.data);
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            MyAnimeService.create(JSON.stringify(data))
                .then(response => {
                    setAnime({
                        id : response.data.id,
                        title: response.data.title,
                        genre: response.data.genre,
                        image: response.data.image,
                        score: response.data.score,
                        published: response.data.published
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

export default AddMyAnime;