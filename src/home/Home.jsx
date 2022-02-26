import React from "react";
import LoginForm from "../authentication/LoginForm";
import Panel from "../seller/Panel";


const Home = () => {

  return (
    <>
      {window.localStorage.getItem("idToken") ? (
        <Panel />
      ) : (
        <LoginForm />
      )}
    </>
  );
};

export default Home;
