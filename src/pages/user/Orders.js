import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import toast from "react-hot-toast";
const Orders = () => {
  const [auth, setAuth] = useAuth();
  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/orders`
      );
      setOrders(data);
    } catch (error) {
toast.error("Error in getting orders");    }
  };
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <Layout>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu></UserMenu>
          </div>
          <div className="col-md-9">
            <h1 className="text-center">ALL Orders</h1>
            {orders.map((o, i) => {
              return (
                <div className="border shadow">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Payment</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createdAt).fromNow()}</td>
                        <td>{o?.quantity}</td>
                        <td>{o?.payment?.success ? "Succcess" : "Failed"}</td>
                        <td>{o?.products.length}</td  >
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {/* to show products */}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
