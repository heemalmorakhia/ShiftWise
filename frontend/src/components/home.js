import React, { useState, useContext, useEffect } from "react";

import "../css/home.css";
import Logo from "../img/logo.png";
import Background from "../img/background.jpg";
import { useNavigate } from "react-router-dom";
import UserPool from "../utils/userPool";
import { AuthenticationContext } from "../utils/authentication";

const Home = () => {
  const [isRegistered, setIsRegistered] = useState(true);
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const { login, isLoggedIn } = useContext(AuthenticationContext);

  useEffect(() => {
    isLoggedIn()
      .then((session) => {
        navigate("/dashboard");
      })
      .catch((err) => console.log("Not logged in"));
  }, []);

  const createAccountOnClick = () => {
    setIsRegistered(false);
  };

  const signInOnClick = () => {
    setIsRegistered(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    let email = e.target.email.value;
    let password = e.target.password.value;

    if (isRegistered) {
      login(email, password)
        .then((data) => {
          // Handle successful login response
          navigate("/dashboard");
        })
        .catch((error) => {
          // Handle login error
          setErr("Invalid Credentials. Login Error: " + error);
          console.error("Login error:", error);
        });
    } else {
      UserPool.signUp(email, password, [], null, async (err, data) => {
        if (err) {
          setErr("Sign-Up Error: " + err.message);
        } else {
          setIsRegistered(true);
          setErr("Sign-Up Complete. Please sign in.");
          const response = await fetch(
            "https://hpin1b7wr4.execute-api.us-east-1.amazonaws.com/user/create-user",
            {
              method: "POST",
              body: JSON.stringify({
                email: email,
              }),
              mode: "no-cors",
            }
          );
          console.log(response);
        }
      });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row d-flex">
        <div className="col-4 p-0 flex-grow-1" id="left">
          <br />
          <div className="text-center mt-4 mb-4">
            <h2 className="display-5 text-white text-center fw-medium">
              <img className="img-fluid mb-2 logo" src={Logo} alt="logo" />
              ShiftWise
            </h2>
          </div>
          <br />
          <h3 className="text-center mt-4 mb-4 text-white">
            {isRegistered ? "Login" : "Register"}
          </h3>
          <form onSubmit={submitHandler}>
            <div className="form-floating mb-3 w-75 m-auto">
              <input
                type="email"
                name="email"
                className="form-control"
                id="floatingEmail"
                placeholder="id@dal.ca"
                required
              />
              <label htmlFor="floatingEmail">
                Email<span className="text-danger"> *</span>
              </label>
            </div>
            <div className="form-floating w-75 m-auto">
              <input
                type="password"
                name="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                required
              />
              <label htmlFor="floatingPassword">
                Password<span className="text-danger"> *</span>
              </label>
            </div>
            <div className="text-center mt-2">
              <button type="submit" className="mt-3 w-50 btn btn-light">
                {isRegistered ? "Sign In" : "Sign Up"}
              </button>
              <p className={isRegistered ? "mt-3" : "hide"}>
                <a
                  href="#"
                  className="me-1 mb-2 text-white"
                  data-bs-toggle="modal"
                  data-bs-target="#forgotPasswordModal"
                >
                  Forgot Password?
                </a>
                <div
                  className="modal fade"
                  id="forgotPasswordModal"
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="forgotPasswordModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1
                          className="modal-title fs-5"
                          id="forgotPasswordModalLabel"
                        >
                          Forgot Password
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        Please reach out to the{" "}
                        <a href="mailto:heemal.morakhia@dal.ca">Adminstrator</a>{" "}
                        to reset your password.
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <br />
                <a
                  href="#"
                  className="me-1 text-white"
                  onClick={createAccountOnClick}
                >
                  Create a new account!
                </a>
              </p>
              <p className={isRegistered ? "hide" : "mt-3"}>
                <a
                  href="#"
                  className="me-1 mb-2 text-white"
                  onClick={signInOnClick}
                >
                  Sign In
                </a>
              </p>
              <p
                className={
                  err === ""
                    ? "hide"
                    : "err container text-danger p-4 bg-white w-75 text-center rounded"
                }
              >
                {err}
              </p>
            </div>
          </form>
        </div>
        <div className="col-8 p-0 flex-shrink-1" id="right">
          <img
            className="img-fluid"
            src={Background}
            alt="Calendar"
            id="background"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
