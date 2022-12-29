import { useEffect, useRef, useState } from "react";
import {
  authentication,
  db,
  doc,
  Timestamp,
  setDoc,
} from "../firebase";
import { TailSpin } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Fade from "react-reveal/Fade";
import FormValidation from "../validators/form";

const STEP_ROUTES = ["registration", "regform", "completed"];

function LoginForm({ setLoginState }) {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();

  const { step } = useParams();

  const [signupProgress, setSignupProgress] = useState("registration");
  const [registerMessage, setregisterMessage] = useState("");
  const [isRegistrating, setIsRegistrating] = useState(false);

  // Login steps
  const SignupStepTemplate = () => {
    switch (signupProgress) {
      case "registration":
        return (
          <>
            <div className="step-registration text-center">
              <img src="/images/icons/devices.svg" alt="Devices" className="w-20 mb-5 mx-auto" />
              <span className="text-sm text-center font-light">
                STEP <strong>1</strong> OF <strong>3</strong>
              </span>
              <h1 className="text-4xl text-black font-medium mb-8">
                Finish setting up your account
              </h1>

              <p className="text-lg font-light leading-2">
                Netflix is personalised for you. Create a password to watch on
                any device at any time.
              </p>

              <button
                className="btn bg-red text-white py-4 text-xl hover:bg-opacity-90 px-8 w-full rounded-md mt-6"
                onClick={() => navigate("/signup/regform")}
              >
                Next
              </button>
            </div>
          </>
        );
      case "regform":
        return (
          <>
            <div className="step-regform text-left">
              <span className="text-sm font-light">
                STEP <strong>2</strong> OF <strong>3</strong>
              </span>
              <h1 className="text-4xl text-black font-medium mb-4">
                Create a password to start your membership
              </h1>

              <p className="text-lg font-light leading-2 mb-3">
                Just a few more steps and you're finished! We hate paperwork,
                too. Oh, and yes - do notice that this is merely a demo.
              </p>

              {registerMessage && (
                <p className="errors text-white bg-orange rounded-md p-4 -mt-1 text-sm mb-4 font-light">
                  {registerMessage}
                </p>
              )}

              <form noValidate onSubmit={handleSubmit(signUp)}>
                <div className="input-container h-full relative mb-4">
                  <input
                    name="email"
                    type="email"
                    ref={emailRef}
                    onFocus={(e) => hasText(e)}
                    autoFocus
                    className={`w-full bg-white peer pt-3 pl-4 text-black h-[60px] text-sm rounded border border-lighter-gray ${
                      errors.email ? " !border-red" : ""
                    }`}
                    {...register("email", {
                      onChange: (e) => {
                          hasText(e)
                          trigger('email')
                      },
                      validate: {
                        required: (value) => FormValidation.required(value),
                        between: (value) =>
                          FormValidation.between(value, 5, 50),
                        validEmail: (value) => FormValidation.validEmail(value),
                        //emailExists: async (value) => FormValidation.emailExists(value)
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
                  <p className="errors text-red -mt-3 text-sm mb-4 font-light">
                    {errors.email.message}
                  </p>
                )}

                <div className="input-container h-full relative mb-4">
                  <input
                    type="password"
                    ref={passwordRef}
                    onFocus={(e) => hasText(e)}
                    className={`w-full bg-white peer pt-3 pl-4 text-black h-[60px] text-sm rounded border border-lighter-gray ${
                      errors.password ? " !border-red" : ""
                    }`}
                    {...register("password", {
                      onChange: (e) => {
                          hasText(e)
                          trigger('password')
                      },
                      validate: {
                        required: (value) => FormValidation.required(value),
                        between: (value) =>
                          FormValidation.between(value, 6, 20),
                      },
                    })}
                  />
                  <label
                    htmlFor=""
                    className="absolute peer-focus:top-4 active:top-4 peer-focus:text-xs active:text-xs transition-transform duration-500 left-4 text-light-gray top-[50%] translate-y-[-50%]"
                  >
                    Add a password
                  </label>
                </div>

                {errors.password && (
                  <p className="errors text-red -mt-3 text-sm mb-4 font-light">
                    {errors.password.message}
                  </p>
                )}

                <button
                  className="btn bg-red text-white py-4 text-xl hover:bg-opacity-90 px-8 w-full rounded-md mt-6 flex justify-center items-center text-center"
                  type="submit"
                >
                  {isRegistrating ? (
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
                    "Next"
                  )}
                </button>
              </form>
            </div>
          </>
        );
      case "completed":
        return (
          <>
            <div className="step-registration text-center">
              <img src="/images/icons/devices.svg" alt="Devices" className="w-20 mb-5 mx-auto" />
              <span className="text-sm text-center font-light">
                STEP <strong>3</strong> OF <strong>3</strong>
              </span>
              <h1 className="text-4xl text-black font-medium mb-8">
                Enjoy your demo
              </h1>

              <p className="text-lg font-light leading-2">
                Registration is completed.. or you navigated to{" "}
                <strong>/completed/</strong> manually. 😃 Anyhow.. enjoy your
                demo and login with the email and password you just created.
              </p>

              <button
                className="btn bg-red text-white py-4 text-xl hover:bg-opacity-90 px-8 w-full rounded-md mt-6"
                onClick={() => navigate("/login")}
              >
                Go to login
              </button>
            </div>
          </>
        );
      default:
        navigate("/signup/registration");
    }
  };

  // Handle login progress
  useEffect(() => {
    SignupStepTemplate(signupProgress);
  }, [signupProgress]);

  useEffect(() => {
    if (STEP_ROUTES.includes(step)) {
      setSignupProgress(step);
    }
  }, [step]);

  const {
    register,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const signUp = async (data) => {
    setIsRegistrating(true);

    const authPromise = authentication.createUserWithEmailAndPassword(
      data.email,
      data.password
    );

    authPromise
      .then((authUser) => {
        const { user } = authUser;

        // Set user data in firestore
        const docData = {
          userId: user.uid,
          dateCreated: Timestamp.now(),
          myList: [],
          subscriptions: [],
        };

        setDoc(doc(db, "users", user.email), docData)
          .then((ret) => {
            authentication.signOut();
            setSignupProgress("completed");
            navigate("/signup/completed");
          })
          .catch((error) => {
            setregisterMessage(error.message);
          });
      })
      .catch((error) => {
        setregisterMessage(error.message);
      })
      .finally(() => {
        setIsRegistrating(false);
      });
  };

  const hasText = (e) => {
    const container = e.target.parentElement;

    const className = '[&>label]:top-4 [&>label]:text-xs'.split(" ")
    e.target.value !== "" ? container.classList.add(...className) : container.classList.remove(...className)
  };

  return (
    <div className="register-modal lg:pt-[5%] relative max-w-[550px] rounded-md mx-auto z-10">
      <div className="register-modal__content p-16">
        <Fade bottom cascade>
          {signupProgress && SignupStepTemplate(signupProgress)}
        </Fade>
      </div>
    </div>
  );
}

export default LoginForm;
