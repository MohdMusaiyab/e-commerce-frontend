import React from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';
import toast from 'react-hot-toast';
const SingleCategory = () => {

    const navigate=useNavigate();
    const params=useParams();
    const[products,setProducts]=useState([]);
    const[category,setCategory]=useState({});
    const[cart,setCart]=useCart();
    
    const getProductbyCategory=async()=>{
        try{
            const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/products/product-category/${params.slug}`);
            setProducts(data?.products);
            setCategory(data?.category);
        }
        catch(error){
          alert("Error in getting products by category");
        }
    }
    useEffect(()=>{
        if(params.slug)getProductbyCategory();
    },[params?.slug])
  return (
   <Layout>
    { 
        products?.length===0?(
            <div className="container text-center mt-2">
                <h1>No Products Found for {params?.slug} category</h1>
            </div>
        ):(
          <div className="container">
        <h1> Found {products.length} Products in  {category?.name} Category</h1>
        <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description}</p>
                  <p className="card-text">Rs {p.price}</p>

                  <button href="#" className="btn btn-primary ms-1" onClick={()=> navigate(`/product/${p.slug}`)}>
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
    </div>
        )
    }
    
   </Layout>
  )
}

export default SingleCategory
