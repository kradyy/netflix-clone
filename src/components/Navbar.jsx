import Logo from "../images/logo.svg";
import Bell from "../images/bell.svg";
import Search from "../images/search.svg";
import Avatar from "../images/avatars/6FgZxbi.png";

import { useSelector } from "react-redux";

function Navbar() {
  // Get user from redux
  const user = useSelector((state) => state.user);

  return (
    <nav className="absolute z-10 top-0 left-0 h-20 w-full">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center">
          <img src={Logo} alt="Netflix Logo" className="w-30" />
          <ul className="flex items-center space-x-9 ml-10">
            <li>
              <a
                href="/home/shows"
                className="text-white font-medium no-underline"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/home/shows"
                className="text-white font-medium no-underline"
              >
                TV Shows
              </a>
            </li>
            <li>
              <a
                href="/home/movies"
                className="text-white font-medium no-underline"
              >
                Movies
              </a>
            </li>
            <li>
              <a
                href="/home/new"
                className="text-white font-medium no-underline"
              >
                TV Shows
              </a>
            </li>
            <li>
              <a
                href="/home/my-list"
                className="text-white font-medium no-underline"
              >
                TV Shows
              </a>
            </li>
          </ul>
        </div>

        <div className="flex items-center space-x-6">
          <div className="search">
            <img src={Search} alt="Search" className="w-4 h-4" />
          </div>

          <a
            href="/profile/notifications"
            className="relative bell-notification"
          >
            <div class="bg-red text-white absolute top-0 right-0 rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold -my-2">
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
      </div>
    </nav>
  );
}
export default Navbar;
