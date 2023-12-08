import React from "react";
import Header from "../header/Header";
// eslint-disable-next-line
import Login from "../login/Login";

const Home = () => {

  const name = localStorage.getItem("username");
  const token = localStorage.getItem("app_token");
  console.log(name);
  return (
    <div>
      {token ? (
        <>
          <Header />
          <h2>Welcome {name} !</h2>
          <h2>You have successfully logged into Enterprise Provisioning portal.</h2>
        </>
      ) : (
        // eslint-disable-next-line
        <Login />
      )}
    </div>
  );
};

export default Home;
