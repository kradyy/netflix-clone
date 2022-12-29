import React, { useEffect, useState, useMemo } from "react";
import { genreEndpoints } from ".//tmdb";
import Home from "./routes/home";
import Landing from "./routes/landing";
import NotFound from "./routes/404";
import Profile from "./routes/profile";
import Login from "./routes/login";
import Signup from "./routes/signup";
import { authentication } from ".//firebase";
import api from "./axios";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

import { logout, login, selectUser } from "./features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { addToMyList, removeFromMyList } from "./includes/user";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loadState, setLoadState] = useState(() => 1);

  // Get user from redux store
  const getUser = useSelector(selectUser);
  const user = useMemo(() => getUser, [getUser]);

  // Redirect to home if user is logged in and is on root
  useEffect(() => {
    const unsubscribe = authentication.onAuthStateChanged((user) => {
      if (window.location.pathname === "/" && user) {
        navigate("/home");
      }
    });
    
    var movie = {
        id: 2,
        title: 'dsds',
    }

    //addToMyList(user, movie)
    removeFromMyList(user, movie)

    return () => unsubscribe;
  }, [navigate]);

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = authentication.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          login({
            uid: user.uid,
            email: user.email,
          })
        );
      } else {
        dispatch(logout());
      }

      setLoadState("completed");
    });

    // Always cleanup
    return () => unsubscribe;
  }, [dispatch]);

  return (
    <div className="App bg-dark overflow-hidden">
      {loadState !== "completed" && (
        <div className="absolute h-screen w-screen z-40 bg-dark flex justify-center items-center">
          <img src="/images/logo.svg" alt="Netflix Logo" className="w-48" />
        </div>
      )}

      <Routes>
        <Route path="/" element={user ? <Home /> : <Landing />} />
        <Route exact path="/home" element={user ? <Home /> : <Landing />} />
        <Route path="/home/:category" element={user ? <Home /> : <Landing />} />
        <Route path="/my-list" element={user ? <Profile /> : <Landing />} />
        <Route path="/profile" element={user ? <Profile /> : <Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup/:step" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
