import "./Navbar.css";
import { FiTarget } from "react-icons/fi";
import { FaHome } from "react-icons/fa";
import { IoMdInformationCircle } from "react-icons/io";
import { FaPhone } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaSignInAlt } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/User";

export default function Navbar() {
  const { userName, setUserToken, setUserName } = useContext(UserContext);
  const navigate = useNavigate();
 
  const logout = () => {
    localStorage.removeItem("userToken");
    setUserName(null);
    setUserToken(null);
    navigate("/Login");
    console.log("logout");
  };

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg  ">
          <div className="container gx-5  ">
            <Link className="navbar-brand text-white fs-3 to='/Home'">
              <FiTarget className="text-danger gx-2 fs-1 target" />
              TARGET
            </Link>
            <button
              className="navbar-toggler "
              type="button"
              data-toggle="collapse"
              data-target="#nvbCollapse"
              aria-controls="nvbCollapse"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="row">
              <div className="collapse navbar-collapse " id="nvbCollapse">
                <ul className="navbar-nav ml-auto ">
                  <li className="nav-item pl-1 ">
                    <Link className="nav-link" to="/Home">
                      {" "}
                      <FaHome />
                      Home
                    </Link>
                  </li>

                  <li className="nav-item  pl-1   ">
                    <Link className="nav-link " to="/About">
                      <IoMdInformationCircle />
                      About
                    </Link>
                  </li>
                  <li className="nav-item pl-1 ">
                    <Link className="nav-link" to="Contact">
                      <FaPhone />
                      Contact
                    </Link>
                  </li>
                  <li className="nav-item pl-1  ">
                    <Link className="nav-link" to="Cart">
                      <FaShoppingCart />
                      Shopping Cart
                    </Link>
                  </li>
                  {userName ? (
                    <>
                      <li className="nav-item pl-1 ">
                        <Link className="nav-link" to="/Login" onClick={logout}>
                          <CiLogout />
                          Log Out
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="nav-item pl-1 ">
                        <Link className="nav-link" to="/Login">
                          <FaSignInAlt />
                          Sign In
                        </Link>
                      </li>
                      <li className="nav-item pl-1">
                        <Link className="nav-link" to="Register">
                          <FaUserPlus />
                          Sign Up
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
