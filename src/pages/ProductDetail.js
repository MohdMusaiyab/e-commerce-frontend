import React from "react";
import Layout from "../components/layout/Layout";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";
const ProductDetail = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const[cart,setCart]=useCart(); //For Cart
  const navigate = useNavigate();

  //For Getting the Information on the Product at Initila time
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params.slug]);
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/get-product/${params.slug}`
      );
      setProduct(data?.product);
      //Calling the similar Products Function here
      getSimilarProducts(data?.product?._id,data?.product?.category?._id);
    } catch (error) {
toast.error("Error in getting product");    }
  };
  //For Getting the Related Products
  const getSimilarProducts=async(pid,cid)=>{
    try{
        const{data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/products/related-products/${pid}/${cid}`);
        setRelatedProducts(data?.products);
    }
    catch(error)
    {
      toast.error("Error in getting related products");
    }
  }
  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-6">
          <img
            src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${product._id}`}
            alt={product.name}
            className="img-card"
          />
        </div>
        <div className="col-md-6">
          <h1 className="text-center">Product Details</h1>
          <h6>Name: {product.name}</h6>
          <h6>Description: {product.description}</h6>
          <h6>Category: {product.category?.name}</h6>
          <h6>Price: {product.price}</h6>
          <h6>Quantity: {product.quantity}</h6>
          <button className="btn btn-primary ms-1" onClick={() => {
                    setCart([...cart,product])
                    localStorage.setItem('cart',JSON.stringify([...cart,product])); 
                    toast.success(`${product.name} is added to cart`)
                  }}>
                    Add to Cart
                  </button>        </div>
      </div>
      <div className="row">
        <hr className="mt-2"></hr>
        <h1>Similar Products</h1>
        {relatedProducts.length<1?(<p>No Similar Products</p>):(
            <div className="d-flex flex-wrap">
            {relatedProducts?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />  
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description}</p>
                  <p className="card-text">Rs {p.price}</p>

                  <button href="#" className="btn btn-primary ms-1" onClick={()=> navigate(`/product/${p.slug}`)}>
                    See More
                  </button>
                  <button className="btn btn-primary ms-1" onClick={() => {
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
        )}
        
      </div>
    </Layout>
  );
};

export default ProductDetail;
