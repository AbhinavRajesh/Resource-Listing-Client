import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

import Navbar from "../Navbar";
import "./index.css";

const Profile = () => {
  const { user, token } = useContext(AuthContext);
  return (
    <div className="profile__container">
      <Navbar />
      <div className="profile__main">
        <div className="profile__section">
          <div className="profile__left">
            <img src={user.image} alt={user.displayName} />
          </div>
          <form className="profile__right">
            <div className="form__block__inline">
              <div className="form__block">
                <label htmlFor="firstName">First Name:</label>
                <input
                  type="text"
                  id="firstName"
                  value={user.firstName}
                  contentEditable="false"
                />
              </div>
              <div className="form__block">
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  value={user.lastName}
                  contentEditable="false"
                />
              </div>
            </div>
            <div className="form__block">
              <label htmlFor="displayName">Display Name:</label>
              <input
                type="text"
                id="displayName"
                value={user.displayName}
                contentEditable="false"
              />
            </div>
            <div className="form__block">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                value={user.email}
                contentEditable="false"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
