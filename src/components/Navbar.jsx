import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../../public/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../utils/userSilce";

function Navbar() {
  const { token, name, profilePic, username } = useSelector(
    (state) => state.user
  );

  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState(null);

  const [showSearchBar, setShowSearchBar] = useState(false);

  const dispatch = useDispatch();
  function handleLogout() {
    dispatch(logout());
    setShowPopup(false);
  }

  useEffect(() => {
    if (window.location.pathname !== "/search") {
      setSearchQuery(null);
    }
    return () => {
      if (window.location.pathname !== "/") {
        setShowPopup(false);
      }
    };
  }, [window.location.pathname]);

  return (
    <div className='relative w-full h-full'>
      <div className="bg-white max-w-full sticky z-20 top-0   flex justify-between items-center h-[70px] px-2 sm:px-[30px]  border-b drop-shadow-sm">
        <div className="flex gap-4 items-center relative">
          <Link to={"/"}>
            <div className="">
              <img src={logo} alt="" />
            </div>
          </Link>

          <div
            className={`relative max-sm:left-6 max-sm:absolute max-sm:z-40 max-sm:top-16 sm:block ${
              showSearchBar ? " max-sm:block " : " max-sm:hidden "
            }`}
          >
            <i className="fi fi-rr-search absolute text-lg top-1/2 -translate-y-1/2  ml-4 opacity-40"></i>
            <input
              type="text"
              className="bg-gray-100 focus:outline-none max-sm:w-[calc(100vw_-_70px)] rounded-full pl-12 p-2 "
              placeholder="Search"
              value={searchQuery ? searchQuery : ""}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.code == "Enter" || e.code == "NumpadEnter" || e.keyCode == "13") {
                  if (searchQuery.trim()) {
                    setShowSearchBar(false);
                    if (showSearchBar) {
                      setSearchQuery("");
                    }
                    navigate(`/search?q=${searchQuery.trim()}`);
                  }
                }
              }}
            />
          </div>
        </div>

        <div className="flex gap-5 justify-center items-center">
          <i
            className="fi fi-rr-search  text-xl sm:hidden cursor-pointer "
            onClick={() => setShowSearchBar((prev) => !prev)}
          ></i>
          <Link to={"/add-blog"}>
            <div className=" flex gap-2 items-center">
              <i className="fi fi-rr-edit text-2xl mt-1"></i>
              <span className="text-xl hidden sm:inline">write</span>
            </div>
          </Link>

          {token ? (
            // <div className="text-xl capitalize">{name}</div>
            <div
              className="w-12 h-12 cursor-pointer aspect-square rounded-full overflow-hidden"
              onClick={() => setShowPopup((prev) => !prev)}
            >
              <img
                src={
                  profilePic
                    ? profilePic
                    : `https://api.dicebear.com/9.x/initials/svg?seed=${name}`
                }
                alt=""
                className="rounded-full w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className=" flex gap-2">
              <Link to={"/signup"}>
                <button className="bg-blue-500  px-6 py-3 text-white rounded-full cursor-pointer">
                  Signup
                </button>
              </Link>
              <Link to={"/signin"}>
                <button className="border px-6 py-3 rounded-full cursor-pointer">
                  Signin
                </button>
              </Link>
            </div>
          )}
        </div>

        {showPopup ? (
          <div
            onMouseLeave={() => setShowPopup(false)}
            className="w-[120px] cursor-pointer bg-gray-200 rounded-xl border right-5 top-15 border-gray-200 absolute"
          >
            <Link to={`/@${username}`}>
            <p className="text-lg py-2 px-3 hover:bg-blue-500 hover:text-white rounded-t-xl">Profile</p>
            </Link>
            <Link to={`/edit-profile`}>
            <p className="text-lg py-2 px-3 hover:bg-blue-500 hover:text-white">Edit Profile</p>
            </Link>
            <Link to={"/setting"}>
            <p className="text-lg py-2 px-3 hover:bg-blue-500 hover:text-white"> Setting</p>
            </Link>
            <p  className="text-lg py-2 px-3 hover:bg-blue-500 hover:text-white rounded-b-xl" onClick={handleLogout}>
              Logout
            </p>
          </div>
        ) : null}
      </div>
      <Outlet />
    </div>
  );
}

export default Navbar;