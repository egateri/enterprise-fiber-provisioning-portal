import React, { useState } from "react";
import "../index.css";
import axios from "axios";
import Home from "../components/home/Home";

function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [values, setValues] = useState({});

  const handleInput = (event) => {
    event.preventDefault();
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/v1/users/login", values, {
        Headers: { "Content-Type": "application/json; charset=utf-8" },
      })
      .then((res) => {
        if (res?.status === 200) {
          localStorage.setItem("app_token", res?.data?.body?.token);
          localStorage.setItem("username", res?.data?.body?.first_name);
          localStorage.setItem("email", res?.data?.body?.email);
          setSuccess(true);
        }
      })
      .catch((error) => {
        if (error.response) {
          setErrorMessage(error.response?.data?.body?.message);
        } else if (error.request) {
          console.log("Error:", error.message);
          setErrorMessage("Internal server error");
        } else {
          setErrorMessage(
            "An error ocurred when processing your request...contact your administrator"
          );
          console.log("Error:", error.message);
        }
      });
  };

  return (
    <>
      {success === true ? (
        <Home />
      ) : (
        <section>
          <div className="form-box">
            <div className="form-value">
              <form onSubmit={handleSubmit} autoComplete="off">
                <h2>Sign in</h2>
                <p id="enttiltle">Enterprise Provisioning Portal</p>
                {errorMessage ? (
                  <div class="alert alert-light"id='errmsg' role="alert">
                    {errorMessage}
                  </div>
                ) : (
                  <div></div>
                )}
                <div className="inputbox">
                  <ion-icon name="mail-outline"></ion-icon>
                  <input
                    onChange={handleInput}
                    className="emailinput"
                    type="email"
                    id="email"
                    name="email"
                    placeholder=""
                    required
                  />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="inputbox">
                  <ion-icon name="lock-closed-outline"></ion-icon>
                  <input
                    onChange={handleInput}
                    className="passinput"
                    type="password"
                    id="password"
                    name="password"
                    placeholder=""
                    required
                  />
                  <label htmlFor="password">Password</label>
                </div>

                <div className="remember">
                  <label htmlFor="">
                    <input id="finput" type="checkbox" name="" />
                    &ensp;Remember me
                  </label>
                </div>
                <button type="submit" className="login-btn">
                  Login
                </button>
                <div className="tesversion">
                  <p>TES Provisioning Portal v1.1</p>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Login;
