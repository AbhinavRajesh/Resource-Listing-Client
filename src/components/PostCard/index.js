import "./index.css";

const PostCard = ({
  title,
  description,
  date,
  tags,
  author,
  image,
  upvotes,
}) => {
  return (
    <div className="postcard__container">
      <div className="postcard__upvotes">
        <p>{upvotes}</p>
      </div>
      <div className="postcard__main">
        <div className="postcard__top">
          <div className="postcard__left">
            <img src={image} alt={`${author}'s DP'`} />
            <h2>{title}</h2>
          </div>
          <div className="postcard__right">
            <p>{author}</p>
            <p>{date}</p>
          </div>
        </div>
        <div className="postcard__mid">
          <p>{description}</p>
        </div>
        <div className="postcard__footer">
          {tags.map((tag) => (
            <p>{tag}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
