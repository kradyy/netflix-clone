import { useEffect, useRef, useState } from "react";
import Fade from "react-reveal/Fade";
import { authentication } from "../firebase";
import toast, { Toaster } from "react-hot-toast";

function LoginModal() {
  // Move this to a new modal
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const register = (e) => {
    e.preventDefault();

    const myPromise = authentication.createUserWithEmailAndPassword(
      emailRef.current.value,
      passwordRef.current.value
    );

    toast.promise(myPromise, {
      loading: "Creating account ... ",
      success: "Account created!",
      error: (error) => error.message,
    });

    // .then((ret) => {})
    // .catch((error) => toast.error(error.message, { id: "error-signup" }));
  };

  const signIn = (e) => {
    e.preventDefault();

    // Testa
    const myPromise = authentication.signInWithEmailAndPassword(
      emailRef.current.value,
      passwordRef.current.value
    );

    toast.promise(
      myPromise,
      {
        loading: "Logging in ...",
        success: (authUser) => {
          console.log("authUser", authUser);
          return "Successfully logged in!";
        },
        error: (error) => {
          return error.message;
        },
      },
      { id: "login" }
    );
  };

  return (
    // dont trigger form on submit
    <div className="login-modal bg-black bg-opacity-80 relative max-w-[450px] rounded-md p-16 mx-auto z-10">
      <Toaster />

      <div className="login-modal__content">
        <h1 className="text-4xl text-white font-normal mb-8">Sign In</h1>

        <Fade bottom cascade>
          <form onSubmit={signIn}>
            <input
              type="email"
              placeholder="Email or phone number"
              ref={emailRef}
              className="w-full bg-gray text-white text-sm py-5 px-4 placeholder:text-light-gray mb-4 rounded-md"
            />
            <input
              type="password"
              placeholder="Password"
              ref={passwordRef}
              className="w-full bg-gray text-white text-sm py-5 px-4 placeholder:text-light-gray mb-4 rounded-md"
            />

            <button
              className="w-full bg-red hover:shadow-lg text-white rounded-md mt-8 font-medium py-3 px-4 mb-3"
              type="submit"
            >
              Sign In
            </button>

            <div className="flex flex-row justify-between align-center">
              <div className="remember">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="form-checkbox"
                />
                <label
                  className="text-light-gray font-light cursor-pointer ml-2"
                  htmlFor="rememberMe"
                >
                  Remember me
                </label>
              </div>

              <div className="need-help">
                <a
                  href="#help"
                  className="text-light-gray no-underline font-lig"
                >
                  Need help?
                </a>
              </div>
            </div>
          </form>
        </Fade>
        <div className="text-center text-light-gray font-light mt-16">
          <span className="text-light-gray">New to Netflix? </span>
          <span className="font-bold">Sign up now.</span>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
