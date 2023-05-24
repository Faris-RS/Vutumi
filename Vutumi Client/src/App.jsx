import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { userUrl } from "./api/api";
import LoginPage from "./pages/loginPage";
import HomePage from "./pages/homePage";
import ProfilePage from "./pages/profilePage";
import SignupPage from "./pages/signupPage";
import userStore from "./store/userStore";
import signinStore from "./store/signinStore";
import RegisterPage from "./pages/registerPage";
import userdetailsStore from "./store/userdetailsStore";
import OtherProfile from "./components/profile/otherProfile";

export default function App() {
  const [user, setUser] = useState(null);
  const [oauthMail, setOauthMail] = useState("");
  const { login, isOauthNew } = userStore();
  const { setUserName, setLogin, setLoginMethod, userName, setIsOauthNew } =
    userStore();
  const { setOauthUserForm, oauthUserForm } = signinStore();
  const { setOauthMails, oauthMails } = userdetailsStore();
  const [isLogged, setIsLogged] = useState(false);

  const userData = {
    oauthMail,
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const checkLocalStoragaUserName = async () => {
        const xy = localStorage.getItem("loginName");
        await setUserName(xy);
        const xz = localStorage.getItem("loginMethod");
        await setLoginMethod(xz);
      };
      checkLocalStoragaUserName();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const userCheck = () => {
      if (user) {
        const userYes = () => {
          const userMailCheck = user.emails[0];
          setOauthMail(userMailCheck.value);
          setOauthMails(oauthMail);
          setUserName(user.displayName);
          setLogin(true);
          localStorage.setItem("newOauth?", false);
          localStorage.setItem("loginMethod", "oauth");
          localStorage.setItem("isLogged", true);

          axios.post(`${userUrl}checkOauth`, { userData }).then((response) => {
            try {
              if (response.data.success) {
                setOauthUserForm(true);
                Navigater("/register");
              } else {
                setOauthUserForm(false);
              }
            } catch (error) {
              console.error(error);
            }
          });
        };
        userYes();
      } else {
        const userNo = () => {
          setUserName(null);
          setLogin(false);
        };
        userNo();
      }
    };
    userCheck();
  }, [user]);

  useEffect(() => {
    const getUser = () => {
      fetch(import.meta.env.VITE_PASSPORTSUCCESS_URL, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    getUser();
  }, [user]);

  useMemo(() => {
    const checkLogin = () => {
      if (localStorage.getItem("isLogged")) {
        setIsLogged(true);
      }
    };
    checkLogin();
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/Login"
            element={isLogged ? <Navigate to="/" /> : <LoginPage />}
          />
          <Route
            exact
            path="/signup"
            element={isLogged ? <Navigate to="/" /> : <SignupPage />}
          />
          <Route
            exact
            path="/"
            element={isLogged ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            exact
            path="/profile"
            element={isLogged ? <ProfilePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/otherprofile/:propValue"
            element={isLogged ? <OtherProfile /> : <Navigate to="/login" />}
          />
          <Route
            exact
            path="/register"
            element={isOauthNew ? <RegisterPage /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    </>
  );
}
