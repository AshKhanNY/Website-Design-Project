import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import AnimeService from '../services/AnimeService';

const Anime = (props) => {

  const { id } = useParams();
  let navigate = useNavigate();

  const initialAnimeState = {
    id: null,
    title: "",
    description: "",
    published: false
  };

  const [currentAnime, setCurrentAnime] = useState(initialAnimeState);
  const [message, setMessage] = useState("");

  const getAnime = (id) => {
    AnimeService.get(id)
      .then(response => {
        setCurrentAnime(response.data);
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (id){
      getAnime(id);
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentAnime({ ...currentAnime, [name]: value});
  };

  const updatePublished = (status) => {
    var data = {
      id: currentAnime.id,
      title: currentAnime.title,
      description: currentAnime.description,
      published: status
    };

    AnimeService.update(currentAnime.id, data)
      .then(response => {
        setCurrentAnime({ ...currentAnime, published: status});
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const updateAnime = () => {
    AnimeService.update(currentAnime.id, currentAnime)
      .then(response => {
        console.log(response.data);
        setMessage("The anime was updated successfully!");
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteAnime = () => {
    AnimeService.remove(currentAnime.id)
      .then(response => {
        console.log(response.data);
        navigate("/animes");
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
        {currentAnime ? (
          <div className="edit-form">
            <h4>Anime</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input 
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={currentAnime.title}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <input 
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  value={currentAnime.description}
                  onChange={handleInputChange}
                />
               </div>
               
               <div className="form-group">
                <lable>
                  <strong>Status:</strong>
                </lable>
                  {currentAnime.published ? "Published" : "Pending"}
               </div>
            </form>

            {currentAnime.published? (
              <button className="badge badge-primary mr-2" onClick={() => updatePublished(false)}>Unpublish</button>
            ):(
              <button className="badge badge-primary mr-2" onClick={() => updatePublished(true)}>Publish</button>
            )}

            <button className="badge badge-danger mr-2" onClick={() => deleteAnime}>Delete</button>

            <button type="submit" className="badge badge-success" onClick={updateAnime}>Update</button>
            <p>{message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on an Anime</p>
          </div>
        )}
    </div>
  );
};

export default Anime;
