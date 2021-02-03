import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

import Navbar from "../Navbar";
import PostCard from "../PostCard";
import "./index.css";

const SavedPost = (props) => {
  const { token } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/savedPost`,
        {
          headers: {
            token: token,
          },
        }
      );
      console.log(data.posts);
      if (data.error) alert(data.error);
      if (data.posts) setPosts(data.posts);
    };
    fetchPosts();
  }, [token, props.match.params.id]);
  return (
    <div className="savedpost__container">
      <Navbar />
      <div className="savedpost__main">
        {posts ? (
          <>
            {posts.map((post) => (
              <PostCard
                title={post.title}
                description={post.resource}
                date={new Date(post.createdAt).toLocaleString()}
                tags={post.tags}
                author={post.author}
                image={post.image}
                links={post.links}
                userId={post.userId}
                id={post._id}
                saved={post.saved}
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

export default SavedPost;
