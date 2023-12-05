import React from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";
const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  //NOw for the Category Form
  const [name, setName] = useState("");
  //For Modals
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedname, setUpdatedName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        { name }
      );
      if (data?.success) {
        toast.success(` ${name} Category Added Sucessfuly`);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went Wrong in Input Form");
    }
  };
  //Getting all Categories

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      toast.error("Something Went Wrong in getting all categories");
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);
  //Updating Category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
        { name: updatedname }
      );
      if (data.success) {
        toast.success("Category Updated Successfully");
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something Went Wrong in Editing Category");
    }
  };
  //For Deleting a Category
  const handleDelete = async (pid) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${pid}`,
        { name: updatedname }
      );
      if (data.success) {
        toast.success(` Category is deleted successfully`);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something Went Wrong in Editing Category");
    }
  };

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu></AdminMenu>
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              ></CategoryForm>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((c) => (
                  <>
                    <tr>
                      <td key={c._id}>{c.name}</td>

                      <td>
                        <button
                          className="btn btn-primary ms-2"
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(c.name);
                            setSelected(c);
                          }}
                        >
                          Edit
                        </button>
                        <button className="btn btn-danger ms-2" onClick={()=>{
                          handleDelete(c._id)
                        }}>Delete</button>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
          <Modal
            onCancel={() => setVisible(false)}
            footer={null}
            visible={visible}
          >
            <CategoryForm
              value={updatedname}
              setValue={setUpdatedName}
              handleSubmit={handleUpdate}
            ></CategoryForm>
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
