import { useState } from "react";
import { Link} from "react-router-dom";
import Home from "../home/Home";
import axios from "axios";
const Login =() => {
  
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [values, setValues] = useState({ email: "",password: "" });


  const handleInput = (event) => {

    setValues((prev) => ({...prev, [event.target.name]: event.target.value}));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  
    axios
      .post(process.env.REACT_APP_BACKEND_URL+"/v1/users/login", values,{ Headers: {"Content-Type": "application/json; charset=utf-8", }})
      .then((res) => {

        
        if (res?.status ===200) {
          localStorage.setItem("app_token",res?.data?.body?.token);
          localStorage.setItem("username",res?.data?.body?.first_name);
          localStorage.setItem("email",res?.data?.body?.email);
          setSuccess(true);
        
           } 
      
      })
      .catch((error) => {
        console.log(error);
        if(error.response?.status === 400){
          setErrorMessage("All inputs required");

        }

        else if (error.response?.status === 404){
          setErrorMessage("User does not exists");

        }
        else if (error.response?.status === 500){
          setErrorMessage("Internal server error");

        }
        else if (error.response?.status === 401){
          setErrorMessage("Email or Password does not match");

        }
        else{
          setErrorMessage("other errors");
        }
        
      }
      );
  };
  return (
    <div>
      {success?
      <Home />:(
        <div>
    
      
      <div className="d-flex justify-content-center align-items-center bg-white vh-100">
     
        <div className="bg-white p-3 rounded">
          <h2>Login:</h2>
          <form action="" method="" autoComplete="off" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="email" placeholder="Enter Email"
                onChange={handleInput}
                name="email"
                className="form-control rounded-0 "
                autocomplete="off"
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
                required
              />
            </div>
            <button type="submit" className="btn btn-success w-100 rounded-0">
              <strong>Login</strong>
            </button>
            {errorMessage?
            
              <div className="alert alert-danger p-2 mb-2 mt-2" > {errorMessage}</div>
              :
              <div></div>
            }
            
            <div className="p-5 mb-2 mt-2">
            <p>Don't have an account? Register below</p>
            <Link
              to="/register"
              className="btn btn-default border rounded-0 bg-light w-100 text-decoration-none"
            >
              <strong>Register</strong>
            </Link>
            </div>
          </form>
        </div>
      </div>
      </div>
)}
    </div>
  );
}

export default Login;