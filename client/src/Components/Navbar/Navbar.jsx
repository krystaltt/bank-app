import "./Navbar.css";
import React, { useState, useEffect } from "react";

const NavigationBar = () => {
  const [username, setUsername] = useState("");

  useEffect(()=>{
    const userName=localStorage.getItem("userName")
    const fetchData=()=>{
      setUsername(userName)
    }
    fetchData()
  },[])

  
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>BankBank</h1>
      </div>

      <div className="navbar-right">
        <h6>Signed in as: </h6>
        <h5>{username}</h5>
      </div>
    </nav>
  );
};

export default NavigationBar;
