import React, { useState } from "react";
import "./Account.css";
import { PiHandWithdrawFill, PiHandDepositFill } from "react-icons/pi";
import Nav from "../Navbar/Navbar";

const Account = () => {
  //logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  //handling amounts
  const [Data, setData] = useState({
    deposit: 0,
    withdraw: 0,
  });
  const [displayText, setDisplayText] = useState("Balance$");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...Data, [input.name]: input.value });
    
    console.log("handleChange");
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log("submit amount");
    console.log(Data);
    //haven't submit the data to the database
    //get the new balence from data to display
    setDisplayText("$New Balance");
    setData({ deposit: "", withdraw: "" }); //clean up input
  };

  return (
    <div className="page">
      <div className="nav">
        <Nav />
      </div>

      <div className="wrapbox">
        <div className="wrapperA">
          <div className="form-box balace">
            <form onSubmit={handleSubmit}>
              <h4>Account balance</h4>
              <h1>{displayText}</h1>
              <div className="input-boxA">
                <input
                  type="number"
                  placeholder="Deposit"
                  name="deposit"
                  value={Data.deposit}
                  onChange={handleChange}
                />
                <PiHandDepositFill className="icon" />
              </div>
              <div className="input-boxA">
                <input 
                  type="number"
                  placeholder="Withdraw"
                  name="withdraw"
                  value={Data.withdraw}
                  onChange={handleChange}
                />
                <PiHandWithdrawFill className="icon" />
              </div>

              <button type="submit">Submit</button>

              <div className="logout-link">
                <a href="#" onClick={handleLogout}>
                  {" "}
                  Logout{" "}
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
