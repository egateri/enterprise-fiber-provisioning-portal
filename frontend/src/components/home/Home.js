import React from "react";
import GuestLayout from "../GuestLayout";
import DefaultLayout from "../DefaultLayout";

const Home = () => {
  const token = localStorage.getItem("app_token");

  return <>{token ? <DefaultLayout /> : <GuestLayout />}</>;
};

export default Home;
