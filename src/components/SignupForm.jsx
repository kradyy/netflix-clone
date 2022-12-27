import { useEffect, useRef, useState } from "react";
import { authentication } from "../firebase";
import { TailSpin } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Devices from "../images/devices.svg";
import Fade from "react-reveal/Fade";
import FormValidation from '../validators/form';

const STEP_ROUTES = ['registration', 'regform', 'completed']

function LoginForm({ setLoginState }) {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();

  const { step } = useParams();

  const [signupProgress, setSignupProgress] = useState('registration');
  const [registerMessage, setregisterMessage] = useState("");
  const [isRegistrating, setIsRegistrating] = useState(false);

  // Login steps
  const SignupStepTemplate = () => {
    switch (signupProgress) {
      case 'registration':
        return (
          <>
            <div className="step-registration text-center">
              <img src={Devices} alt="Devices" className="w-20 mb-5 mx-auto" />
              <span className="text-sm text-center font-light">STEP <strong>1</strong> OF <strong>3</strong></span>
              <h1 className="text-4xl text-black font-medium mb-8">Finish setting up your account</h1>

              <p className="text-lg font-light leading-2">
                Netflix is personalised for you.
                Create a password to watch on any device at any time.
              </p>

              <button className="btn bg-red text-white py-4 text-xl hover:bg-opacity-90 px-8 w-full rounded-md mt-6" onClick={() => navigate('/signup/regform')}>Next</button>
            </div>
          </>
        )
      case 'regform':
        return (
          <>
          <div className="step-regform text-left">
              <span className="text-sm font-light">STEP <strong>2</strong> OF <strong>3</strong></span>
            <h1 className="text-4xl text-black font-medium mb-4">Create a password to start your membership</h1>

            <p className="text-lg font-light leading-2 mb-3">
             Just a few more steps and you're finished!
              We hate paperwork, too. Oh, and yes - do notice that this is merely a demo.
            </p>

            {registerMessage && <p className="errors text-white bg-orange rounded-md p-4 -mt-1 text-sm mb-4 font-light">{registerMessage}</p>}

            <form noValidate onSubmit={handleSubmit(signUp)}>
              <input
                name="email"
                type="email"
                placeholder="Email"
                ref={emailRef}
                className={`w-full bg-white text-black text-sm py-5 px-4 placeholder:text-light-gray mb-4 rounded border border-lighter-gray ${errors.email ? ' !border-red' : ''}`}
                {...register("email", {
                  validate: {
                    required: (value) => FormValidation.required(value),
                    between: (value) => FormValidation.between(value, 5, 50),
                    validEmail: (value) => FormValidation.validEmail(value),
                    //emailExists: async (value) => FormValidation.emailExists(value)
                  }
                })}
              />

              {errors.email && (
                <p className="errors text-red -mt-3 text-sm mb-4 font-light">{errors.email.message}</p>
              )}

              <input
                type="password"
                placeholder="Password"
                ref={passwordRef}
                className={`w-full bg-white text-black text-sm py-5 px-4 placeholder:text-light-gray mb-4 rounded border border-lighter-gray ${errors.password ? ' !border-red' : ''}`}
                {...register("password", {
                  validate: {
                    required: (value) => FormValidation.required(value),
                    between: (value) => FormValidation.between(value, 6, 20)
                  }
                })}
              />

              {errors.password && (
                <p className="errors text-red -mt-3 text-sm mb-4 font-light">{errors.password.message}</p>
              )}

              <button
                className="btn bg-red text-white py-4 text-xl hover:bg-opacity-90 px-8 w-full rounded-md mt-6 flex justify-center items-center text-center"
                type="submit"
              >
                {isRegistrating ? <TailSpin
                  height="25"
                  width="25"
                  color="#f6cfd1"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperclassName="flex justify-center items-center"
                  visible={true}
                /> : 'Next'}

              </button>

            </form>
            </div>
          </>
        )
      case 'completed':
        return (
          <>
            <div className="step-registration text-center">
              <img src={Devices} alt="Devices" className="w-20 mb-5 mx-auto" />
              <span className="text-sm text-center font-light">STEP <strong>3</strong> OF <strong>3</strong></span>
              <h1 className="text-4xl text-black font-medium mb-8">Enjoy your demo</h1>

              <p className="text-lg font-light leading-2">
                Registration is completed.. or you navigated to <strong>/completed/</strong> manually. 😃
                Anyhow.. enjoy your demo and login with the email and password you just created.
              </p>

              <button className="btn bg-red text-white py-4 text-xl hover:bg-opacity-90 px-8 w-full rounded-md mt-6" onClick={() => navigate('/login')}>Go to login</button>
            </div>
          </>
        )
      default:
        navigate('/signup/registration')
    }
  }

  // Handle login progress
  useEffect(() => {
    console.log('signupProgress :>> ', signupProgress);

    SignupStepTemplate(signupProgress);
  }, [signupProgress])

  useEffect(() => {
    if (STEP_ROUTES.includes(step)) {
      setSignupProgress(step);
    }
  }, [step])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const signUp = async (data) => {
    setIsRegistrating(true);

    const authPromise = authentication.createUserWithEmailAndPassword(
      data.email,
      data.password);
    
    authPromise.then((authUser) => {
      authentication.signOut();
      setSignupProgress('completed')
      navigate('/signup/completed')
    }).catch((error) => {
      setregisterMessage(error.message);
    }).finally(() => {
      setIsRegistrating(false);
    })
  }

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
