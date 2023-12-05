import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useLocation } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        {
          email,
          password,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something Went Wrong");
      
    }
  };
  return (
    <div>
<Layout>
  <div className="register">
    <h1 className="mb-4">Login Page</h1>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email here"
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your Password Here"
          required
        />
      </div>
      <div className="mb-3">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
      <div className="mb-3">
        <button
          type="button"
          className="btn btn-link"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password?
        </button>
      </div>
    </form>
  </div>
</Layout>

    </div>
  );
};

export default Login;
