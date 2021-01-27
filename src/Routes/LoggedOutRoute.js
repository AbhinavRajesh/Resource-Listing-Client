import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const LoggedInRoute = ({ component: RouteComponent, ...rest }) => {
  const { token } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !!token ? <Redirect to={"/"} /> : <RouteComponent {...routeProps} />
      }
    />
  );
};

export default LoggedInRoute;
