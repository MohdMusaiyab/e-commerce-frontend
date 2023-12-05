import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";

const Profile = () => {
  const [auth, setAuth] = useAuth();
  //For contect Auth
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Form handling Function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/profile`,
        {
          name,
          email,
          password,
          phone,
          address,
        }
        );
        if(data?.error)
        {
          toast.error(data?.error);
        }
        else{
          setAuth({...auth,user:data?.updatedUser});
          // localStorage.setItem("auth",JSON.stringify({...auth,user:data?.updatedUser}));
          let ls= localStorage.getItem("auth");
          ls=JSON.parse(ls);
          ls.user=data?.updatedUser;
          localStorage.setItem("auth",JSON.stringify(ls));
          toast.success('Profile Updated Successfully');
          
        }
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };
  //Use effect hook for setting the data
  useEffect(() => {
    if(auth?.user)
    {
      setName(auth.user.name);
      setEmail(auth.user.email);
      setPhone(auth.user.phone);
      setAddress(auth.user.address);
    }
  }, [auth?.user]);
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu></UserMenu>
          </div>
          <div className="col-md-9">
            <form onSubmit={handleSubmit}>
              <h1>Edit Profile</h1>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  placeholder="Enter your Name here"
          
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Enter you mail here"
               
                  disabled
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="Enter you Password Here"
              
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="exampleInputEmail1"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  placeholder="Enter your Contact Number"
               
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                  placeholder="Enter your Adress Here"
              
                />
              </div>

              <button type="submit" className="btn btn-primary">
               Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
