import "./App.css";
import Login from "./component/login/Login";
import Register from "./component/register/Register";
import Home from "./component/Home/Home";
import Profile from "./component/profile/Profile";
import {HashRouter} from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./component/PrivateRoute/PrivateRoute";

function App() {
  return (
    <>
      <AuthProvider>
        <HashRouter>
          <Switch>
            <Route path="/login" component={Login} />
              {/* <Login /> */}
            {/* </Route> */}
            <Route path="/register" component={Register}/>
              {/* <Register />
            </Route> */}
            <PrivateRoute  exact path="/profile" component={Profile}/>
              {/* <Profile />
            </Route> */}
            <PrivateRoute exact path="/" component={Home}/>
              {/* <Home />
            </PrivateRoute> */}
          </Switch>
        </HashRouter>
      </AuthProvider>
    </>
  );
}

export default App;
