import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import toast from "react-hot-toast";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [ cart, setCart ] = useCart();

  //Getting all the products
  const getAllProducts = async () => {
    try {
      setLoading(true);

      // const { data } = await axios.get(
      //   `${process.env.REACT_APP_API}/api/v1/products/get-product`
      // );
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/product-list/${page}`
      );

      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      toast.error("Something Went Wrong in getting all products");    }
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);
  //For Filtering of Products
  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);
  //Now for Categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      toast.error("Something Went Wrong in getting all categories");
    }
  };
  useEffect(() => {
    getAllCategories();
    getTotal();
  }, []);
  //For Filtering thr Catgories
  const handleFilter = async (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  //Get Filtered Products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/products/product-filters`,
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
    }
  };
  //Getting the total Count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
toast.error("Error in getting total");    }
  };
  //For Loading More
  //use effect of load more
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/product-list/${page}`
      );

      setLoading(false);
      setProducts([...products, ...data.products]);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="row mt-3">
        <div className="col-md-3 filter-container">
          <h6 className="text-center mb-3">Filter By Category</h6>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* ===========================++Filter By Price======================= */}
          <h6 className="text-center mt-4 mb-3">Filter By Price</h6>
          {/* <h2>{JSON.stringify(radio,null,4)}</h2> */}
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name} </Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              Remove Filters
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">ALL Products</h1>
          {/* {JSON.stringify(checked,null,4)} */}
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  height={'200px'}
                  width={'200px'}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description}</p>
                  <p className="card-text">Rs {p.price}</p>

                  <button
                    href="#"
                    className="btn btn-primary ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    See More
                  </button>
                  <button className="btn btn-secondary ms-1" onClick={() => {
                    setCart([...cart,p])
                    localStorage.setItem('cart',JSON.stringify([...cart,p])); 
                    toast.success(`${p.name} is added to cart`)
                  }}>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* Thoda dikkat ho skti hai yha pe */}
          <div className="m-2 p-3">
            {products && products?.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading " : "Load More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
