import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./LoginForm.css";

function LoginForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ email, password })).catch(
      async (res) => {
        let data;
        try {
          // .clone() essentially allows you to read the response body twice
          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if, e.g., server is down
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      }
    );
  };

  function demoLogin() {
    return dispatch(
      sessionActions.login({
        email: "mudassar-memon@test.test",
        password: "password",
      })
    );
  }

  return (
    <div className="loginFormContainer">
      <form id="login" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>

        <div className="inputContainer">
          <div className="emailContainer">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>

          <div className="passwordContainer">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            {/* <div id="eye">
              <FontAwesomeIcon icon={faEyeSlash} />
            </div> */}
          </div>
        </div>

        <div className="loginButtonContainer">
          <input type="submit" value="Log In"></input>
        </div>

        <div className="demoUserContainer">
          <p onClick={demoLogin}>Demo User</p>
        </div>

        <div className="line"></div>
      </form>
    </div>
  );
}

export default LoginForm;
