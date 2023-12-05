import React, { useState, useEffect } from "react";
import {  useNavigate ,useLocation} from "react-router-dom";

const Spinner = ({path="login"}) => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const location=useLocation();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevalue) => --prevalue);
    }, 1000);
    count === 0 && navigate(`/${path}`,{
        state:location.pathname,
    });
    return () => clearInterval(interval);
  }, [count, navigate,location,path]);
  return (
    <>
      <h2 className="text-center">Redirecting you to Login Page in {count} seconds</h2>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;