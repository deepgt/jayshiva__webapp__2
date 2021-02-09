import "./App.css";
import Login from "./component/login/Login";
import Register from "./component/register/Register";
import Home from "./component/Home/Home";
import Profile from "./component/profile/Profile";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./component/PrivateRoute/PrivateRoute";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
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
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
