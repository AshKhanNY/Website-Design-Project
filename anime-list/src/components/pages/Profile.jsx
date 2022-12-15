import React from "react";
import AuthService from "../services/auth.service";
import { Avatar, Badge, Button, List } from 'antd';


const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {<div>
          <center>
      <Avatar size={150} src={'https://st2.depositphotos.com/1104517/11965/v/950/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg'} />
      <h3>
          <strong>{currentUser.username}</strong> Profile
          </h3>
          <h3>
          Email: {currentUser.email} 
          </h3>
      <Button type="primary">Edit Profile</Button>
      </center>
      <img src={'https://t3.ftcdn.net/jpg/03/67/35/72/360_F_367357209_BG07SVnnB4HSHSaMiHajfZhrZZAE859A.jpg'}/>
    </div>}
      </div>

  );
  };

  export default Profile;

  