import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import Table from "rc-table";
import { Button } from "antd";

const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
        dataIndex: "rating",
        key: "rating",
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
    const [content, setContent] = useState("");

    useEffect(() => {
        UserService.getPublicContent().then(
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
        <div className="animetable">
    <Table
      columns={columns}
      data={data}
      tableLayout="auto"/>
      </div>
    );
};

export default Home;