import React from "react";
import Background from "../images/background.png";
import Navbar from "../components/Navbar";
import {
    useNavigate
  } from "react-router-dom";
  
function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      className="bg-dark h-screen bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <Navbar navclassName="flex items-center justify-between py-6 px-4 bg-black" />

        <div className="flex flex-col items-center justify-center h-full relative z-10">
            <h1 className="text-7xl text-white text-center font-normal">Lost your way?</h1>
            <p className="font-extralight text-2xl my-10 text-white text-center lg:max-w-[70%]">Sorry, we can't find that page. You'll find loads to explore on the home page.</p>

            <button className="bg-white text-black py-2 font-normal text-lg px-6 hover:bg-opacity-90 rounded-sm" onClick={() => navigate("/")}>
                Netflix home
            </button>

            <div className="error-code mt-10 py-3 space-x-2 border-l-2 border-red text-3xl text-white">
                <span className="font-thin ml-4">Error Code</span>
                <span className="font-medium text-white">NSES-404</span>
            </div>
            
        </div>
    
      <div className="backdrop bg-dark bg-opacity-70 h-screen w-full absolute top-0 left-0 z-[1]" />
    </div>
  );
}

export default NotFound;
