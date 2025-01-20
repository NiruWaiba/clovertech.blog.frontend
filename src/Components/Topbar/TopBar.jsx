import { useContext } from "react";
import { Context } from "../../auth/context";
import "./topbar.css";
import { Link } from "react-router-dom";

const TopBar = () => {
  const { user, dispatch } = useContext(Context);
  // const user = false;
  const handleLogout = () => {
    sessionStorage.clear("token");
    localStorage.clear("user");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fa-brands fa-square-facebook"></i>
        <i className="topIcon fa-brands fa-square-instagram"></i>
        <i className="topIcon fa-brands fa-linkedin"></i>
        <i className="topIcon fa-brands fa-tiktok"></i>
      </div>

      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link to="/about" className="link">
              ABOUT
            </Link>
          </li>
          {/* <li className="topListItem">ABOUT</li> */}
          <li className="topListItem">
            <Link to="/contact" className="link">
              CONTACT
            </Link>
          </li>
          {/* <li className="topListItem">CONTACT</li> */}
          <li className="topListItem">
            <Link to="/write" className="link">
              WRITE
            </Link>
          </li>
          <li className="topListItem" onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          /*<img className="ppimg" src="./assests/profile.jpg" alt=""/>*/ <i className=" topSearchIcon fa-solid fa-magnifying-glass"></i>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default TopBar;
