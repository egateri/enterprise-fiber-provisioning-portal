import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/v1/users/register", values, {
        Headers: { "Content-Type": "application/json; charset=utf-8" },
      })
      .then((res) => {
        if (res?.status === 201) {
          localStorage.setItem("app_token", res?.data?.body?.token);
          localStorage.setItem("username", res?.data?.body?.first_name);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
        if (error?.response?.status === 400) {
          setErrorMessage("All inputs are required");
        } else if (error?.response?.status === 409) {
          setErrorMessage("user already exists");
        } else if (error?.response?.status === 500) {
          setErrorMessage("Internal server error");
        } else {
          setErrorMessage("other Errors");
        }
      });
  };
  return (
    <div>
      <div className="d-flex justify-content-center align-items-center bg-white vh-100">
        <div className="bg-white p-3 rounded">
          <h2>Sign Up:</h2>
          <form action="" method="" autoComplete="off" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="first_name">
                <strong>First Name</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Name"
                onChange={handleInput}
                name="first_name"
                className="form-control rounded-0 "
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="last_name">
                <strong>Last Name</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Name"
                onChange={handleInput}
                name="last_name"
                className="form-control rounded-0 "
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                onChange={handleInput}
                name="email"
                className="form-control rounded-0 "
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                placeholder="Enter password"
                onChange={handleInput}
                name="password"
                className="form-control rounded-0 "
              />
            </div>
            <button type="submit" className="btn btn-success w-100 rounded-0">
              <strong>Sign Up</strong>
            </button>

            {errorMessage ? (
              <div className="alert alert-danger p-2 mb-2 mt-2">
                {" "}
                {errorMessage}
              </div>
            ) : (
              <div></div>
            )}
            <div className="p-5 mb-2 mt-2">
              <p>Already have an account? Login below</p>
              <Link
                to="/"
                className="btn btn-default border rounded-0 bg-light w-100"
              >
                <strong>Login</strong>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
