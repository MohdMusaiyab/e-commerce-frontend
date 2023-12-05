import React ,{useState,useEffect}from "react";
import { toast } from "react-toastify";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { Select } from "antd";
import AdminMenu from "../../components/layout/AdminMenu";
import { useNavigate,useParams } from "react-router-dom";
const { Option } = Select;
const UpdateProduct = () => {
  const navigate = useNavigate();
  const params=useParams();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);

  const [photo, setPhoto] = useState(""); 
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");

  //Now for getting the Category
  const[id,setId]=useState("");
  //Function for getting a single Product
  const getSingleProduct=async()=>{
    try{
      const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/products/get-product/${params.slug}`);
      
      setName(data.product.name);
      setDescription(data.product.description);
      setId(data.product._id);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);

    }
    catch(error)
    {
      toast.error("Something Went Wrong in getting single product");
    }
  }
  //Use effect for getting the Single Product
  useEffect(()=>{
    getSingleProduct();
  },[])
  //Function for getting all the Categories
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //Function for Creating the Product
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("shipping", shipping);
      productData.append("category", category);
     photo && productData.append("photo", photo);
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/products/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };
  //For Deleting the Product
  const handleDelete=async()=>{
    try{
      let answer=window.prompt('Are you Sure You want to delete this Product?')
      if(!answer)
      {
        return;
      }
      const {data}=axios.delete(`${process.env.REACT_APP_API}/api/v1/products/delete-product/${id}`);
       toast.success("Product Deleted Successfully");
       navigate('/dashboard/admin/products')
    } 
    catch(error)
    {
      toast.error('Something Went Wrong in Deleting Product');
    }
  }
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu></AdminMenu>
          </div>
          <h1 className="col-md-3">Update Product</h1>
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
              value={category}
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
              {
                photo ?(
                  <div className="text-center">
                    <img src={URL.createObjectURL(photo)}
                    alt={"Product-Photo"}
                    height="200px"
                    className="img img-responsive"></img>
                  </div>
                ):(
                  <div className="text-center">
                  <img src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${id}`}
                  alt={"Product-Photo"}
                  height="200px"
                  className="img img-responsive"></img>
                </div>
                )

              }
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

                value={shipping?"Yes":"No"}
              >
                {" "}
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            </div>
            <div className="mb">
              <button className="btn btn-primary m-2" onClick={handleUpdate}>
              Update Product
              </button>
              <button className="btn btn-danger" onClick={handleDelete}>
              Delete Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
