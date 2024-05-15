import "./Navbar.css";
import React, { useState, useEffect } from "react";

const NavigationBar = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once, similar to componentDidMount

  const fetchData = async () => {
    try {
      // Fetch data from an API endpoint or any other source
      const response = await fetch("your-api-endpoint"); //need change
      if (response.ok) {
        const data = await response.json();
        // Update the state with the fetched username
        setUsername(data.username);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
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
