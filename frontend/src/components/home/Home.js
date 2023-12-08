import React from "react";
import Header from "../header/Header";

const Home = () => {
   
  const name = localStorage.getItem("username");
//   const token = localStorage.getItem("app_token");
  
 
  return (
    <div>
      <Header />

      <h2>Welcome Home:{name}</h2>
    
   
    </div>
  );
};

export default Home;