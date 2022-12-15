import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import AnimedataService from "../services/AnimedataService";
import MyAnimeService from "../services/MyAnimeService";



const Home = (props) => {
    const [content, setContent] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [message, setMessage] = useState("");
    const user = AuthService.getCurrentUser();

    useEffect(() => {
        AnimedataService.getAll().then(
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

      MyAnimeService.create(JSON.stringify(data))
          .then(response => {
              setMessage("Anime added successfully")
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
          <div className={(submitted ? "ui green message ani":"ani")}><p className="m-p">{message}</p></div>
        {props.currentUser? (
          <section>
              <header className="t-header ">
                <div className="col"><strong>Name</strong></div>
                <div className="col"></div>
                <div className="col"><strong>Genre</strong></div>
                <div className="col"><strong>Rating</strong></div>
                <div className="col"></div>
              </header>
              {content && content.sort((el1,el2) => el2.score.toString().localeCompare(el1.score.toString(), undefined, {numeric: true})).map((res, index) =>
                <div className="row my-3 mx-1">
                  <div className="col">{res.title}</div>
                  <div className="col"><img src={res.image} width={200} height={230}/></div>
                  <div className="col">{res.genre}</div>
                  <div className="col">{res.score}</div>
                  <div className="col">
                    <div className="ui animated button" onClick={() => handleAdd(res)}tabIndex="0">
                      <div className="visible content">Add anime</div>
                      <div className="hidden content">
                        <i className="right arrow icon"></i>
                      </div>
                    </div>
                  </div>
                </div>
              )}
          </section>
        ):( 
          <div>
          <h1><center>Please login to access media</center></h1>
          <center><img src={'https://t3.ftcdn.net/jpg/04/87/16/34/360_F_487163480_u4q13pQTIIbcVbolPiHKZFFlkfVrnVP3.jpg'}/> </center>
          </div>
        )}
      </div>
    );
};

export default Home;