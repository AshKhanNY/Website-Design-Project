import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import AnimedataService from "../services/AnimedataService";
import Table from "rc-table";
import { Button } from "antd";



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
              <header className="t-header ">
                <div className="col"><strong>Name</strong></div>
                <div className="col"></div>
                <div className="col"><strong>Genre</strong></div>
                <div className="col"><strong>Rating</strong></div>
                <div className="col"></div>
              </header>
              {content && content.map((res, i) =>
                <div className="row my-3 mx-1">
                  <div className="col">{res.title}</div>
                  <div className="col"><img src={res.image} width={200} height={230}/></div>
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
          <h1>Please login to access media</h1>
        )}
      </div>
    );
};

export default Home;