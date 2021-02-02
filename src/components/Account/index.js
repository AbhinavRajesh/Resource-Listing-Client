import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

import Navbar from "../Navbar";
import PostCard from "../PostCard";
import "./index.css";

const Account = (props) => {
  const { token } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [account, setAccount] = useState();
  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/account/${props.match.params.id}`,
        {
          headers: {
            token: token,
          },
        }
      );
      if (data.error) alert(data.error);
      if (data.user) setAccount(data.user);
      if (data.posts) setPosts(data.posts);
    };
    fetchPosts();
  }, [token, props.match.params.id]);

  return (
    <div className="profile__container">
      <Navbar />
      {console.log(account)}
      <div className="profile__main">
        {account ? (
          <>
            <div className="profile__section">
              <div className="profile__left">
                <img src={account.image} alt={account.displayName} />
              </div>
              <form className="profile__right">
                <div className="form__block">
                  <label htmlFor="displayName">Display Name:</label>
                  <input
                    type="text"
                    id="displayName"
                    value={account.displayName}
                    contentEditable="false"
                  />
                </div>
                <div className="form__block">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="text"
                    id="email"
                    value={account.email}
                    contentEditable="false"
                  />
                </div>
                <div className="profile__posts">
                  <h3>Posts:</h3>
                  <p>{account.posts?.length}</p>
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
          </>
        ) : (
          <h3>
            User does not exist! Either the user deleted the account or try
            again later!
          </h3>
        )}
      </div>
    </div>
  );
};

export default Account;
