import React from "react";
import Layout from "../components/layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleRemoveItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((p) => p._id === pid);
      // setCart([...myCart.slice(0,index),...myCart.slice(index+1)]);
      myCart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(myCart));
      setCart(myCart);
    } catch (error) {
      toast.error("Error in removing item");    }
  };
  //For total Price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((p) => (total += p.price));
      return total;
    } catch (error) {
toast.error("Error in getting total price");    }
  };

  //Get the payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      toast.error("Error in getting token");
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);
  //Handle Payment
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/products/braintree/payment`,
        {
          nonce,
          cart,
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Successfull");
    } catch (error) {
      setLoading(false);
      toast.error("Error in payment");  
    }
  };
  //Testing the token

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h1 className="bg-light p-2">
              {`Hello ${auth?.token && auth?.user?.name} `}
            </h1>
            <h4>
              {cart?.length
                ? `You have ${cart?.length} products in your cart ${
                    auth?.token ? " " : "Please Login to continue Checkout"
                  }`
                : "Your Cart is Empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart.map((p) => (
              <div className="row m-2 card flex-row">
                <div className="col-md-4">
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                </div>
                <div className="col-md-8">
                  <h4>{p.name} Details</h4>
                  <h6>{p.description}</h6>
                  <h6>{p.price}</h6>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemoveItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr></hr>
            <h4>{`Total: Rs ${totalPrice()}`}</h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mb-2">
                  {auth?.token ? (
                    <>
                      <button
                        className="btn btn-outline-warning"
                        onClick={() => navigate("/dashboard/user/profile")}
                      >
                        Update Address
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-outline-warning"
                        onClick={() =>
                          navigate("/login", {
                            state: "/cart",
                          })
                        }
                      >
                        Login to Continue
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
            <div className="mt-2">
            
                 {
                  !clientToken || !cart.length ?(""):(
                    <>
                     <DropIn
                options={{
                  authorization: clientToken,
                  paypal: {
                    flow: "vault",
                  },
                }}
                onInstance={(instance) => setInstance(instance)}
              />

              <button
                className="btn btn-primary"
                onClick={handlePayment}
                disabled={
                   loading || !instance || !auth?.user?.address
                }
              >
                {loading ? "Processing..." : "Pay Now"}
              </button>
            
                    </>
                  )
                 }
              </div>
            
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
