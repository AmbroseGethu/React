import React, { useState } from "react";
import "./Navbar.css";
import Netflix_logo from "../Netflix_logo.png";
import { useEffect } from "react";

function Navbar() {
  
    const [show,handleShow] = useState(false)

    useEffect(()=>{
        window.addEventListener("scroll",()=>{
            if(window.scrollY>400){
                handleShow(true)
        }
        else{
            handleShow(false)
        }
        })
        return ()=>{
            window.removeEventListener("scroll");

        }
        
    },[])
    
  return (
    <div className={`nav ${show && "nav_black"}`}>
      <div className="nav_logo_container">
        <img src={Netflix_logo} className="nav_logo" />
      </div>
      <div className="nav_signin">
        <button className="nav_signin_btn">Sign In</button>
      </div>
    </div>
  );
}

export default Navbar;
