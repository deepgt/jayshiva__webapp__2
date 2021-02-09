import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";

import "./Register.css";
import PersonIcon from "@material-ui/icons/Person";
import LockIcon from "@material-ui/icons/Lock";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";

import { useAuth } from "./../../contexts/AuthContext";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== repassword) {
      return setError("password donot match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(email, password);
      history.push("/");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);

    signup(email, password);
  };

  return (
    <div className="main__container">
      <div className="bg-layer">
        <h1>Register</h1>

        {/* 728x90 */}
        <div className="header__main">
          <div className="main__icon">
            <span className="fa">localHo</span>
          </div>
          <div className="header__leftbottom">
            <form action="/register" method="post" onSubmit={handleSubmit}>
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
              <div className="icon1">
                <span className="fa fa-lock">
                  <LockIcon />
                </span>
                <input
                  type="password"
                  placeholder="Re-Password"
                  value={repassword}
                  onChange={(e) => setRepassword(e.target.value)}
                  required
                />
              </div>

              <div className="bottom">
                <button disabled={loading} className="btn">
                  Register
                </button>
              </div>
              <div className="register__orclass">
                <div className="register__line"></div>
                <h3>OR</h3>
                <div className="register__line"></div>
              </div>
              <div className="links">
                <div className="bottom">
                  <button className="btn">
                    continue with
                    <span className="fa register__fa-facebook">
                      <FacebookIcon />
                    </span>
                  </button>
                </div>
                <div className="bottom">
                  <button className="btn">
                    continue with
                    <span className="fa register__fa-twitter">
                      <TwitterIcon />
                    </span>
                  </button>
                </div>
                <p className="register__right">
                  <Link to="/login">
                    <a>Already a User? login</a>
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
