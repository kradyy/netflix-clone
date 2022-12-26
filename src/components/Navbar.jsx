import Logo from "../images/logo.svg";
import Bell from "../images/bell.svg";
import Search from "../images/search.svg";
import Avatar from "../images/avatars/6FgZxbi.png";

import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

function Navbar({ navStyle, hideMenu, containerClass, setLoginState }) {
  // Get user from redux
  const user = useSelector(selectUser);

  const getNavStyle = {
    default: "container flex items-center justify-between py-6",
    wide: "flex items-center justify-between py-6 px-4",
  };

  const style =
    navStyle && Object.keys(getNavStyle).includes(navStyle)
      ? getNavStyle[navStyle]
      : getNavStyle.default;

      console.log('user :>> ', user);
  return (
    <nav className={containerClass ? containerClass : `relative lg:absolute z-20 top-0 left-0 h-20 w-full`}>
      <div className={style}>
        <div className="flex items-center">
          <a href="/">
            <img src={Logo} alt="Netflix Logo" className="w-40" />
          </a>
          {user && hideMenu !== true && (
            <ul className="flex items-center space-x-9 ml-10">
              <li>
                <a
                  href="/home/shows"
                  className="text-white font-normal no-underline"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/home/shows"
                  className="text-white font-normal no-underline"
                >
                  Shows
                </a>
              </li>
              <li>
                <a
                  href="/home/movies"
                  className="text-white font-normal no-underline"
                >
                  Movies
                </a>
              </li>
              <li>
                <a
                  href="/my-list"
                  className="text-white font-normal no-underline"
                >
                  My list
                </a>
              </li>
            </ul>
          )}
        </div>

        { user && 
          <div className="flex items-center space-x-6">
            <div className="search">
              <img src={Search} alt="Search" className="w-4 h-4" />
            </div>
            <a
              href="/profile/notifications"
              className="relative bell-notification"
            >
              <div className="bg-red text-white absolute top-0 right-0 rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold -my-2">
                1
              </div>

              <img src={Bell} alt="Bell" className="w-4 h-4" />
            </a>

            <a href="/profile" className="relative profile">
              <img
                src={user?.photoURL ? user.photoURL : Avatar}
                alt="User Avatar"
                className="w-8 h-8"
              />
            </a>
          </div>
          }

          {!user && setLoginState &&
            <div className="flex">
              <button className="btn bg-red py-1 px-4 rounded-sm  in text-white" onClick={() => setLoginState("login")}>
                Log in
              </button>
            </div>
          }
      </div>
    </nav>
  );
}
export default Navbar;
