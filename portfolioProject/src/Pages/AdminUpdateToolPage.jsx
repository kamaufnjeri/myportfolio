import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./AdminAddProjectPage.module.css";
import SiderBar from "../Components/SiderBar";
import UpdateTools from "../Components/UpdateTools";

export default function AdminUpdateToolPage() {
  const navigate = useNavigate();
  // make this route protected using useEffect
  const [token, setToken] = useState(null);

  //set token
  useEffect(() =>{
    const tokened = localStorage.getItem('jwtToken');
    setToken(tokened ? tokened : '');
  }, [setToken]);
  useEffect(() => {
    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        throw new Error('No token Found')
      }
    } catch (error) {
      toast.error("Error fetching data! Please login");
      // Handle errors here, like displaying an error message or redirecting to home
      navigate("/adminlogin");
    }
  }, []);

  return (
    <div>
      <div className={styles.dashboard}>
        <SiderBar />
        <UpdateTools token={token}/>
      </div>
    </div>
  );
}
