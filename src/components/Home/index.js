import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

import Navbar from "../Navbar";
import PostCard from "../PostCard";
import RightPanel from "../RightPanel";

import "./index.css";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { user, token } = useContext(AuthContext);

  useEffect(async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/posts`, {
      headers: { token: token },
    });
    if (data.error) setPosts(data.error);
    if (data.posts) setPosts(data.posts);
    console.log(data.posts);
  }, [token]);

  return (
    <div className="home__container">
      <Navbar />
      <div className="home__main">
        <div className="home__section">
          {posts
            ? posts.error
              ? posts
              : posts.map((post) => (
                  <>
                    <PostCard
                      title={post.title}
                      description={post.resource}
                      date={new Date(post.createdAt).toLocaleString()}
                      tags={post.tags}
                      author={post.author}
                      image={post.image}
                      comments={post.comments}
                      upvotes={post.upvotes}
                    />
                    <PostCard
                      title={post.title}
                      description={post.resource}
                      date={new Date(post.createdAt).toLocaleString()}
                      tags={post.tags}
                      author={post.author}
                      image={post.image}
                      comments={post.comments}
                      upvotes={post.upvotes}
                    />
                  </>
                ))
            : "Loading..."}
        </div>
        <RightPanel />
      </div>
    </div>
  );
};

export default Home;
