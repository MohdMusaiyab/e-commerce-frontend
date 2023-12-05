import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import "../../styles/order.css"
import axios from "axios";
import toast from "react-hot-toast";

const Users = () => {
  const [users, setUsers] = useState([]);
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/all-users`
      );
      // setUsers(data);
      const names = data.users.map((user) => user.name);
      setUsers(names);
    } catch (error) {
      toast.error("Error in getting users");
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu></AdminMenu>
          </div>
          <div className="col-md-3">
            <h2>All Users</h2>
            <ul className="list-group">
              {users.map((user, index) => (
                <li key={index} className="list-group-item-custom ">
                  {" "}
                  {/* Added 'my-2' for margin */}
                  {user}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
