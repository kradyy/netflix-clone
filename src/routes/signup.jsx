import React from "react";
import SignupForm from "../components/SignupForm";
import Navbar from "../components/Navbar";

function Signup() {
  return (
    <div
      className="bg-white h-screen bg-no-repeat bg-cover bg-center">
      <Navbar navclassName="flex items-center justify-between py-6 px-6 bg-white border-b-[1px] border-lighter-gray" btnLoginclassName="btn bg-white font-medium text-black text-xl" hideMenu={true} />

      <SignupForm />

    </div>
  );
}

export default Signup;
