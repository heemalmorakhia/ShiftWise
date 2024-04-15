import Logo from "../img/logo.png";
import "../css/header.css";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../utils/authentication";
import { useContext } from "react";

const Header = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthenticationContext);

  const logoutUser = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <nav id="header" className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand">
            <img className="img-fluid mb-2 header-logo" src={Logo} alt="logo" />
            &nbsp;
            <span className="fs-2 text-white">ShiftWise</span>
          </a>
          <button className="btn btn-light" type="button" onClick={logoutUser}>
            Logout
          </button>
        </div>
      </nav>
    </>
  );
};

export default Header;
