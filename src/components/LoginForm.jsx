import { useEffect, useRef, useState } from "react";
import Fade from "react-reveal/Fade";
import { authentication } from "../firebase";
import { TailSpin } from "react-loader-spinner";
import { useForm } from "react-hook-form";
import FormValidation from "../validators/form";
import { useNavigate } from "react-router-dom";

function LoginForm({ setLoginState }) {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [loginMessage, setLoginMessage] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const signIn = async (data) => {
    setIsLoggingIn(true);

    const authPromise = authentication.signInWithEmailAndPassword(
      data.email,
      data.password
    );

    authPromise
      .then((authUser) => {
        setLoginMessage("");
        navigate("/home");
      })
      .catch((error) => {
        setLoginMessage(error.message);
      })
      .finally(() => {
        setIsLoggingIn(false);
      });
  };

  const hasText = (e) => {
    const container = e.target.parentElement;

    const className = '[&>label]:top-4 [&>label]:text-xs'.split(" ")
    e.target.value !== "" ? container.classList.add(...className) : container.classList.remove(...className)
  };

  return (
    <div className="login-modal lg:pt-[5%] relative max-w-[450px] rounded-md mx-auto z-10">
      <div className="login-modal__content bg-black p-16  bg-opacity-80 ">
        <h1 className="text-4xl text-white font-normal mb-8">Sign In</h1>

        <Fade bottom cascade>
          {loginMessage && (
            <p className="errors text-white bg-orange rounded-md p-4 -mt-3 text-sm mb-4 font-light">
              {loginMessage}
            </p>
          )}

          <form noValidate onSubmit={handleSubmit(signIn)}>
            <div className="input-container h-full relative mb-4">
              <input
                name="email"
                type="email"
                onFocus={(e) => hasText(e)}
                autoFocus 
                className={`w-full peer pt-3 pl-4 h-[60px] bg-gray text-white text-sm rounded-md border-b-2 border-transparent ${
                  errors.email ? " border-orange" : ""
                }`}
                {...register("email", {
                  onChange: (e) => {
                      hasText(e)
                      trigger('email')
                  },
                  validate: {
                    required: (value) => FormValidation.required(value),
                    maxLength: (value) => FormValidation.maxLength(value, 200),
                    minLength: (value) => FormValidation.minLength(value, 2),
                    validEmail: (value) => FormValidation.validEmail(value),
                  },
                })}
              />

              <label
                htmlFor=""
                className="absolute peer-focus:top-4 active:top-4 peer-focus:text-xs active:text-xs transition-transform duration-500 left-4 text-light-gray top-[50%] translate-y-[-50%]"
              >
                Email
              </label>
            </div>

            {errors.email && (
              <p className="errors text-orange -mt-3 text-sm mb-4 font-light">
                {errors.email.message}
              </p>
            )}

            <div className="input-container h-full relative mb-4">
              <input
                type="password"
                onFocus={(e) => hasText(e)}
                ref={passwordRef}
                className={`w-full peer pt-3 pl-4 h-[60px] bg-gray text-white text-sm rounded-md border-b-2 border-transparent ${
                  errors.password ? " border-orange" : ""
                }`}
                {...register("password", {
                  onChange: (e) => {
                      hasText(e)
                      trigger('password')
                  },
                  validate: {
                    required: (value) => FormValidation.required(value),
                    between: (value) => FormValidation.between(value, 6, 20),
                  },
                })}
              />

              <label
                htmlFor=""
                className="absolute peer-focus:top-4 active:top-4 peer-focus:text-xs active:text-xs transition-transform duration-500 left-4 text-light-gray top-[50%] translate-y-[-50%]"
              >
                Password
              </label>
            </div>

            {errors.password && (
              <p className="errors text-orange -mt-3 text-sm mb-4 font-light">
                {errors.password.message}
              </p>
            )}

            <button
              className="w-full bg-red hover:shadow-lg text-white rounded-md mt-8 font-medium py-3 px-4 mb-3 hover:bg-opacity-60 flex justify-center items-center text-center"
              type="submit"
            >
              {isLoggingIn ? (
                <TailSpin
                  height="25"
                  width="25"
                  color="#f6cfd1"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperclassName="flex justify-center items-center"
                  visible={true}
                />
              ) : (
                "Sign In"
              )}
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
          <button className="font-bold" onClick={() => navigate("/signup")}>
            Sign up now.
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
