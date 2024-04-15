// Learnt from: https://www.youtube.com/watch?v=R-3uXlTudSQ

import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import { createContext } from "react";

import UserPool from "./userPool";

const AuthenticationContext = createContext();

const Authentication = (props) => {
  const isLoggedIn = async () => {
    return await new Promise((resolve, reject) => {
      const currentUser = UserPool.getCurrentUser();
      if (currentUser) {
        currentUser.getSession((err, session) => {
          if (err) {
            reject();
          } else {
            resolve(session);
          }
        });
      } else {
        reject();
      }
    });
  };

  const login = async (email, password) => {
    return await new Promise((resolve, reject) => {
      const user = new CognitoUser({ Username: email, Pool: UserPool });
      const authDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      });

      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          resolve(data);
        },
        onFailure: (data) => {
          reject(data);
        },
      });
    });
  };

  const logout = async () => {
    const currentUser = UserPool.getCurrentUser();
    if (currentUser) {
      currentUser.signOut();
    }
  };

  return (
    <AuthenticationContext.Provider value={{ isLoggedIn, login, logout }}>
      {props.children}
    </AuthenticationContext.Provider>
  );
};

export { Authentication, AuthenticationContext };
