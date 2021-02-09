import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import "./Login.css";
import PersonIcon from "@material-ui/icons/Person";
import LockIcon from "@material-ui/icons/Lock";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import { useAuth } from "./../../contexts/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(email, password);
      history.push("/profile");
    } catch {
      setError("Failed to login");
    }

    setLoading(false);
  };

  return (
    <div className="main__container">
      <div className="bg-layer">
        <h1>Login</h1>
        {/* 728x90 */}
        <div className="header__main">
          <div className="main__icon">
            <span className="fa fa-eercast">Jayshiva</span>
          </div>
          <div className="header__leftbottom">
            <form action="/login" method="post" onSubmit={handleSubmit}>
              <div className="icon1">
                <span className="fa fa-user">
                  <PersonIcon />
                </span>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="icon1">
                <span className="fa fa-lock">
                  <LockIcon />
                </span>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="login__check">
                <label className="checkbox">
                  <input type="checkbox" name="checkbox" />
                  keep me logged in
                </label>
              </div>
              <div className="bottom">
                <button className="btn">Log In</button>
              </div>
              <div className="link">
                <p>
                  <a href="#">Forget Password?</a>
                </p>
                <p>
                  <Link to="/register">
                    <a>New User? Register</a>
                  </Link>
                </p>
              </div>
            </form>
          </div>
          <div className="social">
            <ul>
              <li className="loginText">or login using:</li>
              <li>
                <a class="facebook" href="#">
                  <span className="fa fa-facebook">
                    <FacebookIcon />
                  </span>
                </a>
              </li>
              <li>
                <a class="twitter" href="#">
                  <span className="fa fa-twitter">
                    <TwitterIcon />
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
