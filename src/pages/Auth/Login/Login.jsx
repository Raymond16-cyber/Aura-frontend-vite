import React from "react";
import Header from "../../../components/auth/Common/Header";
import { LoginBody, LoginFooter } from "../../../components/auth/LoginSections";

const Login = () => {
  return (
    <div className="w-full h-screen flex flex-col bg-gradient-to-r from-purple-100 via-blue-200 to-aliceblue-100">
      {/* <Header /> */}
      <LoginBody />
      {/* <LoginFooter /> */}
    </div>
  );
};

export default Login;
