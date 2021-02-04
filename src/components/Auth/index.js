import { useState, useEffect, useContext } from "react";
import axios from "axios";
import queryString from "query-string";

import { AuthContext } from "../../Context/AuthContext";

import "./index.css";

const Auth = (props) => {
  const [isSignup, setIsSignup] = useState(false);
  const { updateToken, token } = useContext(AuthContext);

  const GOOGLE_SIGNIN_URL =
    "http://resource-listing.azurewebsites.net/auth/google";
  const EMAIL_AUTH_URL = "http://resource-listing.azurewebsites.net/auth";

  useEffect(() => {
    console.log(props.location);
    const { token, error } = queryString.parse(props.location.search);
    if (token) {
      updateToken(token);
      props.history.push("/");
    }
    if (error) alert(error);
  }, [props.location, props.history, updateToken]);

  const toggleSignUp = () => {
    setIsSignup((prev) => (prev = !prev));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.target.length === 3) {
      //LOGIN
      let loginDetails = {
        email: e.target[0].value,
        password: e.target[1].value,
      };
      console.log(loginDetails);
      const { data } = await axios.post(
        `${EMAIL_AUTH_URL}/email/login`,
        loginDetails
      );
      if (data.token) updateToken(data.token);
      if (data.error) alert(data.error);
    } else {
      // SIGNUP
      if (e.target[3].value !== e.target[4].value) {
        alert("Password and Confirm Password Do Not Match");
      } else {
        let SignupDetails = {
          displayName: `${e.target[0].value} ${e.target[1].value}`,
          image: `https://ui-avatars.com/api/?name=${e.target[0].value}+${e.target[1].value}`,
          firstName: e.target[0].value,
          lastName: e.target[1].value,
          email: e.target[2].value,
          password: e.target[3].value,
          cpassword: e.target[4].value,
        };
        console.log(SignupDetails);
        const { data } = await axios.post(
          `${EMAIL_AUTH_URL}/email/signup`,
          SignupDetails
        );
        if (data.token) updateToken(data.token);
        if (data.error) alert(data.error);
      }
    }
    console.log(token);
  };

  return (
    <div className="auth__container">
      <form className="auth__form" onSubmit={handleSubmit}>
        <h1>Aspire</h1>
        {isSignup && (
          <>
            <div className="auth__formSameBlock">
              <div className="auth__formBlock">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter First Name"
                  required
                  autoFocus
                />
              </div>
              <div className="auth__formBlock">
                <label htmlFor="LastName">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter Last Name"
                  required
                />
              </div>
            </div>
          </>
        )}
        <div className="auth__formBlock">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" placeholder="Enter Email" required />
        </div>
        <div className="auth__formBlock">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            required
          />
        </div>
        {isSignup && (
          <div className="auth__formBlock">
            <label htmlFor="cpassword">Confirm Password</label>
            <input
              type="password"
              name="cpassword"
              placeholder="Confirm Password"
              required
            />
          </div>
        )}
        <input type="submit" value={isSignup ? "Sign Up" : "Login"} />
        <p onClick={toggleSignUp}>
          {isSignup ? "Already Have an Account?" : "Don't Have an Account?"}
        </p>
        <h6>Or</h6>
        <a href={GOOGLE_SIGNIN_URL} className="auth__googleSignin">
          <i className="fab fa-google"></i>Signin With Google
        </a>
      </form>
    </div>
  );
};

export default Auth;
