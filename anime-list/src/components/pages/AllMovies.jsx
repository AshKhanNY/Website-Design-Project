import React, { useState, useEffect } from "react";
import MoviedataService from "../services/MoviedataService";
import AuthService from "../services/auth.service";
import MyMovieService from "../services/MyMovieService";

const AllMovies = (props) => {
    const [content, setContent] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [message, setMessage] = useState("");
    const user = AuthService.getCurrentUser();

    useEffect(() => {
        MoviedataService.getAll().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content = (
                    error.response && error.response.data) ||
                    error.message ||
                    error.toString();

                setContent(_content)
            }
        );
    }, []);


    const handleAdd = (anime) => {
        
      var data = {
          title: anime.title,
          image: anime.image,
          genre: anime.genre,
          score: anime.score,
          userId: user.id
      };

      MyMovieService.create(JSON.stringify(data))
          .then(response => {
              setMessage("Movie added successfully")
              setSubmitted(true);
              console.log(response.data);
          })
          .catch(err => {
              console.log(err);
          });
      
          cleanUp();

  };

  const delay = ms => new Promise(res => setTimeout(res, ms));

  const cleanUp = async () => {
    await delay(1500);
    setSubmitted(false);
    setMessage("");
  }

    return(
      <div>
          <div className={(submitted ? "ui green message":"")}><p className="m-p">{message}</p></div>
        {props.currentUser? (
          <section className="my-sec">
              <header className="t-header ">
                <div className="col"><strong>Name</strong></div>
                <div className="col"></div>
                <div className="col"><strong>Year</strong></div>
                <div className="col"><strong>Genre</strong></div>
                <div className="col"><strong>Rating</strong></div>
                <div className="col"></div>
              </header>
              {content && content.sort((el1,el2) => el2.score.toString().localeCompare(el1.score.toString(), undefined, {numeric: true})).map((res, index) =>
                <div className="row my-3 mx-1">
                  <div className="col">{res.title}</div>
                  <div className="col"><img src={res.image} width={200} height={230}/></div>
                  <div className="col">{res.year}</div>
                  <div className="col">{res.genre}</div>
                  <div className="col">{res.score}</div>
                  <div className="col">
                    <div className="ui animated button" onClick={() => handleAdd(res)} tabIndex="0">
                      <div className="visible content">Add movie</div>
                      <div className="hidden content">
                        <i className="right arrow icon"></i>
                      </div>
                    </div>
                  </div>
                </div>
              )}
          </section>
        ):(
          <h1>Please login to access media</h1>
        )}
      </div>
    );
};

export default AllMovies;