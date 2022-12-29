import Avatar from "../images/avatars/6FgZxbi.png";

import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar({ navClass, hideMenu, btnLoginClass, containerClass, setLoginState }) {
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const location = useLocation();

    return (
    <nav className={containerClass ? containerClass : `relative lg:absolute z-20 top-0 left-0 h-20 w-full`}>
      <div className={navClass ? navClass : `container flex items-center justify-between py-6`}>
        <div className="flex items-center">
          <a onClick={() => navigate("/home")} className="cursor-pointer">
            <img src="/images/logo.svg" alt="Netflix Logo" className="w-40" />
          </a>
          {user && hideMenu !== true && (
            <ul className="flex items-center text-lg space-x-9 ml-10">
              <li>
               <Link 
                  to="/home" 
                  className={`text-white font-light cursor-pointer no-underline hover:opacity-80 transition-all duration-300 ${location.pathname === '/home' && `font-bold`}`}
                >
                  Home
                </Link>
              </li>
              <li>
              <Link 
                  to="/home/shows" 
                  className={`text-white font-light cursor-pointer no-underline hover:opacity-80 transition-all duration-300 ${location.pathname === '/home/shows' && `font-bold`}`}
                >
                  Shows
                </Link>
              </li>
              <li>
              <Link 
                  to="/home/movies" 
                  className={`text-white font-light cursor-pointer no-underline hover:opacity-80 transition-all duration-300 ${location.pathname === '/home/movies' && `font-bold`}`}
                >
                  Movies
                </Link>
              </li>
              <li>
              <Link 
                  to="/my-list" 
                  className={`text-white font-light cursor-pointer no-underline hover:opacity-80 transition-all duration-300 ${location.pathname === '/my-list' && `font-bold`}`}
                >
                  My list
                </Link>
              </li>
            </ul>
          )}
        </div>

        { user && hideMenu !== true && 
          <div className="flex items-center space-x-6">
            <div className="search">
              <img src="/images/icons/logo.svg" alt="Search" className="w-4 h-4" />
            </div>

            <Link to="/profile" className="relative profile">
              <img
                src={user?.photoURL ? user.photoURL : Avatar}
                alt="User Avatar"
                className="w-8 h-8"
              />
            </Link>
          </div>
          }

          {!user && 
            <div className="flex">
              <button className={btnLoginClass ? btnLoginClass : `btn bg-red py-1 px-4 rounded-sm text-white`} onClick={() => navigate("/login")}>
                Sign in
              </button>
            </div>
          }
      </div>
    </nav>
  );
}
export default Navbar;
