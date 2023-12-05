import React,{useState,useEffect} from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import axios from 'axios'
import toast from 'react-hot-toast'
import {useAuth} from '../../context/auth'
import moment from 'moment'
import { Select } from 'antd'
const{Option}=Select;
const AdminOrders = () => {
    const [status,setStatus]=useState(["Not Processed","Processing","Shipped","Cancelled","Delivered"]);
    const[changeStatus,setChangeStatus]=useState("");
    const [auth, setAuth] = useAuth();
  const [orders, setOrders] = useState([]);
    const getOrders = async () => {
        try {
          const { data } = await axios.get(
            `${process.env.REACT_APP_API}/api/v1/auth/all-orders`
          );
          setOrders(data);
        } catch (error) {
          toast.error("Error in getting orders");
        }
      };
      useEffect(() => {
        if (auth?.token) getOrders();
      }, [auth?.token]);
      const handleChange=async(orderId,value)=>{
        try{
            const {data}=axios.put(`${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`,{status:value});
            getOrders();
        }   
        catch(error)
        {
          toast.error("Error in changing status");
        }
      }
  return (
    <Layout title={'All Orders'}>
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-3">
        <AdminMenu />
      </div>
      <div className="col-md-9">
        <h1 className="text-center mb-4">All Orders</h1>
        {orders.map((o, i) => (
          <div key={i} className="border shadow mb-4">
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
                  <td>
                    <Select
                      bordered={false}
                      onChange={(value) => handleChange(o._id, value)}
                      defaultValue={o?.status}
                    >
                      {status.map((s, j) => (
                        <Option key={j} value={s}>
                          {s}
                        </Option>
                      ))}
                    </Select>
                  </td>
                  <td>{o?.buyer?.name}</td>
                  <td>{moment(o?.createdAt).fromNow()}</td>
                  <td>{o?.quantity}</td>
                  <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                </tr>
              </tbody>
            </table>
            <div className="container">
              {/* Show products here */}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</Layout>
 
  )
}

export default AdminOrders
