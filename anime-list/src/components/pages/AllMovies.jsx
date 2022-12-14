import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import MoviedataService from "../services/MoviedataService";
import Table from "rc-table";
import { Button } from "antd";



const AllMovies = (props) => {
    const [content, setContent] = useState([]);

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

    return(
      <div>
        {props.currentUser? (
          <section>
              <header className="t-header ">
                <div className="col"><strong>Name</strong></div>
                <div className="col"><strong>Year</strong></div>
                <div className="col"></div>
                <div className="col"><strong>Genre</strong></div>
                <div className="col"><strong>Rating</strong></div>
                <div className="col"></div>
              </header>
              {content && content.map((res, i) =>
                <div className="row my-3 mx-1">
                  <div className="col">{res.title}</div>
                  <div className="col">{res.year}</div>
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
          <h3>Please login to access media</h3>
        )}
      </div>
    );
};

export default AllMovies;