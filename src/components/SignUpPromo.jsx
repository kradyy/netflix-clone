import React from "react";

function SignUpPromo({ setLoginState }) {
  return (
    <div className="promo w-full fixed h-screen z-10 top-0 flex items-center">
      <div className="container promo_inner">
        <h1 className="text-6xl text-white my-4 font-medium">
          See what's next.
        </h1>
        <p className="uppercase text-white font-light text-2xl">
          Watch anywhere. cancel anytime.
        </p>
        <button
          className="bg-red text-white font-normal hover:shadow-xl duration-500 transition-all text-xl py-3 px-6 rounded-md mt-8"
          onClick={() => setLoginState("signup")}
        >
          Try now! <strong>Watch Free For 30 Days</strong>
        </button>
      </div>
    </div>
  );
}

export default SignUpPromo;
