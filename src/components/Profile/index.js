import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

import Navbar from "../Navbar";
import PostCard from "../PostCard";
import "./index.css";

const Profile = (props) => {
  const { user, token, updateToken } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  useEffect(async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/user/posts`,
      {
        headers: {
          token: token,
        },
      }
    );
    if (data.error) alert(data.error);
    if (data.posts) setPosts(data.posts);
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    updateToken("");
    props.history.push("/auth");
  };
  return (
    <div className="profile__container">
      <Navbar />
      <div className="profile__main">
        <div className="profile__section">
          <div className="profile__left">
            <img src={user.image} alt={user.displayName} />
            <div className="logout">
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
          <form className="profile__right">
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
            <div className="profile__posts">
              <h3>Posts:</h3>
              <p>{user.posts?.length}</p>
            </div>
          </form>
        </div>
        {posts.map((post) => (
          <PostCard
            title={post.title}
            description={post.resource}
            date={new Date(post.createdAt).toLocaleString()}
            tags={post.tags}
            author={post.author}
            image={post.image}
            comments={post.comments}
            upvotes={post.upvotes}
            links={post.links}
            userId={post.userId}
          />
        ))}
      </div>
    </div>
  );
};

export default Profile;
