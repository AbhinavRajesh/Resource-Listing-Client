import { useState, useContext } from "react";
import axios from "axios";

import Navbar from "../Navbar";
import { AuthContext } from "../../Context/AuthContext";

import "./index.css";

const AddPost = (props) => {
  const { token, updateToken } = useContext(AuthContext);
  const [characterLength, setCharacterLength] = useState(0);
  const handleResourceChange = (e) => setCharacterLength(e.target.value.length);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let newPost = {
      title: e.target[0].value,
      resource: e.target[1].value,
      tags: e.target[2].value.split(" "),
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/post/add`,
      newPost,
      {
        headers: { token: token },
      }
    );
    if (data.error) alert(data.error);
    if (data.token) {
      e.target[0].value = "";
      e.target[1].value = "";
      e.target[2].value = "";
      updateToken(data.token);
      props.history.push("/");
    }
  };
  return (
    <div className="addPost__container">
      <Navbar />
      <div className="addPost__main">
        <form className="addPost__form" onSubmit={handleSubmit}>
          <h3>Add Post</h3>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Add an amazing title for the resource"
            required
          />
          <label htmlFor="resource">Resource</label>
          <textarea
            type="text"
            name="resource"
            placeholder="Share references, books, tutorials, links, etc. "
            rows="9"
            style={{ resize: "none" }}
            maxLength="700"
            onChange={handleResourceChange}
            required
          ></textarea>
          <small>{characterLength}/700</small>
          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            name="tags"
            placeholder="Adding tags would help fellow learners to search and start learning faster"
            required
          />
          <small>
            Add tags seperated by spaces* (Eg. MongoDB Express React Node)
          </small>
          <input type="submit" value="Post Resource" />
        </form>
      </div>
    </div>
  );
};

export default AddPost;
