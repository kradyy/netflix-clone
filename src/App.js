import React, { useEffect } from "react";
import Home from "./routes/home";
import Login from "./routes/login";
import { authentication } from "./firebase";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";

import { logout, login, selectUser } from "./features/userSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();

  // Redirect to the /home page if user is logged in
  const navigate = useNavigate();

  alert("todo: fixa hämtning av gallerier + fixa menylänkarna");

  useEffect(() => {
    const unsubscribe = authentication.onAuthStateChanged((user) => {
      if (window.location.pathname === "/" && user) {
        navigate("/home");
      }
    });
  }, [navigate]);

  // Get user from redux store
  const user = useSelector(selectUser);

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
        dispatch(logout);
      }
    });

    // Always use cleanup
    return () => unsubscribe;
  }, []);

  function CategoryDetails() {
    let { id } = useParams();
    return <>{/* Render the details for the category with ID `id` here */}</>;
  }

  return (
    <div className="overflow-hidden">
      {!user ? (
        <Login />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route path="/home/:category" element={<Home />} />

          <Route path="/test" element={<div>test page</div>} />
          <Route path="/profile" element={<div>profile page</div>} />
          <Route path="*" element={<div>Add 404</div>} />
        </Routes>
      )}
    </div>
  );
}

export default App;
