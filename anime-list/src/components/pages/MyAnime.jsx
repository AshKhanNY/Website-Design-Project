import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import MyAnimeService from '../services/MyAnimeService';
import AuthService from "../services/auth.service";

const MyAnime = (props) => {

  const { id } = useParams();
  let navigate = useNavigate();

  const user = AuthService.getCurrentUser();

  const initialAnimeState = {
    id: null,
    title: "",
    genre: "",
    image: "",
    published: false
  };

  const [currentAnime, setCurrentAnime] = useState(initialAnimeState);
  const [message, setMessage] = useState("");

  const getAnime = (id) => {
    console.log("gettin anime with id of: " + id);
    MyAnimeService.get(id)
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
      genre: currentAnime.genre,
      image: currentAnime.image,
      published: status
    };

    MyAnimeService.update(currentAnime.id, data)
      .then(response => {
        setCurrentAnime({ ...currentAnime, published: status});
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const updateAnime = () => {
    console.log(currentAnime)
    MyAnimeService.update(currentAnime.id, currentAnime)
      .then(response => {
        console.log(response.data);
        setMessage("The anime was updated successfully!");
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteAnime = () => {
    MyAnimeService.remove(currentAnime.id)
      .then(response => {
        console.log(response.data);
        navigate("/myplist/"+user.id);
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
                <label htmlFor="genre">Genre</label>
                <input 
                  type="text"
                  className="form-control"
                  id="genre"
                  name="genre"
                  value={currentAnime.genre}
                  onChange={handleInputChange}
                />
               </div>
               <div>
                <label htmlFor="image">Image url</label>
                <input 
                  type="text"
                  className="form-control"
                  id="image"
                  name="image"
                  value={currentAnime.image}
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
              <button className="ui primary basic button mr-2" onClick={() => updatePublished(false)}>Unpublish</button>
            ):(
              <button className="ui primary basic button mr-2" onClick={() => updatePublished(true)}>Publish</button>
            )}

            <button className="ui negative basic button mr-2" onClick={deleteAnime}>Delete</button>

            <button type="submit" className="ui positive basic button" onClick={updateAnime}>Update</button>
            <div class={(message === "" ? "":"ui green message")}><p>{message}</p></div>
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

export default MyAnime;
