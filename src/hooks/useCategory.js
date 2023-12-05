import { useState,useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
export default function useCategory() {
    const [categories,setCategories]=useState([]);
    //Getting the Categories
    const getAllCategories = async () => {
        try {
          const { data } = await axios.get(
            `${process.env.REACT_APP_API}/api/v1/category/get-category`
            
          );
          
            setCategories(data?.category);
          
        } catch (error) {
          toast.error("Something Went Wrong in getting all categories");
        }
      };
      useEffect(() => {
        getAllCategories();
      }, []);
    return categories;
}