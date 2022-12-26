import React, { useEffect, useState } from "react";
import Logo from "./images/logo.svg";
import Home  from "./routes/home";
import Landing from "./routes/landing";
import Profile from "./routes/profile";
import { authentication } from "./firebase";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

import { logout, login, selectUser } from "./features/userSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ loadState, setLoadState ] = useState(1);

  // Redirect to home if user is logged in and is on root
  useEffect(() => {
    const unsubscribe = authentication.onAuthStateChanged((user) => {
      if (window.location.pathname === "/" && user) {
        navigate("/home");
      }
    });

    return () => unsubscribe;
  }, [navigate]);

  // Get user from redux store
  const user = useSelector(selectUser);

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = authentication.onAuthStateChanged((user) => {
      if (user) {
        console.log("user logged in", user);
        dispatch(
          login({
            uid: user.uid,
            email: user.email,
          })
        );
      } else {
        console.log("user logged out", user);
        dispatch(logout());
        navigate('/')
      }

      setLoadState('completed');
    });

    // Always cleanup
    return () => unsubscribe;
  }, [dispatch]);

  return (
    <div className="App bg-dark h-screen overflow-hidden">
      { loadState !== 'completed' && 
      
        <div className="absolute h-screen w-screen z-40 bg-dark flex justify-center items-center">
          <img src={Logo} alt="Netflix Logo" className="w-48" />
        </div>
      }
      {!user ? (
        <Landing />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route path="/home/:category" element={<Home />} />
          <Route path="/my-list" element={<Profile />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<div>Add 404</div>} />
        </Routes>
      )}
    </div>
  );
}

export default App;
