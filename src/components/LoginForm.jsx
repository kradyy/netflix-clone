import { useRef, useState } from "react";
import Fade from "react-reveal/Fade";
import { authentication } from "../firebase";
import { TailSpin } from "react-loader-spinner";

import { useForm } from "react-hook-form";
import FormValidation from '../validators/form';

function LoginForm({setLoginState}) {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const [loginMessage, setLoginMessage] = useState("");
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

    const signIn = async (data) => {
      setIsLoggingIn(true);

      const authPromise = authentication.signInWithEmailAndPassword(
        data.email,
        data.password
      );

      authPromise.then((authUser) => {
        setLoginMessage("");
      }).catch((error) => {
        setLoginMessage(error.message);
      }).finally(() => {
        setIsLoggingIn(false);
      })
  }
  
  const validateEmail = (value) => {
    if (!value.includes('@')) {
      return 'Please enter a valid email address';
    }
  }

  console.log('errors :>> ', errors);
  return (
    <div className="login-modal lg:pt-[5%] relative max-w-[450px] rounded-md mx-auto z-10">

      <div className="login-modal__content bg-black p-16  bg-opacity-80 ">
        <h1 className="text-4xl text-white font-normal mb-8">Sign In</h1>

        <Fade bottom cascade>

          { loginMessage && <p className="errors text-white bg-orange rounded-md p-4 -mt-3 text-sm mb-4 font-light">{loginMessage}</p> }

          <form noValidate onSubmit={handleSubmit(signIn)}>
            <input
              name="email"
              type="email"
              placeholder="Email"
              ref={emailRef}
              className={`w-full bg-gray text-white text-sm py-5 px-4 placeholder:text-light-gray mb-4 rounded-md border-b-2 border-transparent ${errors.email ? ' border-orange' : ''}`}
              {...register("email", {
                validate: {
                  required: (value) => FormValidation.required(value),
                  maxLength: (value) => FormValidation.maxLength(value, 200),
                  minLength: (value) => FormValidation.minLength(value, 2),
                  validEmail: (value) => FormValidation.validEmail(value)
                }
              })}
            />

          {errors.email && (
            <p className="errors text-orange -mt-3 text-sm mb-4 font-light">{errors.email.message}</p>
          )}
            
            <input
              type="password"
              placeholder="Password"
              ref={passwordRef}
              className={`w-full bg-gray text-white text-sm py-5 px-4 placeholder:text-light-gray mb-4 rounded-md border-b-2 border-transparent ${errors.password ? ' border-orange' : ''}`}
              {...register("password", {
                validate: {
                  required: (value) => FormValidation.required(value),
                  between: (value) => FormValidation.between(value, 6, 20)
                }
              })}
            />

            {errors.password && (
            <p className="errors text-orange -mt-3 text-sm mb-4 font-light">{errors.password.message}</p>
          )}

            <button
              className="w-full bg-red hover:shadow-lg text-white rounded-md mt-8 font-medium py-3 px-4 mb-3 hover:bg-opacity-60"
              type="submit"
            >
            { isLoggingIn ? <TailSpin
                height="25"
                width="25"
                color="#f6cfd1"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperClass="flex justify-center items-center"
                visible={true}
              /> : 'Sign In'}
                        
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
          <button className="font-bold" onClick={() => setLoginState && setLoginState("signup")}>Sign up now.</button>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
