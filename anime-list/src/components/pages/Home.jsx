import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import AnimedataService from "../services/AnimedataService";
import Table from "rc-table";
import { Button } from "antd";

const columns = [
    {
      title: "Name",
      dataIndex: "title",
      key: "title",
      width: 100,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: 150,
    },
    {
        title: "Genre",
        dataIndex: "genre",
        key: "genre",
        width: 100,
      },
      {
        title: "Rating",
        dataIndex: "score",
        key: "score",
        width: 100,
      },
      {
        dataIndex: "button",
        key: "button",
        width:100,
      },
  ];
  const data = [
    {
      name: "Naturo",
      image: <img
      src={'https://static.wikia.nocookie.net/naruto/images/d/d6/Naruto_Part_I.png/revision/latest/scale-to-width-down/1200?cb=20210223094656'}
      width={60}
    />,
      genre: "Shonen",
      key: "1",
      rating: "10",
      button: <Button> add</Button>
    },
  ];

const Home = (props) => {
    const [content, setContent] = useState([]);

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

    return(
      <div>
        {props.currentUser? (
          <section>
              <header className="t-header">
                <div className="col">Name</div>
                <div className="col">Image</div>
                <div className="col">Genre</div>
                <div className="col">Rating</div>
                <div className="col"></div>
              </header>
              {content && content.map((res, i) =>
                <div className="row">
                  <div className="col">{res.title}</div>
                  <div className="col"><img src={`${res.image}`} width={60}/></div>
                  <div className="col">{res.genre}</div>
                  <div className="col">{res.score}</div>
                  <div className="col">
                    <div class="ui animated button" tabindex="0">
                      <div class="visible content">Add anime</div>
                      <div class="hidden content">
                        <i class="right arrow icon"></i>
                      </div>
                    </div>
                  </div>
                </div>
              )}
          </section>
        ):(
          <h1>UNAUTHORIZED ACCESS</h1>
        )}
      </div>
    );
};

export default Home;