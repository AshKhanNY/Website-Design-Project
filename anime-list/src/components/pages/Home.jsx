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

const Home = () => {
    const [content, setContent] = useState([]);

    useEffect(() => {
        AnimedataService.getAll().then(
            (response) => {
                setContent(response.data);
                console.log(response);
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
        <div className="animetable">
    <Table
      columns={columns}
      data={content}
      tableLayout="auto"/>
      </div>
    );
};

export default Home;