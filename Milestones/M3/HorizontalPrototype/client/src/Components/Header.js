import "./style.css";
import React, { useState } from "react"; // Needed for AWS since it's using node 16
import { Link, useLocation, useNavigate } from "react-router-dom";
import Popover from "@mui/material/Popover";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";

function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

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

  return (
    <header className="wrapper header-wrapper">
      <div className="nav-wrapper">
        <Link className="logo" to="/">
          <img src="/logo.png" className="img-logo" />
        </Link>
        <nav className="wrapper link-wrapper">
          <Link
            to="/posts"
            className={pathname.includes("posts") ? "highlight" : null}
          >
            Posts
          </Link>
          <Link
            to="/upgradepage"
            className={pathname.includes("upgradepage") ? "highlight" : null}
          >
            Premium Guides
          </Link>
          <Link
            to="/calendar"
            className={pathname.includes("calendar") ? "highlight" : null}
          >
            Calendar
          </Link>
        </nav>
      </div>

      <nav className="wrapper link-wrapper">
        <div>Hello, Jose!</div>
        {isSignIn ? (
          <>
            <Link
              to="/mypage"
              className={pathname.includes("mypage") ? "highlight" : null}
            >
              My Page
            </Link>
            <Badge badgeContent={2} color="primary" className="header-badge">
              <MailIcon
                color="action"
                aria-describedby={
                  anchorEl !== null ? "simple-popover" : undefined
                }
                onClick={handleClick}
              />
            </Badge>
            <Popover
              id={anchorEl !== null ? "simple-popover" : undefined}
              open={anchorEl !== null}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
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
            <Link to="/" onClick={() => alert("Successfully signed out!")}>
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
