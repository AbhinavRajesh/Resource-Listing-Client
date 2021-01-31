import { useState, useContext } from "react";
import axios from "axios";

import "./index.css";
import { AuthContext } from "../../Context/AuthContext";

const RightPanel = () => {
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
    }
  };

  return (
    <div className="rightpanel__container">
      <form className="rightpanel__form" onSubmit={handleSubmit}>
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
        <small>{characterLength}/350</small>
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
  );
};

export default RightPanel;
