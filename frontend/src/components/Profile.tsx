import React from "react";
import { getCurrentUser } from "../services/auth.service";

const Profile = () => {
  const currentUser = getCurrentUser();

  return (
    <div className="container">
      <div className="card card-container">
        <img
          data-testid="profile-image"
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        <header className="jumbotron">
          <h3>
            <strong data-testid="profile-email">{currentUser['email']}</strong> Profile
          </h3>
        </header>
        <p>
          <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p>
      </div>
    </div>
  );
}

export default Profile;
