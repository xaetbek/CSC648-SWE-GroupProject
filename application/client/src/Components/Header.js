import "./style.css";
import React, { useEffect, useState } from "react"; // Needed for AWS since it's using node 16
import { Link, useLocation, useNavigate } from "react-router-dom";
import Popover from "@mui/material/Popover";
import useAuth from "../Hooks/useAuth";
import useLogout from "../Hooks/useLogout";

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [name, setName] = useState("");
  const { pathname } = useLocation();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const logout = useLogout();

  useEffect(() => {
    setName(auth?.username);
    console.log("Name: ", name);
  }, []);

  useEffect(() => {
    setName(auth?.username);
    console.log("Name: ", name);
  }, [auth]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigatePage = (page) => {
    navigate(`/mypage/${page}`);
    setAnchorEl(null);
  };

  const capitalizeName = (name) => {
    const words = name?.split(" ");

    let str = "";
    for (let i = 0; i < words?.length; i++) {
      let lower = words[i].toLowerCase();
      let first = words[i].charAt(0);
      str += first + lower;
    }

    return words?.join(" ");
  };

  const signout = async () => {
    await logout();
  };

  return (
    <header className="wrapper header-wrapper">
      <div className="nav-wrapper">
        <Link className="logo" to="/">
          <img src="/logo.png" className="img-logo" style={{ marginTop: "10px" }} />
        </Link>
        <nav className="wrapper link-wrapper">
          <Link
            to="/posts"
            className={pathname.includes("posts") ? "highlight" : null}
          >
            Forum
          </Link>
          <Link
            to="/premiumguides"
            className={pathname.includes("premiumguides") ? "highlight" : null}
          >
            Premium Guides
          </Link>
        </nav>
      </div>

      <nav className="wrapper link-wrapper">
        <div>
          {name && auth?.accessToken ? `Hello, ${capitalizeName(name)}!` : ""}
        </div>
        {auth?.accessToken ? (
          <>
            <Link
              to="/mypage/profile"
              className={pathname.includes("mypage") ? "highlight" : null}
            >
              My Page
            </Link>
            <Popover
              id={anchorEl !== null ? "simple-popover" : undefined}
              open={anchorEl !== null}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
              }}
            >
              <div className="popover-container">
                <div onClick={() => navigatePage("mentoring-requests")}>
                  You have a new montoring request.
                </div>
                <div onClick={() => navigatePage("messages")}>
                  You have a new message.
                </div>
              </div>
            </Popover>
            <Link to="/" onClick={signout}>
              Sign Out
            </Link>
          </>
        ) : (
          <>
            <Link to="/signin">Sign In</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
