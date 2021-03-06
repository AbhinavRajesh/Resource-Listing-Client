import { BrowserRouter, Route, Switch } from "react-router-dom";

import Auth from "./components/Auth";
import Home from "./components/Home";

import { AuthProvider } from "./Context/AuthContext";
import LoggedInRoute from "./Routes/LoggedInRoute";
import LoggedOutRoute from "./Routes/LoggedOutRoute";

import "./App.css";
import Profile from "./components/Profile";
import Account from "./components/Account";
import AddPost from "./components/AddPost";
import SavedPost from "./components/SavedPosts";

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
          <Route path={["/", "/profile"]}>
            <Switch>
              <LoggedInRoute exact path="/" component={Home} />
              <LoggedInRoute exact path="/profile" component={Profile} />
              <LoggedInRoute exact path="/addPost" component={AddPost} />
              <LoggedInRoute exact path="/account/:id" component={Account} />
              <LoggedInRoute exact path="/savedPost" component={SavedPost} />
            </Switch>
          </Route>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
