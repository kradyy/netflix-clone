import React, { useEffect, useState } from "react";
import Logo from "./images/logo.svg";
import Home  from "./routes/home";
import Landing from "./routes/landing";
import NotFound from "./routes/404";
import Profile from "./routes/profile";
import Login from "./routes/login";
import Signup from "./routes/signup";
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
        dispatch(logout());

        // Redirect to root if user is not logged in
        if ([ '/signup', '/profile' ].includes(window.location.pathname)) {

        }
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
        
    
          <Routes>
          { !user ?
            <>
              <Route path="/" element={<Landing />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </>
          :
          <>
            <Route path="/" element={<Home />} />
            <Route exact path="/home" element={<Home />} />
            <Route path="/home/:category" element={<Home />} />
            <Route path="/my-list" element={<Profile />} />
            <Route path="/profile" element={<Profile />} />
          </> }
          <Route path="*" element={<NotFound />} />
          </Routes>
    </div>
  );
}

export default App;
