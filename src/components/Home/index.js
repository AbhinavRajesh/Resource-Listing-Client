import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

import Navbar from "../Navbar";
import PostCard from "../PostCard";
import RightPanel from "../RightPanel";

import "./index.css";

const Home = (props) => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/posts`,
        {
          headers: { token: token },
        }
      );
      if (data.error) setPosts(data.error);
      if (data.posts) setPosts(data.posts);
    };
    fetchPosts();
  }, [token, props.location]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/posts/${search}`,
      {
        headers: {
          token: token,
        },
      }
    );
    console.log("HERE: ", data.error);
    if (data.posts) setPosts(data.posts);
    if (data.error) alert(data.error);
  };

  return (
    <div className="home__container">
      <Navbar handleSearch={handleSearch} setSearch={setSearch} />
      <div className="home__main">
        <div className="home__section">
          {posts
            ? posts.includes("Error")
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
                      links={post.links}
                      userId={post.userId}
                      id={post._id}
                      saved={post.saved}
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
