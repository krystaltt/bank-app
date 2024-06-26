import React, { useState } from "react";
import "./LoginRegister.css";
import { FaUser, FaLock } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginRegister = () => {
  //for switching btwn login/register
  const [action, setAction] = useState("");

  const registerLink = () => {
    setAction(" active");
    setLoginData({ userName: "", password: "" });
  };

  const loginLink = () => {
    setAction("");
    setRegistData({ userName: "", password: "", confirmPassword: "" });
  };

  //handling register
  const [registData, setRegistData] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [errorRegist, setErrorRegist] = useState("");
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);
  const [errorMessageVisibleRegist, setErrorMessageVisibleRegist] =
    useState(false);

  const handleChange = ({ currentTarget: input }) => {
    setRegistData({ ...registData, [input.name]: input.value });
    console.log("handleChange");
  };

  const Submitregister = async (e) => {
    e.preventDefault();
    console.log("Submitregister");
    //vulnerability fix: CWE-532: Insertion of sensitive information into Log file: console.log(registData); is removed
    try {
      const url = `${process.env.REACT_APP_SERVER_API_URL}:${process.env.REACT_APP_PORT}/api/register`;
      const { data: res } = await axios.post(url, registData);
      navigate("/login");
      loginLink();
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setErrorRegist(error.response.data.message);

        setErrorMessageVisibleRegist(true);

        // Set a timeout to hide the error message after 5 seconds
        setTimeout(() => {
          setErrorMessageVisibleRegist(false);
        }, 5000);
      }
    }
  };

  //handling login
  const [loginData, setLoginData] = useState({
    userName: "",
    password: "",
  });

  const SubmitLogin = async (e) => {
    console.log("submit login");
    //vulnerability fix: CWE-532: Insertion of sensitive information into Log file: console.log(loginData); is removed
    e.preventDefault();

    try {
      
      const url=`${process.env.REACT_APP_SERVER_API_URL}:${process.env.REACT_APP_PORT}/api/login`;
      const { data: res } = await axios.post(url, loginData);
      localStorage.setItem("token", res.data);
      localStorage.setItem("userName", loginData.userName);

      window.location = "/";
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);

        setErrorMessageVisible(true);

        // Set a timeout to hide the error message after 5 seconds
        setTimeout(() => {
          setErrorMessageVisible(false);
        }, 5000);
      }
    }
  };

  const handleChangeLogin = ({ currentTarget: input }) => {
    setLoginData({ ...loginData, [input.name]: input.value });
  };

  return (
    <div className="wholePage">
      <div className={`wrapper${action}`}>
        <div className="form-box login">
          <form onSubmit={SubmitLogin}>
            <h1>Login</h1>
            <div className="input-box">
              <input
                type="text"
                placeholder="Username"
                required
                name="userName"
                value={loginData.userName}
                onChange={handleChangeLogin}
              />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                value={loginData.password}
                onChange={handleChangeLogin}
              />
              <FaLock className="icon" />
            </div>
            {errorMessageVisible && error && (
              <div className="error_msg">{error}</div>
            )}
            <button type="submit">Login</button>

            <div className="register-link">
              <p>
                Don't have an account?{" "}
                <a href="#" onClick={registerLink}>
                  Register
                </a>
              </p>
            </div>
          </form>
        </div>

        <div className="form-box register">
          <form onSubmit={Submitregister}>
            <h1>Registration</h1>
            <div className="input-box">
              <input
                type="text"
                placeholder="Username"
                required
                name="userName"
                value={registData.userName}
                onChange={handleChange}
              />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                value={registData.password}
                onChange={handleChange}
              />
              <FaLock className="icon" />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Confirm Password"
                required
                name="confirmPassword"
                value={registData.confirmPassword}
                onChange={handleChange}
              />
              <FaLock className="icon" />
            </div>
            {errorMessageVisibleRegist && errorRegist && (
              <div className="error_msg">{errorRegist}</div>
            )}
            <button type="submit">Register</button>

            <div className="register-link">
              <p>
                Already have an account?{" "}
                <a href="#" onClick={loginLink}>
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
