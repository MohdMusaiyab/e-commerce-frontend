import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateProduct = () => {
  //Navigation
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);

  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");

  //Getting all the Categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      toast.error("Something Went Wrong in getting all categories");
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);
  //Function for Creating the Product
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name)
      productData.append("description", description)
      productData.append("price", price)
      productData.append("quantity", quantity)
      productData.append("shipping", shipping)
      productData.append("category", category)
      productData.append("photo", photo)
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/products/create-product`,
        productData
      );
      if (data?.success) {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu></AdminMenu>
          </div>
          <h1 className="col-md-3">Create Product</h1>
          <div className="m-1 w-75">
            <Select
              bordered={false}
              placeholder={"Select a Category"}
              size={"large"}
              showSearch
              className="form-select mb-3"
              onChange={(value) => {
                setCategory(value);
              }}
            >
              {categories?.map((c) => {
                return (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                );
              })}
            </Select>
            <div className="mb-3">
              <label className="btn btn-outline-secondary col-md-12">
                {photo ? photo.name : "Upload Photo"} Upload Photo
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => {
                    setPhoto(e.target.files[0]);
                  }}
                  hidden
                ></input>
              </label>
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={name}
                placeholder="Write the name of Product"
                className="form-control"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></input>
            </div>

            <div className="mb-3">
              <input
                type="text"
                value={description}
                placeholder="Write the description of Product"
                className="form-control"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></input>
            </div>

            <div className="mb-3">
              <input
                type="text"
                value={price}
                placeholder="Write the Price "
                className="form-control"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              ></input>
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={quantity}
                placeholder="Give the number of Quantity"
                className="form-control"
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
              ></input>
            </div>
            <div className="mb-3">
              
              <Select
                bordered={false}
                placeholder={"Select Shipping "}
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setShipping(value);
                }}
              >          <Option value="0">No</Option>
                <Option value="1" >Yes</Option>
              </Select>
            </div>
            <div className="mb">
              <button className="btn btn-primary" onClick={handleCreate}>
                Create Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
