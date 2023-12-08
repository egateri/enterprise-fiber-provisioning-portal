import React from "react";
import Header from "../header/Header";
const Logout = () => {
    
  localStorage.removeItem("username");
  localStorage.removeItem("app_token");

  return (
    <div>
         <Header />
      <h2>successfully logged out!</h2>
    </div>
  );
};

export default Logout;
