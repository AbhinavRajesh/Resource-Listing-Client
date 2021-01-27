import { BrowserRouter, Route, Switch } from "react-router-dom";

import Auth from "./components/Auth";
import Home from "./components/Home";

import { AuthProvider } from "./Context/AuthContext";
import LoggedInRoute from "./Routes/LoggedInRoute";
import LoggedOutRoute from "./Routes/LoggedOutRoute";

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <Route path={["/auth"]}>
            <Switch>
              <LoggedOutRoute exact path="/auth" component={Auth} />
            </Switch>
          </Route>
          <Route path={["/"]}>
            <Switch>
              <LoggedInRoute exact path="/" component={Home} />
            </Switch>
          </Route>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
