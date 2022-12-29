import React from "react";
import Navbar from "../components/Navbar";
import { authentication } from '../firebase'
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";

function Profile() {
  const user = useSelector(selectUser);
  
  return (
    <div className="relative h-screen">
      <Navbar navclassName="flex items-center justify-between py-6 px-4" hideMenu={true} />

      <div className="profile flex w-full h-full items-center content-center">
        <div className="profile__container container max-w-[750px] text-white">
          <h2 className="text-white font-light text-5xl">Edit profile</h2>

          <div className="flex gap-4 mt-4 flex-col lg:flex-row">
            <div className="left profile__avatar">
              <img
                src="/static/media/6FgZxbi.8fa3e867398f0437eee3.png"
                alt="User Avatar"
                className="w-20 h-20"
              />
              (Edit pen icon)
            </div>
            <div className="right flex-1 profile__plans">
              <input
                type="text"
                className="p-3 bg-light-gray w-full text-white"
                value={user && user.email}
                disabled
              />

              <h3 className="plans__title mt-3 font-medium text-md">Plans (Current Plan: Premium)</h3>

              <hr className="my-2 h-px bg-white bg-opacity-10 border-0" />

              <p className="font-light">Renewal date: 04/03/2022</p>

              <ul className="profile__packages my-10">
                <li className="package font-light group my-4 lg:px-5 flex justify-between align-center">
                    <div className="name flex flex-col">
                        <span>Netflix standard</span>
                        <span>1080p</span>
                    </div>

                    <button className="bg-red text-white group-hover:bg-opacity-80 px-6 py-2">
                        Package name
                    </button>
                </li>
              </ul>

              <button className="btn text-white mt-auto font-medium bg-red hover:bg-opacity-80 py-2 text-center w-full"
              onClick={() => authentication.signOut()} >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
