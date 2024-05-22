import React, { useEffect, useState } from "react";
import "./Account.css";
import { PiHandWithdrawFill, PiHandDepositFill } from "react-icons/pi";
import Nav from "../Navbar/Navbar";
import axios from "axios";


const Account = () => {
  const userName=localStorage.getItem("userName")

  //handling amounts
  const [Data, setData] = useState({
    deposit: "",
    withdraw: "",
    userName:userName
  });

  
  //logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  

  const [displayText, setDisplayText] = useState("$balance");

  useEffect(()=>{
    const fetchData=async()=>{
      try {
        const url="http://localhost:3007/api/account"
        
        const {data:res}=await axios.get(url,{params:{
          userName:userName
        }})

        //show balance 
        const newBalance=res.data.toFixed(2)
        setDisplayText(`${newBalance}`)
        
      } catch (error) {
        alert("network connection is wrong, please wait and try again!")
      }
    }
    fetchData()
  },[])

  

  const handleChange = ({ currentTarget: input }) => {
    const { name, value } = input;


    // Enable/disable inputs based on the other field's value
    if (name === "deposit" && Data.withdraw !== "") {
      return; // Exit without updating state
    } else if (name === "withdraw" && Data.deposit !== "") {
      return; // Exit without updating state
    }

    setData({ ...Data, [input.name]: input.value,userName:userName});
    

    console.log("handleChange");
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if(Data.deposit.length===0&&Data.withdraw.length===0){
      return alert("please input deposit or withdraw money!")
    }

    try {
      const url="http://localhost:3007/api/account"
      const {data:res} =await axios.post(url,Data)

      //get the new balence from data to display
     //show balance 
     const newBalance=res.data.toFixed(2)
     setDisplayText(`${newBalance}`)
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500
      ) {
        alert(error.response.data.message)
      }else {
        alert("network connection is wrong, please wait and try again!")
      }
    }
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
                  disabled={Data.withdraw !== ""}
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
                  disabled={Data.deposit !== ""}
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
