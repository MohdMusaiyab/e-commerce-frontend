import { useState,useEffect } from "react"
import { useAuth } from "../../context/auth"
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function AdminRoute(){
    const [ok,setOk]=useState(false);
    const[auth,setAuth]=useAuth();

    useEffect(()=>{
            const authCheck=async()=>{
                const data =window.localStorage.getItem('auth');
                const sampledata =  JSON.parse(data)
                const config = {
                    method : "GET", 
                    headers : {
                        Authorization : `${sampledata.token}`
                    }
                }
                // const res= await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/admin-auth`);

                const res= await fetch(`${process.env.REACT_APP_API}/api/v1/auth/admin-auth`,config);

                if(res.ok)
                {
                    setOk(true)
                }
                // if(res.data.ok)
                // {   
                //     setOk(true);
                // }
                else{
                    setOk(false);
                }   
            }
            if(auth?.token) authCheck();
    },[auth?.token]);
    return ok ?<Outlet></Outlet>:<Spinner path=""></Spinner>
}
