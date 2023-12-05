import Layout from "../components/layout/Layout";
import React from "react";
import { useSearch } from "../context/Search";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Search = () => {
  const [values, setValues] = useSearch();
  const [ cart, setCart ] = useCart();
  const navigate = useNavigate();
  return (
    <Layout title={"Search"}>
      <div className="container">
        <div className="text-center">
          <h1>Seacrh Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No products Found"
              : `Found ${values.results.length} Products` }
          </h6>
          <div className="d-flex flex-wrap mt-2">
            {values?.results.map((p) => (
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
        </div>
      </div>
    </Layout>
  );
};

export default Search;
