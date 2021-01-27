import { useState, useEffect, createContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState({});

  const URL = "http://localhost:5000/auth/user";
  useEffect(() => {
    const newToken = localStorage.getItem("token");
    if (newToken) setToken(newToken);
    axios
      .get(URL, {
        headers: {
          token: token,
        },
      })
      .then(({ data }) => setUser(data.user.user))
      .catch((err) => console.log(err));
  }, [token]);

  const updateToken = (tok) => {
    setToken(tok);
    console.log(user);
    localStorage.setItem("token", tok);
  };

  return (
    <AuthContext.Provider
      value={{ token, setToken, user, setUser, updateToken }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
