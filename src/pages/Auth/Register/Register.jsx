import React from "react";
import Header from "../../../components/auth/Common/Header";
import { RegisterBody } from "../../../components/RegisterSections";

const Register = () => {
  return (
    <div className="w-full min-h-screen flex flex-col bg-linear-to-r from-purple-100 via-blue-200 to-gray-100">
      <Header />
      <RegisterBody />
    </div>
  );
};

export default Register;
