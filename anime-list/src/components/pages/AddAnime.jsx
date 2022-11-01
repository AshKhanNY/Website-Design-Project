import React, { useState } from "react";
import AnimeService from "../services/AnimeService";


const AddAnime = () => {
    const initialAnimeState = {
        id: null,
        title: "",
        description: "",
        published: false
    };

    const [anime, setAnime] = useState(initialAnimeState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAnime({ ...anime, [name]: value});
    } ;

    const savetutorial = () => {
        var data = {
            title: anime.title,
            description: anime.description
        };

        AnimeService.create(data)
            .then(response => {
                setAnime({
                    id = response.data.id,
                    title: response.data.title;
                    description: response.data.description,
                    published: response.data.published
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(err => {
                console.log(err);
            });
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
                    <buton className="btn btn-success" onClick={newAnime}>
                        Add
                    </buton>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input 
                            type="text"
                            className="form-control"
                            id="title"
                            required
                            value={anime.title}
                            onChange={handleInputChange}
                            name="title"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Title</label>
                        <input 
                            type="text"
                            className="form-control"
                            id="description"
                            required
                            value={anime.description}
                            onChange={handleInputChange}
                            name="description"
                        />
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