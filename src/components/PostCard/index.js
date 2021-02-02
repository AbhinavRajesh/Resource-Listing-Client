import Microlink from "@microlink/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./index.css";

const PostCard = ({
  title,
  description,
  date,
  tags,
  author,
  image,
  userId,
  links,
}) => {
  const [resourceUpdated, setResourceUpdated] = useState("");
  useEffect(() => {
    // let parts = description.split(
    //   /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi
    // );
    let parts = description.split(
      /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#%?=~_|!:,.;]*[-A-Z0-9+&@#%=~_|])/gi
    );
    parts = parts.filter((part) => part !== "https");
    for (let i = 1; i < parts.length; i += 2)
      parts[i] = (
        <a href={parts[i]} target="_blank" rel="noreferrer">
          {parts[i]}
        </a>
      );
    setResourceUpdated(parts);
  }, [description]);

  const randomColorCode = () => `hsla(${Math.random() * 360}, 100%, 85%, 1)`;
  return (
    <div className="postcard__container">
      <div className="postcard__main">
        <div className="postcard__top">
          <div className="postcard__left">
            <Link to={`/account/${userId}`}>
              <img src={image} alt={`${author}'s DP'`} />
            </Link>
            <div className="postcard__right">
              <div className="postcard__righttop">
                <h2>{title}</h2>
              </div>
              <div className="postcard__rightbottom">
                <Link to={`/account/${userId}`}>{author}</Link>
                <p>{date}</p>
              </div>
            </div>
          </div>
          <div className="postcard__tags">
            {tags.map((tag) => (
              <>
                <span style={{ backgroundColor: randomColorCode() }}>
                  {tag}
                </span>
              </>
            ))}
          </div>
        </div>
        <div className="postcard__mid">
          <p>{resourceUpdated}</p>
        </div>
        {links && (
          <div className="postcard__links">
            {links.map((link) => (
              <Microlink url={link} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
