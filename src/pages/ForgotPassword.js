import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
    const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const[answer,setAnswer]=useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
        {
          email,
          newPassword,
          answer
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
    
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };
  return (
    <Layout>
    <div className="register">
  <h1 className="mb-4">Forgot Password</h1>
  <form onSubmit={handleSubmit}>
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">
        Email address
      </label>
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
      <label htmlFor="exampleInputPassword1" className="form-label">
        New Password
      </label>
      <input
        type="password"
        className="form-control"
        id="exampleInputPassword1"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Enter your new password here"
        required
      />
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputPassword2" className="form-label">
        Favorite Sports (Security Question)
      </label>
      <input
        type="password"
        className="form-control"
        id="exampleInputPassword2"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Enter your favorite sports"
        required
      />
    </div>
    <div className="mb-3">
      <button type="submit" className="btn btn-primary">
        Reset
      </button>
    </div>
  </form>
</div>


    </Layout>
  )
}

export default ForgotPassword
