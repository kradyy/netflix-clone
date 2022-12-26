import React from "react";
import Logo from "../images/logo.svg";
import Background from "../images/background.png";
import LoginModal from "../components/LoginModal";
import LoginPromo from "../components/LoginPromo";

function Login() {
  const [loginState, setLoginState] = React.useState("promo");

  return (
    <div
      className="bg-dark h-screen bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="container relative z-10">
        <div className="top-bar py-10">
          <img src={Logo} alt="Netflix Logo" className="w-30" />
        </div>
      </div>

      {loginState === "promo" && <LoginPromo setLoginState={setLoginState} />}
      {loginState === "modal" && <LoginModal />}

      <div className="banner_fadeBottom absolute bottom-0 bg-gradient-to-b h-40 from-transparent via-dark to-dark w-full" />

      <div className="backdrop bg-dark bg-opacity-70 h-screen w-full absolute top-0 left-0 z-[1]" />
    </div>
  );
}

export default Login;
