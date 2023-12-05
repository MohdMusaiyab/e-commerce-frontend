import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const Products = () => {
  const [products, setProducts] = useState([]);

  //Function for Getting all the Products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/get-product`
      );
      //Route me product name diya tha
      setProducts(data.product);
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };
  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu></AdminMenu>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <Link
                // to={`/dashboard/admin/products/get-product/${p.slug}`}
                to={`/dashboard/admin/product/${p.slug}`}
                key={p._id}
                className="product-link"
              >
                <div className="d-flex flex-wrap">
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${p._id}`} className="card-img-top" alt={p.name} height={'200px'} width={'200px'}/>
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                  </div>
                </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
