import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="home__container">
      <h1>{JSON.stringify(user)}</h1>
      <img src={user.image} />
    </div>
  );
};

export default Home;
