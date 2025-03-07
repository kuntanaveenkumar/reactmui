import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Logo()
{  
  return (
	<div className="logo">
    <img src="../images/logo.png" width='150px' height='200px'/>
  </div>
  );
};
export default Logo;
