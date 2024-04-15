import Header from "./header";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../utils/authentication";

const Dashboard = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthenticationContext);
  const [userSession, setUserSession] = useState(null);

  useEffect(() => {
    isLoggedIn()
      .then((session) => {
        setUserSession(session);
        console.log(session);
        console.log("Logged in");
      })
      .catch((err) => {
        console.log("Not Logged in");
        navigate("/");
      });
  }, []);

  const contactAdmin = async (e) => {
    e.preventDefault();

    let message = e.target.messageTA.value;
    let userEmail = e.target.userEmail.value;

    console.log(userEmail + ", " + message);

    // ses publish
    const resp = await fetch(
      "https://hpin1b7wr4.execute-api.us-east-1.amazonaws.com/user/send-message",
      {
        method: "POST",
        body: JSON.stringify({
          userEmail: userEmail,
          userMessage: message,
        }),
        mode: "no-cors",
      }
    );
    console.log(resp);

    alert("Message sent successfully!");
    let f = document.getElementById("contactAdminForm");
    f.reset();
  };

  return (
    <>
      <Header />
      <div className="container">
        <br />
        <h4 className="display-5">
          Welcome,{" "}
          {userSession != null ? userSession.idToken.payload.email : ""}
        </h4>
        <hr />
        <br />
        <h4 className="display-6">Contact Adminstrator</h4>
        <br />
        <form id="contactAdminForm" onSubmit={contactAdmin}>
          <div class="mb-3">
            <label for="userEmail" class="form-label">
              Email address
            </label>
            <input
              type="email"
              class="form-control"
              id="userEmail"
              value={
                userSession != null ? userSession.idToken.payload.email : ""
              }
              disabled
            />
          </div>
          <div class="mb-3">
            <label for="messageTA" class="form-label">
              Message
            </label>
            <textarea class="form-control" id="messageTA" rows="5"></textarea>
          </div>
          <div class="mb-3">
            <button className="btn btn-dark" type="submit">
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Dashboard;
